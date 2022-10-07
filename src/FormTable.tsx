import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './FormTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormTable = () => {
  const [userDetails, setUserDetails] = useState<Values>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (value: any) => {
    let error;
    if (!value) {
      error = 'please fill the details';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Should be 5 character long')
      .max(15, 'should not exceed 15 characters')
      .required('FirstName is required'),
    lastName: Yup.string()
      .min(5, 'Should be 5 character long')
      .max(15, 'should not exceed 15 characters')
      .required('LastName is required'),
    email: Yup.string()
      .email('invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Your Password does not match'),
  });
  return (
    <div className="register-form" data-testid="sign-up-form">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values: Values) => {
          setUserDetails(values);
        }}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className="frm p-4 text-left">
              <h3>SignUp Form</h3>
              <div className="main-cont">
                <div className="form-group">
                  <label>First Name</label>
                  <Field
                    data-testid="firstName"
                    name="firstName"
                    type="text"
                    className="form-control pl-2"
                    placeholder="First Name"
                    value={values.firstName}
                  />
                </div>
                {errors.firstName && touched.firstName && (
                  <div className="text-danger" data-testid="error-firstName">
                    {errors.firstName}
                  </div>
                )}
                <div className="form-group" data-testid="lastName">
                  <label>Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="form-control pl-2"
                    placeholder="Last Name"
                    value={values.lastName}
                  />
                </div>
                {errors.lastName && touched.lastName && (
                  <div className="text-danger" data-testid="error-lastName">
                    {errors.lastName}
                  </div>
                )}
                <div className="form-group" data-testid="password">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control pl-2"
                    value={values.password}
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-danger" data-testid="error-password">
                    {errors.password}
                  </div>
                )}
                <div className="form-group" data-testid="confirmPassword">
                  <label>Confirm Password</label>
                  <Field
                    autoComplete="on"
                    name="confirmPassword"
                    type="password"
                    className="form-control pl-2"
                    value={values.confirmPassword}
                  />
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div
                    className="text-danger"
                    data-testid="error-confirmPassword"
                  >
                    {errors.confirmPassword}
                  </div>
                )}
                <div className="form-group" data-testid="email">
                  <label> Email </label>
                  <Field
                    name="email"
                    type="email"
                    value={values.email}
                    data-testid="emailAddress"
                    validate={validateEmail}
                    placeholder="john@example.com"
                    className="form-control pl-2"
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-danger" data-testid="error-email">
                    {errors.email}
                  </div>
                )}
                <Button
                  data-testid="submit-target-btn"
                  className="btns"
                  type="submit"
                  size="sm"
                  variant="success"
                >
                  Submit
                </Button>
              </div>
            </Form>
            {userDetails && (
              <Card border="success" className="mb-5 mt-2 w-25 cards">
                <p>
                  {' '}
                  First Name :{' '}
                  <span data-testid="userDetails-firstName">
                    {userDetails.firstName}
                  </span>{' '}
                </p>
                <p>
                  {' '}
                  Last Name :
                  <span data-testid="userDetails-lastName">
                    {userDetails.lastName}
                  </span>{' '}
                </p>
                <p>
                  {' '}
                  Password :
                  <span data-testid="userDetails-password">
                    {' '}
                    {userDetails.password}{' '}
                  </span>
                </p>
                <p>
                  {' '}
                  Confirm password :{' '}
                  <span data-testid="userDetails-confirmPassword">
                    {userDetails.confirmPassword}{' '}
                  </span>
                </p>
                <p>
                  {' '}
                  Email :
                  <span data-testid="userDetails-email">
                    {' '}
                    {userDetails.email}{' '}
                  </span>
                </p>
              </Card>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};
export default FormTable;
