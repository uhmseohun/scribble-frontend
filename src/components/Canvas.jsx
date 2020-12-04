import React, { createRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { websocketContext } from '../websocket';

let pos = {
  drawable: false,
  x: -1,
  y: -1,
};
let ctx;

const Canvas = ({ width = 400, height = 400 }) => {
  const isMyTurn = useSelector(state => (
    state.context.drawer === state.userInfo.key
  ));
  const ws = useContext(websocketContext)
  const canvasRef = createRef();

  ws.socket.addEventListener('message', ({ data }) => {
    data = JSON.parse(data);
    if (data.type === 'draw') {
      if (data.event === 'initDraw') {
        ctx.beginPath();
        pos = {
          drawable: true,
          ...(data.payload),
        };
      } else if (data.event === 'draw') {
        if (pos.drawable) {
          pos = {
            drawable: true,
            ...(data.payload),
          };
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      } else if (data.event === 'finishDraw') {
        pos = {
          drawable: false,
          x: -1,
          y: -1,
        };
      } else if (data.event === 'clearCanvas') {
        ctx.clearRect(0, 0, width, height);
      }
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    // eslint-disable-next-line
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#72AEAA';
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
  });

  const initDraw = (event) => {
    ctx.beginPath();
    pos = {
      drawable: true,
      ...getPosition(event),
    };
    ws.sendDrawing('initDraw');
  };

  const draw = (event) => {
    if (pos.drawable && isMyTurn) {
      if (
        pos.x === event.offsetX &&
        pos.y === event.offsetY
      ) return;
      pos = {
        ...pos,
        ...getPosition(event),
      };
      ws.sendDrawing('draw', {
        x: pos.x,
        y: pos.y,
      });
    }
  };

  const finishDraw = () => {
    pos = {
      drawable: false,
      x: -1,
      y: -1,
    };
    ws.sendDrawing('finishDraw');
  };

  const getPosition = (event) => {
    return {
      x: event.offsetX,
      y: event.offsetY,
    };
  };

  return (
    <StyledCanvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
};

export default Canvas;

const StyledCanvas = styled.canvas`
  border: 1px solid #EBEEF4;
  border-radius: 10px;
  background-color: #F8FAFC;
`;
