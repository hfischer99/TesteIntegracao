const request = require("supertest");
const ApiUrl = "http://localhost:8080";

describe("GET /user", () => {
  it("Teste rota GET usuários", () => {
    return request(ApiUrl)
      .get("/user")
      .expect(200)
  });

  
});

describe("POST /user", () => {
  it("Teste add novo usuário", () => {
    return request(ApiUrl)
      .post("/user")
      .send({ name:"TestAPI Marin", jobTitle:"Test Engineer" })
      .expect(200)
      .then(() => {
        return request(ApiUrl)
        .get("/user")
        .query({ name:"TestAPI" })
        .expect(200)
      });
  });

  it("should return 400 because user name already exists", () => {
    return request(ApiUrl)
      .post("/user")
      .send({ name:"TestAPI", jobTitle:"Test Engineer" })
      .expect(400)
      .then(response => {
        expect(response.body).toEqual("The user name already exists");
      });
  }); 

});

describe("PUT /user/:5fbaded875a2c43b4cc1ad98", () => {
  it("Edita um usuário já existente", () => {
    return request(ApiUrl)
      .put("/user/:5fbaded875a2c43b4cc1ad98")
      .send({ name:"TestAPIEdited", jobTitle:"Test Engineer" })
      .expect(404)
      .then(() => {
        return request(ApiUrl)
        .get("/user")
        .query({ name:"TestAPIEdited" })
        .expect(200)
      });
  });
});

describe("Delete /user/:5fbaded875a2c43b4cc1ad98", () => {
  it("Deleta um usuário existente", () => {
    return request(ApiUrl)
      .del("/user/:5fbaded875a2c43b4cc1ad98")
      .expect(200)
      .then(() => {
        return request(ApiUrl)
        .del("/user/:5fbaded875a2c43b4cc1ad98")
        .expect(200)
      });
  });
});
