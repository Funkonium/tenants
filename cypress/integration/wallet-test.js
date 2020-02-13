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

describe('Gets wallet balance', function () {
  it('Will update wallet balance when tenant selected', function () {

    cy.get('#tenantSelect').should('exist').select('Trucking Company Netherlands')
    cy.get('#errorMessage').should('not.exist')
    cy.get('#creditDisplay').should('exist').contains('Credits:')
  })
})

describe('Empty wallet data', function () {
  it('Will display error message relating to wallet balance', function () {

    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://apidev.hakka.eu/api/v1/me/wallet',
      response: [],
      status: 200
    })
    cy.visit('http://localhost:4200/tenantpicker')
    cy.get('#logoutButton').should('exist')
    cy.get('#tenantSelect').should('exist').select('Trucking Company Netherlands')

    cy.url().should('include', '/tenantpicker')
    cy.get('#errorMessage').should('exist').contains('Unable to display wallet balance')
    cy.get('#creditDisplay').should('not.exist')
  })
})

describe('Attempt to get wallet balance while no access to API - 404', function () {
  it('Will display error message', function () {

    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://apidev.hakka.eu/api/v1/me/wallet',
      response: [],
      status: 404
    })
    cy.visit('http://localhost:4200/tenantpicker')
    cy.get('#logoutButton').should('exist')
    cy.get('#tenantSelect').should('exist').select('Trucking Company Netherlands')

    cy.url().should('include', '/tenantpicker')
    cy.get('#errorMessage').should('exist').contains('Unable to update wallet')
    cy.get('#creditDisplay').should('not.exist')    
  })
})

describe('Attempt to get wallet balance but rejected by API - 401', function () {
  it('Will auto logout', function () {

    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://apidev.hakka.eu/api/v1/me/wallet',
      response: [],
      status: 401
    })
    cy.visit('http://localhost:4200/tenantpicker')
    cy.get('#logoutButton').should('exist')
    cy.get('#tenantSelect').should('exist').select('Trucking Company Netherlands')

    cy.url().should('not.include', '/tenantpicker')
  })
})


// describe('Log out from tenant picker', function () {
//   it('Kills session and returns to login page', function () {
//     cy.get('#logoutButton').click()
//   })
// })



