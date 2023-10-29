import request from "supertest";

let hc = request.agent("http://localhost:3000");

test("login", async () => {
  let response = await hc.post("/api/auth/login").send({"name": "onebyte", "pwd": "123"});
  expect(response.statusCode).toBe(200);
});

test("list_todos", async () => {
  await hc.get("/api/todos").expect(200);
});

test("create_and_delete_todo", async () => {
  let createResponse = await hc.post("/api/todos").send({ "name": "elpepe" }).expect(
    201,
  );
  await hc.delete(`/api/todos/${createResponse.body.id}`).expect(200)
});

test("empty-credentials", async () => {
  let response = await hc.post("/api/auth/login");
  expect(response.statusCode).toBe(401);
});

test("wrong-credentials", async () => {
  let response = await hc.post("/api/auth/login").send({"name": "elpepe", "pwd": "123"});
  expect(response.statusCode).toBe(401);
});

test("logout", async () => {
  let response = await hc.post("/api/auth/logout")
  expect(response.statusCode).toBe(200)
  expect(response.header["set-cookie"][0]).toMatch(/Max-Age=0/)
});


test("register", async () => {
  let response = await hc.post("/api/auth/register").send({"name": "byte", "pwd": "one"})
  expect(response.statusCode).toBe(200)
});
