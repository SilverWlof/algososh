import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

// 1 without letter
it('circle without letter', () => {
    const tree = renderer
        .create(<Circle />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//2 with letters
it('button with letters', () => {
    const tree = renderer
        .create(<Circle letter="test letters"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//3 with head
it('circle with head', () => {
    const tree = renderer
        .create(<Circle head="test text"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//4 with react in head
it('circle with react in head', () => {
    const tree = renderer
        .create(<Circle head={<Circle />} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

// with tail
it('circle with tail', () => {
    const tree = renderer
        .create(<Circle tail="test text" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//5 with react in tail
it('circle with react in tail', () => {
    const tree = renderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//6 with index
it('circle with index', () => {
    const tree = renderer
        .create(<Circle index={0} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//7 with isSmall ===  true
it('circle with isSmall ===  true', () => {
    const tree = renderer
        .create(<Circle isSmall={true} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//8 in state equal :default
it('circle in state equal :default', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//9 in state equal :changing
it('circle in state equal :changing', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

//10 in state equal :modified
it('circle in state equal :modified', () => {
    const tree = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});