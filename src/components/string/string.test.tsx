import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { StringComponent } from './string';
import { BrowserRouter } from 'react-router-dom';

// even length of input
it('even input', () => {
    window.alert = jest.fn();

    render(<BrowserRouter><StringComponent defaultString="1234" isDebugging={true} /></BrowserRouter>)

    const button = screen.getByTestId("fireAlgorithmButton");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('4321');
});
// not even length of input
it('not even input', () => {
    window.alert = jest.fn();

    render(<BrowserRouter><StringComponent defaultString="12345" isDebugging={true} /></BrowserRouter>)

    const button = screen.getByTestId("fireAlgorithmButton");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('54321');
});
// one symbol length of input
it('one symbol', () => {
    window.alert = jest.fn();

    render(<BrowserRouter><StringComponent defaultString="1" isDebugging={true} /></BrowserRouter>)

    const button = screen.getByTestId("fireAlgorithmButton");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('1');
});
// empty imput, button disabled
it('blocked button', () => {
    const tree = renderer
        .create(<BrowserRouter><StringComponent defaultString=""/></BrowserRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});