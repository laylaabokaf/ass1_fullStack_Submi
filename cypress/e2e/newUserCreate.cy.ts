
describe('create new user with exist user name ', () => {
    it('passes', () => {

        cy.visit(Cypress.env('api_server'));
      cy.get('a[href*="signup"]').click();

      cy.get("input[id=username]").should("be.visible");
      cy.get("input[id=password]").should("be.visible");
      cy.get("input[id=email]").should("be.visible");
      cy.get("input[id=name]").should("be.visible");
      cy.get("input[id=username]").type("user3");
      cy.get("input[id=password]").type("12343"); // '{enter}' submits the form
      cy.get("input[id=email]").type("user04@gmail.com"); // '{enter}' submits the form
      cy.get("input[id=name]").type("user04"); // '{enter}' submits the form
 
      cy.get('button').contains('Sign Up').click();
      cy.wait(1000)
      cy.url().should('not.include', '/login') ;
   
    })});
//THIS TEST WILL WORK PASS ONE TIME!!
//CHANGE USER NAME TO NEW USER 
describe('create new user ', () => {
    it('passes', () => {
      cy.visit(Cypress.env('api_server'));
      cy.get('a[href*="signup"]').click();

      cy.get("input[id=username]").should("be.visible");
      cy.get("input[id=password]").should("be.visible");
      cy.get("input[id=email]").should("be.visible");
      cy.get("input[id=name]").should("be.visible");
      cy.get("input[id=username]").type("user055");
      cy.get("input[id=password]").type("12343"); // '{enter}' submits the form
      cy.get("input[id=email]").type("user055@gmail.com"); // '{enter}' submits the form
      cy.get("input[id=name]").type("user055"); // '{enter}' submits the form
 
      cy.get('button').contains('Sign Up').click();
      cy.wait(1000)
      cy.url().should('include', '/login') ;
      cy.get("input[id=username]").should("be.visible");
      cy.get("input[id=password]").should("be.visible");
      cy.get("input[id=username]").type("user055");
      cy.get("input[id=password]").type("12343"); // '{enter}' submits the form
      cy.get('button').contains('Login').click();
      cy.wait(1000)
      //cy.url().should('include', '/login') ;
    //   cy.intercept('GET', '/api/auth/singIn').as('route');
    //   cy.get('button').contains('Login').click();
    //   cy.get('a[href*="login"]').should("not.exist");
    //   //cy.check('a[href*="login"]').
       cy.get('button').contains("My profile").click();
       cy.get("input[id=name]").should("be.visible");
       cy.get("input[id=name]").should("have.value","user055");
      // cy.get("input[id=email]").should("have.value","user3@gmail.com");
    //   cy.get("input[id=username]").should("have.value","user3");
    //   cy.get('button').contains("Log out").click();
    //   cy.get('button').contains("My profile").should("not.exist");
  
    })
  
  })