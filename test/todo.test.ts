import request from "supertest";
import app from "../src/app";
import { TodoInstance } from "../src/model";

describe("test create route", () => {
  const todo = {
    title: "test",
  };

  test("Should have key record and msg when created", async () => {
    const mockCreateTodo = jest.fn(() => todo);

    jest.spyOn(TodoInstance, "create").mockImplementation(mockCreateTodo);

    const res = await request(app).post("/api/v1/create").send(todo);
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("msg");
    expect(res.body).toHaveProperty("record");
  });

  test("Should handle exception", async () => {
    const mockCreateTodo = jest.fn(() => {
      throw "error";
    });

    jest.spyOn(TodoInstance, "create").mockImplementation(mockCreateTodo);

    const res = await request(app).post("/api/v1/create").send(todo);
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: "Error in creating record",
      status: 500,
      route: "/create",
    });
  });

  test("Should handle request param", async () => {
    const res = await request(app).post("/api/v1/create").send({});

    expect(res.body).toEqual({
      errors: [
        {
          msg: "Title is required",
          param: "title",
          location: "body",
        },
      ],
    });
  });
});

describe("test read pagination route", () => {
  const todo = {
    title: "Create todo",
  };

  test("Should return array of todo", async () => {
    const mockReadAllTodo = jest.fn((): any => [todo]);
    jest.spyOn(TodoInstance, "findAll").mockImplementation(mockReadAllTodo);

    const res = await request(app).get("/api/v1/read?limit=5");

    expect(mockReadAllTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual([todo]);
  });

  test("Should handle exception", async () => {
    const mockReadTodo = jest.fn((): any => {
      throw "error";
    });
    jest.spyOn(TodoInstance, "findAll").mockImplementation(mockReadTodo);

    const res = await request(app).get("/api/v1/read?limit=5");

    expect(mockReadTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: "Error in fetching records",
      status: 500,
      route: "/read",
    });
  });

  test("Should handle request param", async () => {
    const res = await request(app).get("/api/v1/read");

    expect(res.body).toEqual({
      errors: [
        {
          msg: "limit is required",
          param: "limit",
          location: "query",
        },
        {
          msg: "limit must be a number between 1 and 10",
          param: "limit",
          location: "query",
        },
      ],
    });
  });
});
