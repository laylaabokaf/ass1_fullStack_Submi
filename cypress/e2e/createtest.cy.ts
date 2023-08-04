describe('create post', () => {
    it('passes', () => {
      cy.visit(Cypress.env('api_server'));
      cy.get('a[href*="login"]').click();
      cy.url().should('include', '/login') ;
      cy.get("input[id=username]").should("be.visible");
      cy.get("input[id=password]").should("be.visible");
      cy.get("input[id=username]").type("user3");
      cy.get("input[id=password]").type("123"); // '{enter}' submits the form
    //   cy.intercept('GET', '/api/auth/singIn').as('route');
       cy.get('button').contains('Login').click();
    //   cy.get('a[href*="login"]').should("not.exist");
    //   //cy.check('a[href*="login"]').
       cy.get('button').contains("New post").click();
       cy.get("input[placeholder = Title]").should("be.visible");
       cy.get("input[placeholder = Title]").type("test for create");
       cy.get("textarea[id=content]").should("be.visible");
       cy.get("textarea[id=content]").type("test for user 3");
       cy.get("input[type=submit]").click();
       cy.get("h2").contains("test for create");
    })
  
  })