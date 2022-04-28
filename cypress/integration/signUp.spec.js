import { faker } from "@faker-js/faker";
import { WatchDirectoryFlags } from "typescript";

describe("Sign Up", () => {
  it("when user sign up, go to / where there is a button Entrar", () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    cy.visit("localhost:3000");
    cy.contains("cadastro").click();
    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);
    cy.get("input[name=repeatPassword]").type(user.password);
    cy.contains("Cadastrar").click();

    cy.contains("Entrar");
  });
});

describe("Login", () => {
  it("when user login, go to /tests-by-disciplines and receive status", () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    cy.visit("localhost:3000");

    // Do sign up first
    cy.contains("cadastro").click();
    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);
    cy.get("input[name=repeatPassword]").type(user.password);
    cy.contains("Cadastrar").click();

    cy.wait(1000);

    // Do login
    cy.get("input[name=email]").type(user.email);
    cy.get("input[name=password]").type(user.password);
    cy.contains("Entrar").click();

    cy.wait(1000);

    cy.url().should("equal", "http://localhost:3000/tests-by-disciplines");
  });
});
