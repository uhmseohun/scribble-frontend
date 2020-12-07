import React, { createRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { websocketContext } from '../websocket';

let pos = {
  drawable: false,
  x: -1,
  y: -1,
};
let ctx;
// useState를 사용하려고 했으나 성능이 안 나와서 사용하지 못 함

const Canvas = ({ width = 700, height = 700 }) => {
  const ws = useContext(websocketContext);
  const canvasRef = createRef();

  useEffect(() => {
    const canvas = canvasRef.current;
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
    if (pos.drawable) {
      if (
        pos.x === event.offsetX &&
        pos.y === event.offsetY
      ) {
        return;
      }
      pos = {
        ...pos,
        ...getPosition(event),
      };
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
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
