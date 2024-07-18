import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface DropDownProps {
  menuItems: string[];
  className?: string;
}

export default function DropDown({ menuItems, className }: DropDownProps) {
  const dropDownRef = useRef<HTMLUListElement>(null);
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
    <div>
      <div className={`relative w-[350px] h-[58px] ${className}`}>
        <button
          type="button"
          className="flex items-center justify-between px-5 py-4 w-full rounded-md border border-gray30"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>{selectedItem || '선택'}</p>
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
          ref={dropDownRef}
          className={`absolute top-[62px] w-full bg-white rounded-md border border-gray20 max-h-[230px] overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}
        >
          {menuItems.map((item: string, index: number) => (
            <>
              <li
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(item)}
                className="flex justify-center cursor-pointer my-3"
              >
                <p>{item}</p>
              </li>
              {index < menuItems.length - 1 && <hr className="border border-gray20" />}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
