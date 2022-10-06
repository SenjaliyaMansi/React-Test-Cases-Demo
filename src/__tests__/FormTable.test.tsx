import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRenderer } from 'react-test-renderer/shallow';
import FormTable from '../FormTable';
import { act } from 'react-test-renderer';

const renderer = createRenderer();

const userDetails = {
  FirstName: 'Test',
  LastName: 'User',
  Password: 'Test@1234',
  ConfirmPassword: 'Test@1234',
  Email: 'test@gmail.com',
};

const defaultComponent = <FormTable />;

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should have correct label', () => {
    const { getByTestId } = render(defaultComponent);
    expect(getByTestId('sign-up-form')).toBeTruthy();
  });

  it('submit button is clickable', async () => {
    const { getByTestId } = render(defaultComponent);
    const submit = getByTestId('submit-target-btn');

    await act(async () => {
      fireEvent.click(submit);
    });

    expect(getByTestId('submit-target-btn')).toBeVisible();
  });

  it('A valid form data submit', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submit-target-btn');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByTestId('firstName')).toBeInTheDocument();
    expect(getByTestId('lastName')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirmPassword')).toBeInTheDocument();
  });

  it('A validation message on form data submit', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submit-target-btn');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByTestId('error-firstName')).toHaveTextContent(
      'FirstName is required',
    );
    expect(getByTestId('error-lastName')).toHaveTextContent(
      'LastName is required',
    );
    expect(getByTestId('error-password')).toHaveTextContent(
      'Password is required',
    );
    expect(getByTestId('error-confirmPassword')).toHaveTextContent(
      'Confirm Password is required',
    );
    expect(getByTestId('error-email')).toHaveTextContent('Email is required');
  });

  it('form data value on submit button click', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submit-target-btn');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByTestId('userDetails-firstName')).toBeInTheDocument();

    expect(getByTestId('userDetails-lastName')).toBeInTheDocument();

    expect(getByTestId('userDetails-password')).toBeInTheDocument();

    expect(getByTestId('userDetails-confirmPassword')).toBeInTheDocument();

    expect(getByTestId('userDetails-email')).toBeInTheDocument();
  });

  it('Check the email value', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submit-target-btn');
    const emailField = screen.getByTestId('emailAddress');

    await act(async () => {
      fireEvent.change(emailField, {
        target: { value: 'test00hfhdhhfgmailco' },
      });

      submitButton.dispatchEvent(new Event('submit'));
    });

    expect(getByTestId('emailAddress')).toBeTruthy();
  });

  it('Display value on submit button', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submit-target-btn');

    await act(async () => {
      fireEvent.click(submitButton);
    });

     await waitFor(() =>{
      expect(getByTestId('firstName')).toHaveTextContent(`${userDetails.FirstName}`);
    })
   
  });
});
