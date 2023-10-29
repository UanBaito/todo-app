import request from "supertest";

let hc = request.agent("http://localhost:3000");

test("login", async () => {
  let response = await hc.post("/api/login").send({"username": "onebyte", "password": "123"});
  if (response.error) {
    console.log(response.body);
  }
  expect(response.statusCode).toBe(200);
});

test("list_todos", async () => {
  let response = await hc.get("/api/todos").expect(200);
  if (response.error) {
    console.log(response.body);
  }
});

test("create_todo", async () => {
  let response = await hc.post("/api/todos").send({ "name": "elpepe" }).expect(
    200,
  );
  if (response.error) {
    console.log(response.body);
  }
});

test("delete_todo", async () => {
  let response = await hc.delete("/api/todos/12");
  if (response.error) {
    console.log(response.body);
  }
  expect(response.statusCode).toBe(200);
});

test("empty-credentials", async () => {
  let response = await hc.post("/api/login");
  if (response.error) {
    console.log(response.body);
  }
  expect(response.statusCode).toBe(403);
});

test("wrong-credentials", async () => {
  let response = await hc.post("/api/login").send({"username": "elpepe", "password": "123"});
  if (response.error) {
    console.log(response.body);
  }
  expect(response.statusCode).toBe(403);
});

