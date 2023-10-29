import request from "supertest";

let hc = request.agent("http://localhost:3000");

test("login", async () => {
  let response = await hc.post("/api/login").send({"username": "onebyte", "password": "123"});
  expect(response.statusCode).toBe(200);
});

test("list_todos", async () => {
  let response = await hc.get("/api/todos").expect(200);
  if (response.error) {
    console.log(response.body);
  }
});

test("create_and_delete_todo", async () => {
  let createResponse = await hc.post("/api/todos").send({ "name": "elpepe" }).expect(
    201,
  );
  await hc.delete(`/api/todos/${createResponse.body.id}`).expect(200)
});

test("empty-credentials", async () => {
  let response = await hc.post("/api/login");
  expect(response.statusCode).toBe(401);
});

test("wrong-credentials", async () => {
  let response = await hc.post("/api/login").send({"username": "elpepe", "password": "123"});
  expect(response.statusCode).toBe(401);
});

