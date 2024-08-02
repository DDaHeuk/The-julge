'use client';

import { StyledInputCalendar } from '@/styles/StyledCalendar';
import { validateEmail, validatePassword, validateVerifyPassword } from '@/utils/validation';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DropDown from '../dropdown';
import { TIME } from '@/constant/time';
import Button from '../button';
import { SelectedDate } from '@/types/date';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: 'normal' | 'email' | 'password' | 'passwordVerify' | 'unit' | 'dateTime' | 'date';
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date: SelectedDate) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleApply = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = Array.isArray(selectedDate)
        ? `${selectedDate[0]?.toISOString().split('T')[0]} - ${selectedDate[1]?.toISOString().split('T')[0]}`
        : selectedDate?.toISOString().split('T')[0] || '';
      const formattedDateTime = `${formattedDate} ${selectedTime}`;
      setInputValue(formattedDateTime);
      setShowCalendar(false);
    }
  };

  if (variant === 'unit') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <p>{label}</p>
        <div className={`relative rounded-md`}>
          <input
            {...restProps}
            value={inputValue}
            onChange={handleChange}
            placeholder="입력"
            className="w-full h-[58px] mb-2 px-4 py-5 rounded-md border border-gray30 focus:border-black"
          />
          <div className="h-[58px] pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3">
            <span className="flex items-center text-4 text-black leading-[26px]">{unitLabel}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'dateTime') {
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
          onClick={handleCalendar}
          placeholder={getPlaceholder()}
          readOnly
        />
        {showCalendar && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={calendarRef} className="relative">
              <StyledInputCalendar>
                <Calendar
                  className="bg-white p-4 rounded-lg shadow-lg"
                  onChange={handleDateChange}
                />
              </StyledInputCalendar>
              {variant === 'dateTime' && (
                <div>
                  <DropDown
                    menuItems={TIME}
                    className="mt-2 w-full h-10 px-4 py-2 rounded-md border bg-white border-gray30"
                    onSelect={handleTimeChange}
                  />
                  <Button className="mt-2" color="filled" onClick={handleApply}>
                    적용하기
                  </Button>
                </div>
              )}
              <button
                onClick={handleCalendar}
                className=" w-[25px] h-[25px] absolute top-2 right-2 text-xl font-bold text-gray-600"
              >
                &times;
              </button>
            </div>
          </div>
        )}
        {errMsg && <p className="ml-2 text-[12px] text-red40">{errMsg}</p>}
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
