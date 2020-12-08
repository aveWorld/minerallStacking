import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    const body = document.querySelector('body');
    if (isOpen) {
      setIsOpen(false);
      body.style.overflow = 'auto';
    } else {
      setIsOpen(true);
      body.style.overflow = 'hidden';
    }
  };
  return (
    <div className="burger-menu">
      <div className="menu" onClick={handleMenu}>
        <span
          className={
            isOpen
              ? 'menu-global menu-top menu-top-click'
              : 'menu-global menu-top'
          }
        >
          {}
        </span>
        <span
          className={
            isOpen
              ? 'menu-global menu-middle menu-middle-click'
              : 'menu-global menu-middle'
          }
        >
          {}
        </span>
        <span
          className={
            isOpen
              ? 'menu-global menu-bottom menu-bottom-click'
              : 'menu-global menu-bottom'
          }
        >
          {}
        </span>
      </div>
      <div
        className={
          isOpen
            ? 'burger-links burger-animation'
            : 'burger-links burger-position'
        }
      >
        <Link to="/" className="burger__link" onClick={handleMenu}>
          STAKING
        </Link>
        <Link to="/" className="burger__link" onClick={handleMenu}>
          HOW IT WORKS
        </Link>
      </div>
    </div>
  );
}
