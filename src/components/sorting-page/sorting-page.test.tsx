import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { SortingPage, select, bubble } from './sorting-page';
import { BrowserRouter } from 'react-router-dom';

function randomArr(arrLength: number) {
    const result: number[] = [];
    for (let i = 0; i < arrLength; i++) {
        result.push(Math.floor(Math.random() * 101));
    }
    return result;
}
const delimeter = ";;";
// zero array
const emptyArr: number[] = [];
//// selection
////// up
it('zero array -> selection -> up', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={select} defaultNumbersList={emptyArr} debugAlertDelimeter={delimeter}/></BrowserRouter>)

    const upButton = screen.getByTestId("fireUpAlgorithmButton");

    fireEvent.click(upButton);

    expect(window.alert).toHaveBeenCalledWith('');
});
////// down
it('zero array -> selection -> down', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={select} defaultNumbersList={emptyArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const downButton = screen.getByTestId("fireDownAlgorithmButton");

    fireEvent.click(downButton);

    expect(window.alert).toHaveBeenCalledWith('');
});
//// bubble
////// up
it('zero array -> bubble -> up', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={bubble} defaultNumbersList={emptyArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const upButton = screen.getByTestId("fireUpAlgorithmButton");

    fireEvent.click(upButton);

    expect(window.alert).toHaveBeenCalledWith('');
});
////// down
it('zero array -> bubble -> down', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={bubble} defaultNumbersList={emptyArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const downButton = screen.getByTestId("fireDownAlgorithmButton");

    fireEvent.click(downButton);

    expect(window.alert).toHaveBeenCalledWith('');
});

// one element array
const oneElementArr: number[] = [Math.floor(Math.random() * 101)];
let upResult = oneElementArr[0].toString();
let downResult = oneElementArr[0].toString();
//// selection
////// up
it('one element array -> selection -> up', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={select} defaultNumbersList={oneElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const upButton = screen.getByTestId("fireUpAlgorithmButton");

    fireEvent.click(upButton);

    expect(window.alert).toHaveBeenCalledWith(upResult);
});
////// down
it('one element array -> selection -> down', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={select} defaultNumbersList={oneElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const downButton = screen.getByTestId("fireDownAlgorithmButton");

    fireEvent.click(downButton);

    expect(window.alert).toHaveBeenCalledWith(downResult);
});
//// bubble
////// up
it('one element array -> bubble -> up', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={bubble} defaultNumbersList={oneElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const upButton = screen.getByTestId("fireUpAlgorithmButton");

    fireEvent.click(upButton);

    expect(window.alert).toHaveBeenCalledWith(upResult);
});
////// down
it('one element array -> bubble -> down', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={bubble} defaultNumbersList={oneElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const downButton = screen.getByTestId("fireDownAlgorithmButton");

    fireEvent.click(downButton);

    expect(window.alert).toHaveBeenCalledWith(downResult);
});

// several element array
const severalElementArr: number[] = randomArr(Math.floor(Math.random() * 15) + 3);
const upSeveralResult = [...severalElementArr].sort(function (a, b) { return a - b }).join(delimeter);
const downSeveralResult = [...severalElementArr].sort(function (a, b) { return b - a }).join(delimeter);
//// selection
////// up
it('several element array -> selection -> up', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={select} defaultNumbersList={severalElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const upButton = screen.getByTestId("fireUpAlgorithmButton");

    fireEvent.click(upButton);

    expect(window.alert).toHaveBeenCalledWith(upSeveralResult);
});
////// down
it('several element array -> selection -> down', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={select} defaultNumbersList={severalElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const downButton = screen.getByTestId("fireDownAlgorithmButton");

    fireEvent.click(downButton);

    expect(window.alert).toHaveBeenCalledWith(downSeveralResult);
});
//// bubble
////// up
it('several element array -> bubble -> up', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={bubble} defaultNumbersList={severalElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const upButton = screen.getByTestId("fireUpAlgorithmButton");

    fireEvent.click(upButton);

    expect(window.alert).toHaveBeenCalledWith(upSeveralResult);
});
////// down
it('several element array -> bubble -> down', () => {
    window.alert = jest.fn();
    render(<BrowserRouter><SortingPage isDebugging={true} sortingType={bubble} defaultNumbersList={severalElementArr} debugAlertDelimeter={delimeter} /></BrowserRouter>)

    const downButton = screen.getByTestId("fireDownAlgorithmButton");

    fireEvent.click(downButton);

    expect(window.alert).toHaveBeenCalledWith(downSeveralResult);
});