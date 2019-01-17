describe('Registration page', () => {
    const EMAIL = `test+${Date.now()}@laguro.com`;
    const FIRST_NAME = 'William';
    const MIDDLE_NAME = 'William';
    const LAST_NAME = 'Choi';
    const PASSWORD = '123456';
    const MY_PROFILE_URL = '/profile?selectedTab=my_profile';

    it('creates a new user', () => {
        cy.visit('/');
        cy.contains('log in').click();
        cy.contains('register now').click();
        cy.get('input[id="firstName"]').type(FIRST_NAME);
        cy.get('input[id="middleName"]').type(MIDDLE_NAME);
        cy.get('input[id="lastName"]').type(LAST_NAME);
        cy.get('input[id="email"]').type(EMAIL);
        cy.get('input[id="password"]').type(PASSWORD);
        cy.contains('create account').click();
        cy.get('form').should('have.length', 0);
        cy.visit(MY_PROFILE_URL);
        cy.get('input[id="firstName"]').should('have.value', FIRST_NAME);
        cy.get('.ant-dropdown-trigger').trigger('mouseover');
        cy.contains('log out').click();
        cy.contains('log in').click();
        cy.get('input[id="email"]').type(EMAIL);
        cy.get('input[id="password"]').type(PASSWORD);
        cy.get('form')
            .contains('log in')
            .click();
        cy.get('form').should('have.length', 0);
        cy.visit(MY_PROFILE_URL);
        cy.get('input[id="firstName"]').should('have.value', FIRST_NAME);
    });
});
