'use client';

import { validateEmail, validatePassword, validateVerifyPassword } from '@/utils/validation';
import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: 'normal' | 'email' | 'password' | 'passwordVerify' | 'unit';
  label?: string;
  unitLabel?: string;
  originalPassword?: string;
}

export default function Input({
  variant,
  originalPassword,
  label,
  unitLabel,
  ...rest
}: InputProps) {
  const { onChange, className, ...restProps } = rest;

  const [inputValue, setInputValue] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const validate = (value: string) => {
    let errorMsg = '';
    if (variant === 'email') {
      errorMsg = validateEmail(value);
    } else if (variant === 'password') {
      errorMsg = validatePassword(value);
    } else if (variant === 'passwordVerify') {
      errorMsg = validateVerifyPassword(originalPassword || '', value);
    } else {
      errorMsg = '';
    }
    setErrMsg(errorMsg);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    validate(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const getPlaceholder = () => {
    switch (variant) {
      case 'email':
        return '이메일을 입력해주세요.';
      case 'password':
        return '비밀번호를 입력해주세요.';
      case 'passwordVerify':
        return '비밀번호를 한번더 입력해주세요. ';
      default:
        return '입력';
    }
  };

  if (variant === 'unit') {
    return (
      <div className={`flex flex-col gap-2 ${className}  `}>
        <p>{label}</p>
        <div className="relative">
          <input
            {...restProps}
            placeholder="입력"
            value={inputValue}
            onChange={handleChange}
            className={`w-full mb-2 px-4 py-5 border border-gray30 focus:border-black rounded-md  `}
          />
          <p className="absolute left-[93%] top-5 text-4 text-black leading-[26px]">{unitLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p>{label}</p>
      <input
        {...restProps}
        className={` h-[58px] mb-2 px-4 py-5 rounded-md border ${
          errMsg ? 'border-red40' : 'border-gray30'
        } focus:border-black focus:outline-none `}
        value={inputValue}
        onChange={handleChange}
        placeholder={getPlaceholder()}
        type={variant === 'email' || variant === 'normal' ? 'text' : 'password'}
      />
      {errMsg && <p className="ml-2 text-[12px] text-red40">{errMsg}</p>}
    </div>
  );
}
