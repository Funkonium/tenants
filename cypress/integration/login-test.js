describe('Empty Login Page', function() {
    it('successfully loads', function() {
      cy.visit('http://localhost:4200/') 
      cy.get('form')
      .get("input[type='email']")
      .get("input[type='password']")      
      .get('#loginSubmit').should('be.disabled')
      cy.get('#logoutButton').should('not.exist')
    })
  })

describe('Attempted login with incorrect credentials', function(){
  it('Refuses access', function(){
    cy.get('form')
    .get("input[type='email']").clear().type('foo@baa.com')
    .get("input[type='password']").clear().type('foobarpassword')
    .get('button').should('be.enabled').click()    
    cy.get('#errorMessage').contains('Invalid username or password')
  })
})

describe('Attempt login with no access to API',function(){
  it('Is unable to login',function(){

    cy.server()    
    cy.route({
      method: 'POST',      
      url: 'https://apidev.hakka.eu/oauth/v2/token',
      response: [],
      status: 404
    })

    cy.get('form')
    .get("input[type='email']").clear().type('foo@baa.com')
    .get("input[type='password']").clear().type('foobarpassword')
    .get('button').should('be.enabled').click()    
    cy.get('#errorMessage').contains('Unable to login')

  })
})

describe('Attempt login with invalid ouath client credentials',function(){
  it('Is unable to login',function(){

    cy.server({
      onAnyRequest: (route,  proxy) => {
        proxy.xhr.setRequestHeader('Authorization',  'Basic')
      }
    })    
    cy.route({
      method: 'POST',      
      url: 'https://apidev.hakka.eu/oauth/v2/token',
      status: 400
    })

    cy.get('form')
    .get("input[type='email']").clear().type('foo@baa.com')
    .get("input[type='password']").clear().type('foobarpassword')
    .get('button').should('be.enabled').click()    
    cy.get('#errorMessage').contains('Unable to login')

  })
})

describe('Attempted login with correct credentials', function(){
  it('Allows access', function(){
    cy.get('form')
    .get("input[type='email']").clear().type('david.hounslow@hakka.eu')
    .get("input[type='password']").clear().type('gjsM4g6qcZqanzzU')
    .get('button').should('be.enabled').click()    
    cy.url().should('include', '/tenantpicker')
  })
})