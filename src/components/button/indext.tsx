/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'filled' | 'noFilled';
}

export default function Button({ children, color, className, ...rest }: ButtonProps) {
  const { disabled, onClick, ...restProps } = rest;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const getColorClass = () => {
    if (disabled) {
      return 'bg-gray40';
    }
    return color === 'filled' ? 'bg-primary' : 'bg-white text-primary border border-primary';
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={` h-[32px] md:h-[37px] lg:h-[48px]  rounded-[6px] text-white font-bold text-[12px] md:text-[14px] lg:text-[16px] inline-flex py-[14px] justify-center items-center gap-[8px] ${className} ${getColorClass()}`}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
}
