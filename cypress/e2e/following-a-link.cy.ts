import { fibonacciLink, fibonacciPage, listLink, listPage, mainPage, queueLink, queuePage, recursionLink, recursionPage, returnButton, sortingLink, sortingPage, stackLink, stackPage } from "./constants/selectrs";

describe('all pages are available', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000');
    });
    //
    it('should open string page and return', function () {
        
        cy.get(recursionLink).click();
        cy.get(recursionPage).should('be.visible');
        cy.get(returnButton).click();
        cy.get(mainPage).should('be.visible');
    });

    it('should open fibonacci page and return', function () {

        cy.get(fibonacciLink).click();
        cy.get(fibonacciPage).should('be.visible');
        cy.get(returnButton).click();
        cy.get(mainPage).should('be.visible');
    });

    it('should open sorting page and return', function () {

        cy.get(sortingLink).click();
        cy.get(sortingPage).should('be.visible');
        cy.get(returnButton).click();
        cy.get(mainPage).should('be.visible');
    });

    it('should open sorting page and return', function () {

        cy.get(stackLink).click();
        cy.get(stackPage).should('be.visible');
        cy.get(returnButton).click();
        cy.get(mainPage).should('be.visible');
    });

    it('should open sorting page and return', function () {

        cy.get(queueLink).click();
        cy.get(queuePage).should('be.visible');
        cy.get(returnButton).click();
        cy.get(mainPage).should('be.visible');
    });

    it('should open sorting page and return', function () {

        cy.get(listLink).click();
        cy.get(listPage).should('be.visible');
        cy.get(returnButton).click();
        cy.get(mainPage).should('be.visible');
    });
});