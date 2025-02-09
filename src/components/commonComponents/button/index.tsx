/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

import Spinner from '../spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pending?: boolean;
  color?: 'filled' | 'noFilled';
}

export default function Button({
  children,
  color,
  pending = false,
  className,
  ...rest
}: ButtonProps) {
  const { disabled, onClick, ...restProps } = rest;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const getColorClass = () => {
    if (disabled) {
      return 'text-white bg-gray40';
    }
    return color === 'filled'
      ? 'bg-primary text-white hover:bg-[#F04F28]'
      : 'bg-white text-primary border border-primary';
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`flex justify-center items-center rounded-[6px] font-bold text-[12px] md:text-[14px] lg:text-[16px] py-[14px] gap-[8px] w-full h-full ${getColorClass()}`}
        {...restProps}
      >
        <span className={pending ? 'invisible' : ''}>{children}</span>
        {pending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="size-[20px]" />
          </div>
        )}
      </button>
    </div>
  );
}
