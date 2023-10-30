import request from "supertest";

let hc = request.agent("http://localhost:3000");

test("login", async () => {
  let response = await hc.post("/api/auth/login").send({
    "name": "onebyte",
    "pwd": "123",
  });
  expect(response.statusCode).toBe(200);
});

test("list_todos", async () => {
  await hc.get("/api/todos").expect(200);
});

test("create_and_delete_todo", async () => {
  let createResponse = await hc.post("/api/todos").send({ "name": "elpepe" })
    .expect(
      201,
    );
  await hc.delete(`/api/todos/${createResponse.body.id}`).expect(200);
});

test("empty-credentials", async () => {
  let response = await hc.post("/api/auth/login");
  expect(response.statusCode).toBe(401);
});

test("wrong-credentials", async () => {
  let response = await hc.post("/api/auth/login").send({
    "name": "elpepe",
    "pwd": "123",
  });
  expect(response.statusCode).toBe(401);
});

test("logout", async () => {
  let response = await hc.post("/api/auth/logout");
  expect(response.statusCode).toBe(200);
  expect(response.header["set-cookie"][0]).toMatch(/Max-Age=0/);
});

test("register", async () => {
  let registerResponse = await hc.post("/api/auth/register").send({
    "name": "12345",
    "pwd": "one",
  });
  expect(registerResponse.statusCode).toBe(201);
  let loginResponse = await hc.post("/api/auth/login").send({"name": "12345", "pwd": "one"})
  expect(loginResponse.statusCode).toBe(200)
  let id = registerResponse.body[0].id
  let deleteResponse = await hc.delete(`/api/users/${id}`)
  expect(deleteResponse.statusCode).toBe(200)
});


test("register", async () => {
  let registerResponse = await hc.post("/api/auth/register").send({
    "name": "12345",
    "pwd": "one",
  });
  expect(registerResponse.statusCode).toBe(201);
  let loginResponse = await hc.post("/api/auth/login").send({"name": "12345", "pwd": "one"})
  expect(loginResponse.statusCode).toBe(200)
  let id = registerResponse.body[0].id
  let deleteResponse = await hc.delete(`/api/users/${id}`)
  expect(deleteResponse.statusCode).toBe(200)
});

test("cross_user_delete", async () => {
  let register1Response = await hc.post("/api/auth/register").send({"name": "user1","pwd": "123"})
  let register2Response = await hc.post("/api/auth/register").send({"name": "user2","pwd": "123"})
  expect(register1Response.statusCode).toBe(201)
  expect(register2Response.statusCode).toBe(201)
  let user1Login = await hc.post("/api/auth/login").send({"name": "user1", "pwd": "123"})
  expect(user1Login.statusCode).toBe(200)
  let deleteUser2 = await hc.delete(`/api/users/${register2Response.body[0].id}`)
  expect(deleteUser2.statusCode).toBe(403)
  let deleteUser1 = await hc.delete(`/api/users/${register1Response.body[0].id}`)
  expect(deleteUser1.statusCode).toBe(200)
  let user2Login = await hc.post("/api/auth/login").send({"name": "user2", "pwd": "123"})
  expect(user2Login.statusCode).toBe(200)
  let deleteUser22= await hc.delete(`/api/users/${register2Response.body[0].id}`)
  expect(deleteUser22.statusCode).toBe(200)
})
