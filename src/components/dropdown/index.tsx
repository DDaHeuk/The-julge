'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

interface DropDownProps {
  menuItems: string[];
  className?: string;
}

export default function DropDown({ menuItems, className }: DropDownProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropDownRef} className="w-full">
      <div className={`relative w-[100%] ${className}`}>
        <button
          type="button"
          className="flex items-center justify-between w-full  gap-[10px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem ? <p>{selectedItem}</p> : <p className="text-gray40">선택</p>}

          <div>
            {isOpen ? (
              <Image
                src="/icons/dropdown/dropdown-up.svg"
                alt="dropdownarrow-up"
                width={10}
                height={10}
              />
            ) : (
              <Image
                src="/icons/dropdown/dropdown-down.svg"
                alt="dropdownarrow-down"
                width={10}
                height={10}
              />
            )}
          </div>
        </button>
        <ul
          className={`absolute top-[110%] left-0 w-full bg-white rounded-md border border-gray20 max-h-[230px] z-10 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
        >
          {menuItems.map((item: string, index: number) => (
            <React.Fragment key={index}>
              <li
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(item)}
                className="flex justify-center cursor-pointer my-3"
              >
                <p>{item}</p>
              </li>
              {index < menuItems.length - 1 && <hr className="border border-gray20" />}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
