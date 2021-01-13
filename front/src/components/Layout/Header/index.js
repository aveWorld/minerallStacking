import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

// Assets
import Logo from '../../../assets/svg/Logo.svg';
import Triangle from '../../../assets/svg/triangle.svg';

// Components
import Modal from '../../Modal';
import BurgerMenu from '../BurgerMenu';

export default function Header() {
  const [modalWindow, setModalWindow] = useState(false);
  const openModal = () => {
    setModalWindow(true);
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalWindow(false);
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  };
  return (
    <header className="header">
      <div
        className="header__modal"
        style={modalWindow ? { display: 'block' } : { display: 'none' }}
      >
        <Modal closeModal={closeModal} />
      </div>
      <div className="header__wrapper">
        <div className="header__logo">
          <Link to="/">
            <ReactSVG src={Logo} />
          </Link>
        </div>
        <div className="header__links">
          <a href="#staking" className="header__link">
            STAKING
          </a>
          <a href="#how-it-works" className="header__link">
            HOW IT WORKS
          </a>
        </div>
        <div className="header__btn">
          <button
            type="button"
            className="header__btn__content"
            onClick={openModal}
          >
            <ReactSVG src={Triangle} />
            <span className="header__btn__content__text">
              Stake with Minerall
            </span>
          </button>
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
}
