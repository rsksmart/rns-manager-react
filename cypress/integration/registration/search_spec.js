describe('landing page search', () => {
  it('shows results for an available domain', () => {
    cy.visit('/');
    cy.get('input').type('cypressdomain');
    cy.get('.searchBox button').click();
    cy.contains('cypressdomain.rsk');
  });
});
