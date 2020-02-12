describe('Empty Login Page', function() {
    it('successfully loads', function() {
      cy.visit('http://localhost:4200') 
      //this will be of type 'email' later on
      cy.get('form')
      .get("input[type='text']")
      .get("input[type='password']")      
      .get("button").should('be.disabled')
    })
  })
