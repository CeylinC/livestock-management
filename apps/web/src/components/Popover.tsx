import React, { useState, ReactNode, useRef, useEffect } from 'react';

export default function Popover({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div onClick={togglePopover} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-10 bg-white border border-gray-100 rounded-md shadow-lg p-2 mt-2 w-[300px] right-0 top-full ml-2"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[-5px] border-l-5 border-r-5 border-t-5 border-transparent border-b-white" />
          <div>{content}</div>
        </div>
      )}
    </div>
  );
}
