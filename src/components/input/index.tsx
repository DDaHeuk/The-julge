'use client';

import { StyledInputCalendar } from '@/styles/StyledCalendar';
import { validateEmail, validatePassword, validateVerifyPassword } from '@/utils/validation';
import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { TIME } from '@/constant/time';
import { SelectedDate } from '@/types/date';
import { dateTimeToString, dateTimeToISO } from '@/utils/dateTimeFormat';
import Button from '../button';
import DropDown from '../dropdown';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: 'normal' | 'email' | 'password' | 'passwordVerify' | 'unit' | 'dateTime' | 'date';
  label?: string;
  value?: string | number;
  unitLabel?: string;
  originalPassword?: string;
}

export default function Input({
  variant,
  originalPassword,
  value,
  label,
  unitLabel,
  ...rest
}: InputProps) {
  const { onChange, className, ...restProps } = rest;

  const [inputValue, setInputValue] = useState(value || '');
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

  const validate = (values: string) => {
    let errorMsg = '';
    if (variant === 'email') {
      errorMsg = validateEmail(values);
    } else if (variant === 'password') {
      errorMsg = validatePassword(values);
    } else if (variant === 'passwordVerify') {
      errorMsg = validateVerifyPassword(originalPassword || '', values);
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
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleDateChange = (date: SelectedDate) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleApply = (selectedDate: SelectedDate, selectedTime: string) => {
    if (variant === 'dateTime' && selectedDate && selectedTime) {
      const displayString = dateTimeToString(selectedDate, selectedTime);
      const isoString = dateTimeToISO(selectedDate, selectedTime);
      setInputValue(displayString);
      if (onChange) {
        const event = {
          target: { value: isoString, name: restProps.name },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      setShowCalendar(false);
    } else if (variant === 'date' && selectedDate) {
      const dateTimeString = dateTimeToString(selectedDate, selectedTime);
      setInputValue(dateTimeString);
      if (onChange) {
        const event = {
          target: { value: dateTimeString, name: restProps.name },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      setShowCalendar(false);
    }
  };

  if (variant === 'unit') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <p>{label}</p>
        <div className="relative rounded-md">
          <input
            {...restProps}
            type="number"
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

  if (variant === 'dateTime' || variant === 'date') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <p>{label}</p>
        <input
          {...restProps}
          className={` h-[58px] mb-2 px-4 py-5 rounded-md border ${
            errMsg ? 'border-red40' : 'border-gray30'
          } focus:border-black focus:outline-none `}
          value={inputValue}
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
              <div>
                {variant === 'dateTime' && (
                  <DropDown
                    menuItems={TIME}
                    className="flex mt-2 w-full h-[50px] items-center justify-center text-[14px] md:text-[18px]  px-4 py-2 rounded-md border bg-white border-gray30"
                    onSelect={handleTimeChange}
                    initialValue="시작 시간을 선택해주세요!!"
                  />
                )}
                <Button
                  className="mt-2"
                  color="noFilled"
                  onClick={() => handleApply(selectedDate, selectedTime)}
                >
                  적용하기
                </Button>
              </div>
              <button
                onClick={handleCalendar}
                type="button"
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
