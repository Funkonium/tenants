describe('Load tenant picker page', function () {
  it('Logs in and loads the tenant picker page, populates select box', function () {
    cy.visit('http://localhost:4200/')
    cy.get('form')
      .get("input[type='email']").clear().type('david.hounslow@hakka.eu')
      .get("input[type='password']").clear().type('gjsM4g6qcZqanzzU')
      .get('button').should('be.enabled').click()
    cy.url().should('include', '/tenantpicker')
    cy.get('#tenantSelect').should('exist')
    cy.get('#logoutButton').should('exist')

  })
})

describe('Log out from tenant picker', function () {
  it('Kills session and returns to login page', function () {
    cy.get('#logoutButton').click()
    cy.get('#logoutButton').should('not.exist')
    cy.get('#errorMessage').contains('You have been logged out')
    cy.url().should('not.include', '/tenantpicker')
  })
})

describe('Log in again', function () {
  it('Logs in and loads the tenant picker page, populates select box', function () {
    cy.visit('http://localhost:4200/')
    cy.get('form')
      .get("input[type='email']").clear().type('david.hounslow@hakka.eu')
      .get("input[type='password']").clear().type('gjsM4g6qcZqanzzU')
      .get('button').should('be.enabled').click()
    cy.url().should('include', '/tenantpicker')
    cy.get('#tenantSelect').should('exist')
    cy.get('#logoutButton').should('exist')

  })
})

describe('No tenants to populate select box', function () {
  it('Will not display tenant selector, displays error message - No tenants available', function () {

    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://apidev.hakka.eu/api/v1/me/tenants',
      response: [],
      status: 200
    })
    cy.visit('http://localhost:4200/tenantpicker')
    cy.get('#tenantSelect').should('not.exist')
    cy.get('#logoutButton').should('exist')
    cy.get('#errorMessage').should('exist').contains('No tenants available')
    cy.url().should('include', '/tenantpicker')
  })
})

describe('Attempt to get tenants while no access to API', function () {
  it('Will not display tenant selector, displays error message - Unable to load tenants', function () {

    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://apidev.hakka.eu/api/v1/me/tenants',
      response: [],
      status: 404
    })
    cy.visit('http://localhost:4200/tenantpicker')
    cy.get('#tenantSelect').should('not.exist')
    cy.get('#logoutButton').should('exist')
    cy.get('#errorMessage').contains('Unable to load tenants')
    cy.url().should('include', '/tenantpicker')
  })
})

describe('Attempt to get tenants but rejected by API - 401', function () {
  it('Will auto logout', function () {

    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://apidev.hakka.eu/api/v1/me/tenants',
      response: [],
      status: 401
    })
    cy.visit('http://localhost:4200/tenantpicker')

    cy.get('#logoutButton').should('not.exist')
    cy.get('#errorMessage').contains('You have been logged out')
    cy.url().should('not.include', '/tenantpicker')
  })
})

