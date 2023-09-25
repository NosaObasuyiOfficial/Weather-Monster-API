import request from "supertest";
import express from "express";
import citiesRoute from "../routes/cities.route";
import Cities from "../model/cities.model";
import { db } from "../database_connect/db_connect";
const app = express();

app.use(express.json());

app.use("/cities", citiesRoute);

async function seedDataBase() {
  return await Cities.create({
    id: 1,
    name: "kairo",
    latitude: 23.8773,
    longitude: 12.3242,
  });
}
async function clearDataBase() {
  return await db.sync({ force: true });
}

describe("POST/ Creating a city", () => {
  beforeAll(() => {
    return clearDataBase();
  });

  afterAll(() => {
    return clearDataBase();
  });

  test("should specify charset=utf-8 in the content type header", async () => {
    const response = await request(app).post("/cities").send({
      name: "UK",
      latitude: 23.8773,
      longitude: 12.3242,
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("charset=utf-8")
    );
  });

  test("should response with a 200 StatusCode", async () => {
    const response = await request(app).post("/cities/").send({
      name: "Abuja",
      latitude: 23.8773,
      longitude: 12.3242,
    });
    expect(response.statusCode).toBe(200);
  });

  test("POST /cities/ - success - create a city", async () => {
    const response = await request(app).post("/cities/").send({
      name: " Lagos",
      latitude: 23.8773,
      longitude: 12.3242,
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: {
          id: expect.any(Number),
          name: expect.any(String),
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      })
    );
  });
});

describe("PATCH/ Updating a city", () => {
  beforeAll(() => {
    return clearDataBase();
  });

  beforeAll(() => {
    return seedDataBase();
  });

  afterAll(() => {
    return clearDataBase();
  });

  test("PATCH /cities/ - success - create a city", async () => {
    const response = await request(app).patch("/cities/1").send({
      name: "Lawmbss",
      latitude: 23.8773,
      longitude: 12.3242,
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: {
          name: expect.any(String),
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      })
    );
  });

  test("PATCH/ should response with a 200 status code", async () => {
    const response = await request(app).patch("/cities/1").send({
      name: "Lambss",
      latitude: 23.8773,
      longitude: 12.3242,
    });
    expect(response.statusCode).toBe(200);
  });

  test("PATCH/ should response with a 404 status code", async () => {
    const response = await request(app).patch("/cities/2").send({
      name: "Lambss",
      latitude: 23.8773,
      longitude: 12.3242,
    });
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE/ Deleting a city", () => {
  beforeAll(() => {
    return clearDataBase();
  });

  beforeAll(() => {
    return seedDataBase();
  });

  afterAll(() => {
    return clearDataBase();
  });

  test("DELETE /cities/ - success - delete a city", async () => {
    const response = await request(app).delete("/cities/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: {
          id: expect.any(Number),
          name: expect.any(String),
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      })
    );
  });

  test("DELETE/ should response with a 404 status code", async () => {
    const response = await request(app).delete("/cities/2");
    expect(response.statusCode).toBe(404);
  });
});
