/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { CustomArrowProps } from 'react-slick';

const CustomArrow = (props: CustomArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        borderRadius: '100%',
        boxShadow: 'none',
      }}
      onClick={onClick}
    />
  );
};

export default CustomArrow;
