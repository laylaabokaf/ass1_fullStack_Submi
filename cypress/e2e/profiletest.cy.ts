describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('api_server'));
    cy.get('a[href*="login"]').click();
    cy.url().should('include', '/login') ;
    cy.get("input[id=username]").should("be.visible");
    cy.get("input[id=password]").should("be.visible");
    cy.get("input[id=username]").type("user3");
    cy.get("input[id=password]").type("123"); // '{enter}' submits the form
    cy.intercept('GET', '/api/auth/singIn').as('route');
    cy.get('button').contains('Login').click();
    cy.get('a[href*="login"]').should("not.exist");
    //cy.check('a[href*="login"]').
    cy.get('button').contains("My profile").click();
    cy.get("input[id=name]").should("be.visible");
    cy.get("input[id=name]").should("have.value","user3");
    cy.get("input[id=email]").should("have.value","user3@gmail.com");
    cy.get("input[id=username]").should("have.value","user3");
    cy.get('button').contains("Log out").click();
    cy.get('button').contains("My profile").should("not.exist");

  })

})