describe('Registration step 1', () => {
  beforeEach(() => {
    cy.visit('/registrar?domain=cypressdomain');
  });

  it('shows the price of a domain without prompting rLogin', () => {
    cy.get('h1.sub-heading').should('have.text', 'Registering: cypressdomain.rsk');
    cy.get('.rifPrice').should('have.text', '5 rif');
  });

  it('increases and decreases the price', () => {
    cy.contains('+').click();
    cy.get('.rifPrice').should('have.text', '6 rif');
    cy.contains('-').click();
    cy.get('.rifPrice').should('have.text', '5 rif');
  });

  it('should prompt rLogin when register is clicked', () => {
    cy.get('.commitButton').click();
    cy.get('h2.rlogin-header2').should('have.text', 'Connect your wallet');
  });

  it('register button should be enabled if rLogin is cancelled', () => {
    cy.get('.commitButton').click();
    cy.get('body').click();
    cy.get('.rlogin-modal-lightbox').should('be.not.visible');

    cy.get('.commitButton').click();
    cy.get('h2.rlogin-header2').should('have.text', 'Connect your wallet');
  });
});
