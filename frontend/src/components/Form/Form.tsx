import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import classNames from 'classnames';
import { ThreeCircles } from  'react-loader-spinner'
import { useCreatePost } from '../../customHooks/useCreatePost.hook';
import { PostFormSchema } from '../../schemas/form.schemas';
import './Form.scss';

export const Form = () => {
  const { createPost, posting, errorPost } = useCreatePost();
  const formicRef = useRef<any>(null);
  const initState = {
    userName: '',
    userAvatar: '',
    text: '',
  };

  useEffect(() => {
    if (posting === 'fullfilled') {
      formicRef.current.resetForm();
    }
  },[posting])

  return (
    <div className="Form">
      <Formik
        innerRef={formicRef}
        initialValues={initState}
        validationSchema={ PostFormSchema }
        onSubmit={async (values, actions) => {
          await createPost(values);
        }}
      >
      {(formik) => (
        <form className="Form__container" onSubmit={formik.handleSubmit}>
          <div className='Form__element'>
            <input
              type="text"
              placeholder="Your name *"
              className={classNames(
                'Form__input',
                { 'Form__input--error': !!(formik.touched.userName && formik.errors.userName)})
              }
              {...formik.getFieldProps('userName')}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <p className='Form__textError'>{formik.errors.userName}</p>
            ) : null}
          </div>
          <div className='Form__element'>
            <input
              type="text"
              placeholder="Enter avatar link"
              className={classNames(
                'Form__input',
                { 'Form__input--error': !!(formik.touched.userAvatar && formik.errors.userAvatar)})
              }
              {...formik.getFieldProps('userAvatar')}
            />
            {formik.touched.userAvatar && formik.errors.userAvatar ? (
              <p className='Form__textError'>{formik.errors.userAvatar}</p>
            ) : null}
          </div>
          <div className='Form__element'>
            <textarea
              name="text"
              onChange={(e) => {
                e.target.style.height = '5px';
                e.target.style.height = `${e.target.scrollHeight}px`;
                formik.handleChange(e);
              }}
              placeholder="post content"
              value={formik.values.text}
              onBlur={formik.handleBlur}
              className={classNames(
                'Form__textarea',
                { 'Form__textarea--error': !!(formik.touched.text && formik.errors.text)})
              }
            />
            {formik.touched.text && formik.errors.text ? (
              <p className='Form__textError'>{formik.errors.text}</p>
            ) : null}
          </div>
          <div className='Form__btn--position'>
            <button
              type="submit"
              className='Form__btn'
              disabled={posting === 'pending'}
            >
              {
                posting === 'pending' ? (
                  <ThreeCircles
                    height="32"
                    width="32"
                    color="#ffffff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                  />
                ) : (
                  <>
                    <img
                      src="./assets/upload.svg"
                      alt="Upload.icon"
                      className='Form__btn--img'
                    />
                    Upload
                  </>
                )
              }
            </button>
          </div>
          <p className='Form__textError' >{errorPost}</p>
        </form>
      )}
      </Formik>
    </div>
  );
};
