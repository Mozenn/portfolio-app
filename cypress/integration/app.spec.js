/// <reference types="Cypress" />

describe('App Features', () => {
  beforeEach(() => {
    cy.visitLandingPage();
  });

  it('should display the landing page', () => {});

  it('should switch theme', () => {
    cy.get('[data-testid="theme-button"]')
      .click()
      .should(() => {
        expect(localStorage.getItem('theme')).to.equal('"dark"');
      });
  });
});
