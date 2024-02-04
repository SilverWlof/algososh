import { fibonacciLink, pageMainInput, countButton, NORMAL_DELAY, visualizationGrid, visualizationElement, circle, circleText } from "./constants/selectrs";

const maxValue = 19;
const correctInput = Math.floor(Math.random() * maxValue) + 1;
const fibonacciList = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

describe('service is available', function () {
    beforeEach(function () {
        cy.visit();
        cy.get(fibonacciLink).click();
    });

    it('if input empty button should be disabled', function () {
        cy.get(pageMainInput).clear();
        cy.get(countButton).should('be.disabled')
    });

    it('fibonacci list generation is correct', function () {
        cy.get(pageMainInput).type(correctInput);
        cy.get(countButton).click();
        cy.wait(NORMAL_DELAY * (correctInput + 1));

        cy.get(visualizationGrid).find(visualizationElement).should('have.length', correctInput+1);


        cy.get(visualizationGrid).find(circleText).each((element, index) => {
            cy.wrap(element).should("have.text", fibonacciList[index]);
        });
    });

});