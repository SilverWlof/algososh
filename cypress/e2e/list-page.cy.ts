import { SMALL_DELAY, addHeadButton, addIndexButton, addTailButton, changingStyle, circle, circleBorder, circleHead, circleTail, circleText, defaultStyle, indexInput, listLink, modifiedStyle, pageMainInput, removeHeadButton, removeIndexButton, removeTailButton, visualizationElement, visualizationGrid } from "./constants/selectrs";

const headInputText = 'head';
const tailInputText = 'tail';
const indexInputText = 'ind';
const index = 3;
describe('service is available', function () {
    beforeEach(function () {
        cy.visit();
        cy.get(listLink).click();
    });
    //1
    it('if input empty button should be disabled', function () {
        cy.get(pageMainInput).clear();
        cy.get(addHeadButton).should('be.disabled')
        cy.get(addTailButton).should('be.disabled')
        cy.get(addIndexButton).should('be.disabled')
    });

    //2
    it('default list should be drawn correctly', function () {
        cy.get(visualizationGrid).find(circle).each((element, ind) => {
            cy.wrap(element).children(defaultStyle);
            cy.wrap(element).get(circleText).should("not.have.text", '');
        });
    });

    //3
    it('add to head proccess should be correct', function () {
        cy.get(pageMainInput).type(headInputText);
        cy.get(addHeadButton).click();

        cy.get(visualizationGrid).find(visualizationElement).each((element, ind) => {
            if (ind === 0) {
                cy.wrap(element).find(circleHead).find(circle).children(changingStyle);
                cy.wrap(element).find(circleHead).find(circle).should("have.text", headInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind) => {
            if (ind === 0) {
                cy.wrap(element).find(circle).children(modifiedStyle);
                cy.wrap(element).find(circle).find(circleBorder).find(circleText).should("have.text", headInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind) => {
            if (ind === 0) {
                cy.wrap(element).find(circle).children(defaultStyle);
                cy.wrap(element).find(circle).find(circleBorder).find(circleText).should("have.text", headInputText);
            }
        });
    });

    //4
    it('add to tail proccess should be correct', function () {
        cy.get(pageMainInput).type(tailInputText);
        cy.get(addTailButton).click();

        cy.get(visualizationGrid).find(visualizationElement).each((element, ind,list) => {
            if (ind === list.length-1) {
                cy.wrap(element).find(circleHead).find(circle).children(changingStyle);
                cy.wrap(element).find(circleHead).find(circle).should("have.text", tailInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind, list) => {
            if (ind === list.length - 1) {
                cy.wrap(element).find(circle).children(modifiedStyle);
                cy.wrap(element).find(circle).find(circleBorder).find(circleText).should("have.text", tailInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind, list) => {
            if (ind === list.length - 1) {
                cy.wrap(element).find(circle).children(defaultStyle);
                cy.wrap(element).find(circle).find(circleBorder).find(circleText).should("have.text", tailInputText);
            }
        });
    });

    //5
    it('add to index proccess should be correct', function () {
        cy.get(pageMainInput).type(indexInputText);
        cy.get(indexInput).type(index);
        cy.get(addIndexButton).click();

        for (let i = 0; i <= index; i++) {
            cy.get(visualizationGrid).find(visualizationElement).each((element, ind, list) => {
                if (ind === i) {
                    cy.wrap(element).find(circleHead).find(circle).children(changingStyle);
                    cy.wrap(element).find(circleHead).find(circle).should("have.text", indexInputText);
                }
            });
            cy.wait(SMALL_DELAY);
        }
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind, list) => {
            if (ind === index) {
                cy.wrap(element).find(circle).children(modifiedStyle);
                cy.wrap(element).find(circle).find(circleBorder).find(circleText).should("have.text", indexInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind, list) => {
            if (ind === index) {
                cy.wrap(element).find(circle).children(defaultStyle);
                cy.wrap(element).find(circle).find(circleBorder).find(circleText).should("have.text", indexInputText);
            }
        });
    });

    //6
    it('remove from head proccess should be correct', function () {
        cy.get(pageMainInput).type(headInputText);
        cy.get(addHeadButton).click();
        cy.wait(2*SMALL_DELAY);
        //cy.get(pageMainInput).type(headInputText);
        //cy.get(addHeadButton).click();
        //cy.wait(SMALL_DELAY);
        //cy.wait(SMALL_DELAY);
        cy.get(removeHeadButton).click();

        cy.get(visualizationGrid).find(visualizationElement).each((element, ind) => {
            if (ind === 0) {
                cy.wrap(element).find(circleTail).find(circle).children(changingStyle);
                cy.wrap(element).find(circleTail).find(circle).should("have.text", headInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).should('not.contain', headInputText)
    });

    //7
    it('remove from tail proccess should be correct', function () {
        cy.get(pageMainInput).type(tailInputText);
        cy.get(addTailButton).click();
        cy.wait(2*SMALL_DELAY);
        //cy.get(pageMainInput).type(tailInputText);
        //cy.get(addTailButton).click();
        //cy.wait(SMALL_DELAY);
        //cy.wait(SMALL_DELAY);
        cy.get(removeTailButton).click();

        cy.get(visualizationGrid).find(visualizationElement).each((element, ind, list) => {
            if (ind === list.length - 1) {
                cy.wrap(element).find(circleTail).find(circle).children(changingStyle);
                cy.wrap(element).find(circleTail).find(circle).should("have.text", tailInputText);
            }
        });
        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).should('not.contain', tailInputText)
    });

    //7
    it('remove from index proccess should be correct', function () {
        cy.get(pageMainInput).type(indexInputText);
        cy.get(indexInput).type(index);
        cy.get(addIndexButton).click();
        cy.wait((index+3)*SMALL_DELAY);
        cy.get(indexInput).clear();
        cy.get(indexInput).type(index);
        cy.get(removeIndexButton).click();

        cy.wait(index * SMALL_DELAY);
        cy.get(visualizationGrid).find(visualizationElement).each((element, ind) => {
            if (ind === index) {
                cy.wrap(element).find(circleTail).find(circle).children(changingStyle);
                cy.wrap(element).find(circleTail).find(circle).should("have.text", indexInputText);
            }
        });

        cy.wait(SMALL_DELAY);
        cy.get(visualizationGrid).should('not.contain', indexInputText)
    });
});