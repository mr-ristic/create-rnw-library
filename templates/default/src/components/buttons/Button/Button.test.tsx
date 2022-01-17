import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

const buttonLabel = 'Testing Button';

describe('Test <Button> component', () => {
  it('is truthy', () => {
    expect(Button).toBeTruthy();
  });

  it('Renders button with given label', () => {
    const { getByText } = render(
      <>
        <Button label={buttonLabel} />
      </>
    );
    const buttonRenderd = getByText(buttonLabel);
    expect(buttonRenderd).toBeTruthy();
  });

  it('Calls a provided function on button click', () => {
    const onButtonClickHandler = jest.fn(() => false);
    const { getByText } = render(
      <>
        <Button label={buttonLabel} onClick={onButtonClickHandler} />
      </>
    );
    const buttonRenderd = getByText(buttonLabel);
    fireEvent.press(buttonRenderd);
    expect(onButtonClickHandler).toBeCalledTimes(1);
  });

  it('Does not call a provided function on button click when disabled', () => {
    const onButtonClickHandler = jest.fn(() => false);
    const { getByText } = render(
      <>
        <Button disabled label={buttonLabel} onClick={onButtonClickHandler} />
      </>
    );
    const buttonRenderd = getByText(buttonLabel);
    fireEvent.press(buttonRenderd);
    expect(onButtonClickHandler).toBeCalledTimes(0);
  });
});
