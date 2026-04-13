describe('API de produtos fora do ar', () => {
  it('deve exibir erro quando a API falha', () => {
    cy.intercept('GET', '**/api/products', {
      statusCode: 500,
    }).as('getErrorProducts');

    cy.visit('/');

    cy.wait('@getErrorProducts');

    cy.contains('Erro ao carregar produtos').should('be.visible');
    cy.contains('button', 'Tentar novamente').should('be.visible');
  });

  it('deve exibir produtos corretamente quando a API estiver funcionando', () => {
    cy.intercept('GET', '**/api/products', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Produto 1', price: 10.99 },
        { id: 2, name: 'Produto 2', price: 19.99 }
      ]
    }).as('getProducts');

    cy.visit('/');

    cy.wait('@getProducts');

    cy.get('ul li').should('have.length', 2);

    cy.get('ul').within(() => {
      cy.contains('Produto 1').should('be.visible');
      cy.contains('Produto 2').should('be.visible');
    });

    cy.contains('Erro ao carregar produtos').should('not.exist');
  });
});