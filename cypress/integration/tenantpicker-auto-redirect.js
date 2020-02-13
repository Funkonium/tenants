describe('Auto redirect from login Page if access token is zero length', function() {
    it('Will redirect to login page', function() {
      cy.window().then(win =>{
        win.sessionStorage.removeItem('userTokenObject','{"access_token":""}')
      })
      cy.visit('http://localhost:4200/tenantpicker') 
      cy.url().should('not.include', '/tenantpicker')
      cy.get('#logoutButton').should('not.exist')        
      cy.get('#errorMessage').contains('You have been logged out') 

    })
  })