import React, { useEffect, useState } from 'react';

const Drawer = ({
  children,
  onClose
} : {
  children?: React.JSX.Element
  onClose: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-80 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg transform transition-transform duration-300 z-90 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-2">
          <button onClick={onClose}>
            <div className="w-5 h-5"
            >Kapat</div>
          </button>
        </div>

      </div>
    </>
  );
};

export default Drawer;
