/// <reference types="cypress" />

const baseUrl = 'http://localhost:5000';

describe('my app', () => {
  before(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  it('loads', () => {
    cy.visit(baseUrl);
    cy.contains('Firebase Hosting Setup Complete');
  });

  it('signs the user in', () => {
    const signIn = cy.contains('Sign In Anonymously');

    signIn.click();

    cy.contains('Sign Out').should('be.visible');
  });
});
