describe('PetStore API Tests', () => {
  const baseUrl = 'https://petstore.swagger.io/v2';

  it('should be able to create, update, search, and delete a user', () => {
    cy.fixture('users').then((users) => {
      // Create a new user
      cy.request({
        method: 'POST',
        url: `${baseUrl}/user`,
        body: {
          username: users.username,
          password: users.password,
          email: users.email,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);

        cy.request({
          method: 'GET',
          url: `${baseUrl}/user/${users.username}`,
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.username).to.equal(users.username);
          expect(response.body.email).to.equal(users.email);

          cy.request({
            method: 'PUT',
            url: `${baseUrl}/user/${users.username}`,
            body: {
              username: users.newUsername,
              email: users.newEmail,
            },
          }).then((response) => {
            expect(response.status).to.equal(200);

            cy.request({
              method: 'GET',
              url: `${baseUrl}/user/${users.newUsername}`,
            }).then((response) => {
              expect(response.status).to.equal(200);
              expect(response.body.username).to.equal(users.newUsername);
              expect(response.body.email).to.equal(users.newEmail);

              cy.request({
                method: 'DELETE',
                url: `${baseUrl}/user/${users.newUsername}`,
              }).then((response) => {
                expect(response.status).to.equal(200);
              });
            });
          });
        });
      });
    });
  });
});
