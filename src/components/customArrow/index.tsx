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
