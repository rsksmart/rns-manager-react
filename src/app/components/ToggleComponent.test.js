import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToggleComponent from './ToggleComponent';


describe('toggleComponent', () => {
  const handleChange = jest.fn();
  it('defaults matches snapshot', () => {
    const { container } = render(<ToggleComponent onChange={handleChange} />);
    expect(container.querySelector('input[type="checkbox"]').checked).toBe(false);

    const activeButton = container.querySelector('button.active');
    expect(activeButton.textContent).toEqual('leftLabel');

    expect(container).toMatchSnapshot();
  });

  it('toggleSwitch active matches snapshot', () => {
    const { container } = render(<ToggleComponent onChange={handleChange} value />);
    expect(container.querySelector('input[type="checkbox"]').checked).toBe(true);

    const activeButton = container.querySelector('button.active');
    expect(activeButton.textContent).toEqual('rightLabel');

    expect(container).toMatchSnapshot();
  });

  it('sets the text from the parent', () => {
    const { container } = render(
      <ToggleComponent labelLeft="LEFT" labelRight="RIGHT" onChange={handleChange} />,
    );

    expect(container.querySelector('button.left').textContent).toEqual('LEFT');
    expect(container.querySelector('button.right').textContent).toEqual('RIGHT');
  });

  it('calls the function when switched or clicked', () => {
    const { container } = render(
      <ToggleComponent labelLeft="LEFT" labelRight="RIGHT" onChange={handleChange} />,
    );

    expect(handleChange).toBeCalledTimes(0);
    fireEvent.click(container.querySelector('#toggleSwitch'));
    expect(handleChange).toBeCalledTimes(1);

    fireEvent.click(container.querySelector('button.left'));
    expect(handleChange).toBeCalledTimes(2);

    fireEvent.click(container.querySelector('button.right'));
    expect(handleChange).toBeCalledTimes(3);
  });

  it('returns correct value when buttons are clicked', () => {
    const { container } = render(
      <ToggleComponent onChange={handleChange} />,
    );

    fireEvent.click(container.querySelector('button.right'));
    expect(handleChange).toBeCalledWith(true);

    fireEvent.click(container.querySelector('button.left'));
    expect(handleChange).toBeCalledWith(false);
  });
});
