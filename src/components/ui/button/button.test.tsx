import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

// 1 button with text
it('button with text', () => {
    const tree = renderer
        .create(<Button text="button test 2 text" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
}); 

// 2 button without test
it('button without test', () => {
    const tree = renderer
        .create(<Button />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

// 3 blocked button
it('blocked button', () => {
    const tree = renderer
        .create(<Button disabled={true} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

// 4 button with loader
it('button with loader', () => {
    const tree = renderer
        .create(<Button isLoader={true} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
// 5 button handler
it('button handler', () => {
    window.alert = jest.fn();

    const onClickTest = () => {
        alert('ClickHandler')
    }

    render(<Button text="button handle click test" onClick={onClickTest} />)

    const button = screen.getByText("button handle click test");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('ClickHandler');
}); 