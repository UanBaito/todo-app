import request from "supertest";

test("get home", async () => {
  let hc = request.agent("http://localhost:3000");
  await hc.get("/api/todos").expect(200);
  await hc.post("/api/todos").send({ "name": "elpepe" }).expect(200);
  await hc.delete("/api/todos/12").expect(200);
});
