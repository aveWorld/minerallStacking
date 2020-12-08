import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import { ReactSVG } from 'react-svg';
import axios from 'axios';

// Assets
import exitModal from '../../assets/svg/exitModal.svg';
import Check from '../../assets/svg/Check.svg';

export default function Modal({ closeModal }) {
  const [modalFinish, setModalFinish] = useState(false);
  const [reponseError, setResponseError] = useState(false);
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__exit" onClick={closeModal}>
          <ReactSVG src={exitModal} />
        </div>
        {!modalFinish ? (
          <>
            <h2 className="modal__title">Stake with Minerall</h2>
            <p className="modal__subtitle">
              Register your interest to stake when Minerall Staking launches. We
              will send you more information and offer a call with the team.
            </p>
            <Formik
              initialValues={{
                name: '',
                email: '',
                ethHold: '',
                ethStake: '',
                whenStake: '',
                type: 'form',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!values.name) {
                  errors.name = 'Required';
                }
                if (!values.ethStake) {
                  errors.ethStake = 'Required';
                } else if (values.ethStake <= 0) {
                  errors.ethStake = 'Enter positive number';
                }
                if (!values.ethHold) {
                  errors.ethHold = 'Required';
                } else if (values.ethHold <= 0) {
                  errors.ethHold = 'Enter positive number';
                }
                if (!values.whenStake) {
                  errors.whenStake = 'Required';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setTimeout(async () => {
                  const response = await axios({
                    method: 'post',
                    url: 'http://localhost:5000/mail',
                    data: values,
                  });
                  if (!response.data.errors) {
                    setModalFinish(true);
                    setSubmitting(false);
                  } else {
                    setResponseError(true);
                  }
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} className="modal__form">
                  <label htmlFor="name" className="modal__label">
                    NAME{' '}
                    <span className="modal__error">
                      {errors.name && touched.name && errors.name}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="modal__input"
                    placeholder="Your name"
                    style={
                      errors.name &&
                      touched.name &&
                      errors.name && { border: '2px solid #FFABD3' }
                    }
                  />
                  <label htmlFor="email" className="modal__label">
                    EMAIL{' '}
                    <span className="modal__error">
                      {errors.email && touched.email && errors.email}
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="modal__input"
                    placeholder="Your email"
                    style={
                      errors.email &&
                      touched.email &&
                      errors.email && { border: '2px solid #FFABD3' }
                    }
                  />
                  <label htmlFor="ethHold" className="modal__label">
                    ETH YOU HOLD{' '}
                    <span className="modal__error">
                      {errors.ethHold && touched.ethHold && errors.ethHold}
                    </span>
                  </label>
                  <input
                    type="number"
                    name="ethHold"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ethHold}
                    className="modal__input"
                    placeholder="0.00"
                    style={
                      errors.ethHold &&
                      touched.ethHold &&
                      errors.ethHold && { border: '2px solid #FFABD3' }
                    }
                  />
                  <label htmlFor="ethStake" className="modal__label">
                    ETH YOU WANT TO STAKE{' '}
                    <span className="modal__error">
                      {errors.ethStake && touched.ethStake && errors.ethStake}
                    </span>
                  </label>
                  <input
                    type="number"
                    name="ethStake"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ethStake}
                    className="modal__input"
                    placeholder="0.00"
                    style={
                      errors.ethStake &&
                      touched.ethStake &&
                      errors.ethStake && { border: '2px solid #FFABD3' }
                    }
                  />
                  <div
                    role="group"
                    aria-labelledby="my-radio-group"
                    className="modal__radio__group"
                  >
                    <p className="modal__radio__group__title">
                      When would you like to stake?{' '}
                      <span className="modal__error">
                        {errors.whenStake &&
                          touched.whenStake &&
                          errors.whenStake}
                      </span>
                    </p>
                    <div className="modal__radio-div">
                      <Field
                        type="radio"
                        name="whenStake"
                        value="Day 1 of ETH launch"
                        id="firstDay"
                        className="modal__radio"
                      />
                      <label htmlFor="firstDay" className="modal__radio-label">
                        Day 1 of ETH launch
                      </label>
                    </div>
                    <div className="modal__radio-div">
                      <Field
                        type="radio"
                        name="whenStake"
                        value="Later - some time in 2021"
                        id="later"
                        className="modal__radio"
                      />
                      <label htmlFor="later" className="modal__radio-label">
                        Later - some time in 2021
                      </label>
                    </div>
                    <div className="modal__radio-div">
                      <Field
                        type="radio"
                        name="whenStake"
                        value="Only after ETH2 transactions are enabled"
                        id="afterEnabled"
                        className="modal__radio"
                      />
                      <label
                        htmlFor="afterEnabled"
                        className="modal__radio-label"
                      >
                        Only after ETH2 transactions are enabled
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="modal__submit-btn"
                  >
                    Confirm
                  </button>
                  {reponseError && (
                    <div className="modal__error">
                      An Error Occured, Please Try Again
                    </div>
                  )}
                </form>
              )}
            </Formik>
          </>
        ) : (
          <div>
            <div className="modal-finish__img">
              <ReactSVG src={Check} />
            </div>
            <h3 className="modal-finish__title">Thank you!</h3>
            <p className="modal-finish__subtitle">
              Your request has been accepted. We will contact you shortly!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
