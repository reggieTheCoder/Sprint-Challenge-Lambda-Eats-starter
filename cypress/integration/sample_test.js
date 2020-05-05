describe("Test our form inputs", function () {
    this.beforeEach(function () {
        cy.visit("http://localhost:3000/pizza");
    });

    it("adds text to inputs", function () {
        cy.get('[data-cy="name"]').type("Reginald Alford").should("have.value", "Reginald Alford");
        cy.get("#sizes").select("large").should("have.value", "large");
        cy.get("#sauce").select("original-red").should("have.value", "original-red");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.get('[data-cy="instructions"]').type("Extra dipping sauce please. Thank you.").should("have.value", "Extra dipping sauce please. Thank you.");
        cy.contains("Add to Order").click();
    });
});