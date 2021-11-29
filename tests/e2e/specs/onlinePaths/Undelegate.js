describe('Undelegate', () => {
  it('Should let you do a undelegation', () => {
    const msg = {
      detail: {
        isUnlocked: true,
        isConnected: true,
        activeKey: '01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c',
      },
    };
    cy.visit('http://localhost:8080/unstake');
    const event = new CustomEvent('signer:connected', msg);
    cy.window().then((win) => {
      win.dispatchEvent(event);
    });
    cy.wait(2000);
    cy.get('#validator').parent().click();
    cy.get('#validator').type('0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5');
    cy.get('.v-list-item__title').contains('0124BFDae2Ed128fa5e4057BC398E4933329570E47240e57fc92F5611A6178EBA5').click();
    cy.wait(2000);
    cy.get('#submitOperation').click();
    cy.get('#agreeAndSign').parents('.v-dialog').should('be.visible');
    cy.get('#agreeAndSign').click().parents('.v-dialog').should('not.be.visible');
    cy.get('.operationResult').should('have.length', 1).should('contain', 'Waiting for the deploy result');
    cy.get('.operationResult', { timeout: 200000 }).should('have.length', 1).should('contain', 'Congrats ! The operation succeeded');
  });
});
