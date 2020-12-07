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
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#72AEAA';
  });

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
