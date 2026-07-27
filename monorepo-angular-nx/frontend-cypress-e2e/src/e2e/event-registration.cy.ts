describe('Event Registration', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('auth_token', 'test-token');
    });
  });

  describe('Success', () => {
    it('should submit form with valid data', () => {
      cy.intercept('POST', '/api/events', {
        statusCode: 201,
        body: {
          id: '1',
          nome: 'Evento Teste',
          endereco: 'Rua Teste, 123',
          capacidade: 100,
          data: '2026-12-31',
        },
      }).as('createEvent');

      cy.visit('/event/new');

      cy.get('#nome').type('Evento Teste');
      cy.get('#endereco').type('Rua Teste, 123');
      cy.get('#capacidade').type('100');
      cy.get('#data').type('2026-12-31');

      cy.get('button[type="submit"]').click();

      cy.wait('@createEvent');
      cy.contains('Evento criado com sucesso!').should('be.visible');
    });
  });

  describe('Validation Errors', () => {
    it('should show validation errors when submitting empty form', () => {
      cy.visit('/event/new');

      cy.get('#nome').focus().blur();
      cy.get('#endereco').focus().blur();
      cy.get('#capacidade').clear().focus().blur();
      cy.get('#data').focus().blur();

      cy.get('.error').should('have.length.greaterThan', 0);
      cy.contains('Nome é obrigatório.').should('be.visible');
      cy.contains('Endereço é obrigatório.').should('be.visible');
      cy.contains('Capacidade é obrigatória.').should('be.visible');
      cy.contains('Data é obrigatória.').should('be.visible');
    });
  });
});
