/// <reference types="Cypress" />

describe('Post', () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it('should display the post page', () => {
    cy.get('label').contains('Blog').click();
    cy.contains('Asking');
  });

  it('should display blog post', () => {
    cy.get('label').contains('Blog').click();
    cy.contains('Asking').scrollIntoView().click();
    cy.get('h1').should('be.visible');
  });
});
