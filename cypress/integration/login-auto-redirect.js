describe('Auto redirect from login Page if already logged in', function() {
    it('successfully redirects', function() {
      cy.window().then(win =>{
        win.sessionStorage.setItem('userTokenObject','{"access_token":"foobar"}')
      })
      cy.visit('http://localhost:4200/') 
      cy.url().should('include', '/tenantpicker')
    })
  })