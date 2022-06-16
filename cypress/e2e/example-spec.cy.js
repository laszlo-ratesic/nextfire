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

  it('creates firestore data', () => {
    const createDoc = cy.contains('Create Document');

    createDoc.click();

    cy.contains('📜 I like Next').should('be.visible');
  });

  it('aggregates data with a firestore cloud function', () => {
    cy.get('#totalPosts').should('contain.text', '1');

    cy.contains('Create Document').click();
    cy.get('#totalPosts').should('contain.text', '2');

    cy.contains('Create Document').click();
    cy.get('#totalPosts').should('contain.text', '3');

    cy.contains('Create Document').click();
    cy.get('#totalPosts').should('contain.text', '4');
  });
});
