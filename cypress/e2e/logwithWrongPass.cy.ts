describe('unvalid pass', () => {
    it('passes', () => {
      cy.visit(Cypress.env('api_server'));
      cy.get('a[href*="login"]').click();
      cy.url().should('include', '/login') ;
      cy.get("input[id=username]").should("be.visible");
      cy.get("input[id=password]").should("be.visible");
      cy.get("input[id=username]").type("user3");
      cy.get("input[id=password]").type("1234"); // '{enter}' submits the form
      cy.get('button').contains('Login').click();
      cy.wait(1000);
      cy.get('a[href*="login"]').should("be.visible");  
      cy.get('button').contains("My profile").should("not.exist");  
    })});

    describe('unvalid name', () => {
        it('passes', () => {
          cy.visit(Cypress.env('api_server'));
          cy.get('a[href*="login"]').click();
          cy.url().should('include', '/login') ;
          cy.get("input[id=username]").should("be.visible");
          cy.get("input[id=password]").should("be.visible");
          cy.get("input[id=username]").type("user22222222222");
          cy.get("input[id=password]").type("1234"); // '{enter}' submits the form
          cy.get('button').contains('Login').click();
          cy.wait(1000);
          cy.get('a[href*="login"]').should("be.visible");  
          cy.get('button').contains("My profile").should("not.exist");  
        })});