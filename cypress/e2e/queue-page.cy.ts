import { NORMAL_DELAY, addButton, changingStyle, circle, circleHead, circleTail, circleText, clearButton, defaultStyle, pageMainInput, queueLink, removeButton, visualizationElement, visualizationGrid } from "./constants/selectrs";

const inputAmount = Math.floor(Math.random() * 5) + 2;
describe('service is available', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        cy.get(queueLink).click();
    });
    //1
    it('if input empty button should be disabled', function () {
        cy.get(pageMainInput).clear();
        cy.get(addButton).should('be.disabled')
    });
    //2
    it('add proccess should be correct', function () {
        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(addButton).click();

            //
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i) {
                    cy.wrap(element).children(changingStyle);
                    //
                }
            });
            cy.wait(NORMAL_DELAY);
            //
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === 0) {
                    //
                    cy.wrap(element).get(circleHead).should("have.text", "head");
                }
                if (index === i) {
                    cy.wrap(element).children(defaultStyle);
                    cy.wrap(element).get(circleTail).should("have.text", "tail");
                }
            });
        }
    });
    //3
    it('remove proccess should be correct', function () {
        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(addButton).click();
            cy.wait(NORMAL_DELAY);
        }

        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(removeButton).click();

            //
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i) {
                    cy.wrap(element).children(changingStyle);
                }
            });
            cy.wait(NORMAL_DELAY);
            //


            cy.get(visualizationGrid).find(circle).each((element, index) => {
                cy.wrap(element).children(defaultStyle);
            });
        }
    });
    //4
    it('clear proccess should be correct', function () {
        for (let i = 0; i < inputAmount; i++) {
            cy.get(pageMainInput).type(i);
            cy.get(addButton).click();
            cy.wait(NORMAL_DELAY);
        }
        cy.get(clearButton).click();

        cy.get(visualizationGrid).find(circle).each((element, index) => {
            cy.wrap(element).children(defaultStyle);
            cy.wrap(element).get(circleHead).should("not.have.text", "head");
            cy.wrap(element).get(circleTail).should("not.have.text", "tail");
            cy.wrap(element).get(circleText).should("not.have.text", index);
        });
    });

});