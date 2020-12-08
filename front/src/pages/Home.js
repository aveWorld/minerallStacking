import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import axios from 'axios';

// Assets
import bigEth from '../assets/svg/bigEth.svg';
import threeEth from '../assets/svg/threeEth.svg';
import handWithEth from '../assets/svg/handWithEth.svg';
import circleHand from '../assets/svg/circleHand.svg';
import circleEth from '../assets/svg/circleEth.svg';
import circleDB from '../assets/svg/circleDB.svg';
import circleEye from '../assets/svg/circleEye.svg';
import triangle from '../assets/svg/triangle.svg';
import subscribeCheck from '../assets/svg/subscribeCheck.svg';

// Components
import Modal from '../components/Modal';

export default function Home() {
  const [modalWindow, setModalWindow] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState(
    'Your Email Address'
  );
  const [error, setError] = useState('');

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

  const handleSubscribe = (e) => {
    setSubscribeEmail(e.target.value);
  };

  const submitSubscribe = async () => {
    setError('');
    if (!subscribeEmail) {
      setError('Email Required');
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(subscribeEmail)
    ) {
      setError('Invalid email address');
    } else {
      const data = {
        email: subscribeEmail,
        type: 'sub',
      };
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:5000/mail',
          data,
        });
        if (!response.data.errors) {
          setSubscribe(true);
          setSubscribeEmail('');
          setInputPlaceholder('');
        } else {
          setError('An Error Occurred, Please Try Again');
        }
      } catch (err) {
        if (err) setError('An Error Occurred, Please Try Again');
      }
    }
  };

  return (
    <>
      <div
        className="main__modal"
        style={modalWindow ? { display: 'block' } : { display: 'none' }}
      >
        <Modal closeModal={closeModal} />
      </div>
      <section className="main-sec1">
        <h1 className="main-sec1__title">Ethereum Liquid Staking</h1>
        <h3 className="main-sec1__subtitle">
          Subscribe to get updates on the launch of Minerall Staking
        </h3>
        <div className="main-sec1__subscribe">
          <input
            type="email"
            placeholder={inputPlaceholder}
            className="main-sec1__subscribe__input"
            onChange={handleSubscribe}
            value={subscribeEmail}
            style={
              error
                ? { border: '2px solid #FFABD3' }
                : subscribe
                ? { backgroundColor: '#3452C3' }
                : null
            }
          />
          {subscribe ? (
            <div className="main__input__subscribed">
              <ReactSVG src={subscribeCheck} />
              <span className="main__input__subscribed__span">SUBSCRIBED</span>
            </div>
          ) : (
            <button
              className="main-sec1__subscribe__btn"
              type="button"
              onClick={submitSubscribe}
            >
              SUBSCRIBE
            </button>
          )}
          {error && <div className="main__input__error">{error}</div>}
        </div>
      </section>
      <section className="main-sec2 container">
        <div className="main-sec2-block1">
          <div className="main-sec2-block1__img">
            <ReactSVG src={bigEth} />
          </div>
          <div className="main-sec2-block1__text">
            <h3 className="main-sec3__block-title">
              Stake ETH and keep tokens liquid
            </h3>
            <p className="main-sec3__block-subtitle">
              Deposit Ether to the smart contract and get mETH tokens in return.
              You earn staking rewards for every day of holding these tokens in
              your wallet. They are fully liquid, so you can use them for your
              needs at any time — trade, sell, exchange, invest in DeFi
              projects, etc.
            </p>
          </div>
        </div>
        <div className="main-sec2-block2">
          <div className="main-sec2-block2__text">
            <h3 className="main-sec3__block-title">Stake any amount of ETH</h3>
            <p className="main-sec3__block-subtitle">
              The Ethereum 2.0 protocol allows staking amounts divisible by 32
              ETH only. Minerall Staking is a more flexible and more friendly
              solution than self-staking or exchange staking. With Lido, you can
              stake any number of tokens you possess and earn rewards even on
              small deposits.
            </p>
          </div>
          <div className="main-sec2-block2__img">
            <ReactSVG src={threeEth} />
          </div>
        </div>
        <div className="main-sec2-block3">
          <div className="main-sec2-block3__img">
            <ReactSVG src={handWithEth} />
          </div>
          <div className="main-sec2-block3__text">
            <h3 className="main-sec3__block-title">
              Support DeFi projects with mETH
            </h3>
            <p className="main-sec3__block-subtitle">
              mETH tokens, the Ethereum liquid staking token on Minerall, serves
              as a building block for new and existing Ethereum apps and
              protocols. For example, you can use it as collateral for lending
              services or other trading DeFi solutions.
            </p>
          </div>
        </div>
      </section>
      <section className="main-sec3">
        <h2 className="main-sec3__title">How it works</h2>
        <div className="main-sec3__cards container">
          <div className="main-sec3__card">
            <div className="main-sec3__card__img">
              <ReactSVG src={circleHand} />
            </div>
            <p className="main-sec3__card__text">
              Deposit any amount of ETH to the Minerall Staking liquid staking
              protocol
            </p>
          </div>
          <div className="main-sec3__card">
            <div className="main-sec3__card__img">
              <ReactSVG src={circleEth} />
            </div>
            <p className="main-sec3__card__text">
              Receive the same number of mETH tokens in return and earn your
              staking rewards
            </p>
          </div>
          <div className="main-sec3__card">
            <div className="main-sec3__card__img">
              <ReactSVG src={circleDB} />
            </div>
            <p className="main-sec3__card__text">
              Use mETH tokens in DeFi and keep full control of your funds
            </p>
          </div>
          <div className="main-sec3__card">
            <div className="main-sec3__card__img">
              <ReactSVG src={circleEye} />
            </div>
            <p className="main-sec3__card__text">
              Redeem mETH to ETH tokens back when Ethereum 2.0 Phase 2 begins.
              It will be possible when transfers in Ethereum 2.0 will be
              available
            </p>
          </div>
        </div>
        <button type="button" className="main-sec3__btn" onClick={openModal}>
          <ReactSVG src={triangle} />
          <span className="main-sec3__btn__text">Stake with Minerall</span>
        </button>
        <p className="main-sec3__rights">
          © MINERALL 2020. All rights reserved
        </p>
      </section>
    </>
  );
}
