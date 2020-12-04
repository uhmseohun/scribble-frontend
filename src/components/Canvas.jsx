import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';

const Canvas = ({ width = 400, height = 400 }) => {
  const canvasRef = createRef();
  let pos = {
    drawable: false,
    x: -1,
    y: -1,
  };
  let ctx;

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
  };

  const draw = (event) => {
    if (pos.drawable) {
      pos = {
        ...pos,
        ...getPosition(event),
      };
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const finishDraw = () => {
    pos = {
      drawable: false,
      x: -1,
      y: -1,
    };
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
