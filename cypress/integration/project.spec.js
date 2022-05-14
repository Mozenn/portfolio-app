/// <reference types="Cypress" />

describe('Project', () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it('should display the project page', () => {
    cy.get('label').contains('Projects').click();
    cy.contains('Aqueduc');
  });

  it('should display project', () => {
    cy.get('label').contains('Projects').click();
    cy.contains('Aqueduc').click({ force: true });
    cy.get('h2').contains('Aqueduc').should('be.visible');
  });
});
