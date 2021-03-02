describe('landing page search', () => {
  it('searches for an item', () => {
    cy.visit('/');
    cy.get('input').type('cypressdomain')
    cy.get('.searchBox button').click()

    cy.contains('cypressdomain.rsk')
  })

  it('starts registration process', () => {
    cy.get('button.register').click()
    cy.get('h1.sub-heading').should('have.text', 'Registering:')
  })
})