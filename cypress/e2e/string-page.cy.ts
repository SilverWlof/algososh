import { NORMAL_DELAY, changingStyle, circle, circleBorder, circleText, defaultColor, defaultStyle, modifiedStyle, pageMainInput, recursionLink, reverseButton, visualizationElement, visualizationGrid } from "./constants/selectrs";
//import circleStyles from "../../src/components/ui/circle/circle.module.css";

const reverseString = '1234567'// <----

describe('service is available', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
        cy.get(recursionLink).click();
    });

    it('if input empty button should be disabled', function () {
        cy.get(pageMainInput).clear();
        cy.get(reverseButton).should('be.disabled')
    });

    it('reverse process should be valid', function () {
        cy.get(pageMainInput).type(reverseString);
        cy.get(reverseButton).click();

        cy.get(visualizationGrid).find(visualizationElement).should('have.length', reverseString.length);

        cy.get(visualizationGrid).find(circle).each((element, index) => {
            //// wrap this element so we can
            //// use cypress commands on it
            //cy.wrap($el).click()
            //cy.wrap(element).should('have.class', circleStyles.default)
            //cy.wrap(element).should('have.css', 'border-color', defaultColor).should("have.text", reverseString[index]);
            //cy.wrap(element).get(circleText)
            cy.wrap(element).children(defaultStyle);
            cy.wrap(element).should("have.text", reverseString[index]);
        });
        cy.wait(NORMAL_DELAY);

        let mid = Math.floor(reverseString.length / 2);
        for (let i = 0; i < mid; i++) {

            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i || index === (reverseString.length - 1 - i)) {
                    cy.wrap(element).children(changingStyle);
                }
            });
            cy.wait(NORMAL_DELAY);
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === i || index === (reverseString.length - 1 - i)) {
                    cy.wrap(element).children(modifiedStyle);
                }
            });

        }
        if (reverseString.length - 2 * mid) {
            cy.get(visualizationGrid).find(circle).each((element, index) => {
                if (index === mid) {
                    cy.wrap(element).children(modifiedStyle);
                }
            });
        }
    });
});