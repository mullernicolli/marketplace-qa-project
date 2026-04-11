describe('API de produtos fora do ar', () => {
  it('deve exibir erro quando a API falha', () => {
    cy.intercept('GET', '**/api/products', {
      statusCode: 500,
    }).as('getProducts');

    cy.visit('/');

    cy.wait('@getProducts');

    cy.contains('Erro ao carregar produtos').should('be.visible');
    cy.contains('button', 'Tentar novamente').should('be.visible');
  });
});