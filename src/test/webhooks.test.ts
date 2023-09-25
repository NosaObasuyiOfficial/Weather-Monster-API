import request from "supertest";
import express from "express";
import webhooksRoute from "../routes/webhooks.route";
import { db } from "../database_connect/db_connect";
import Cities from "../model/cities.model";
import Webhooks from "../model/webhooks.model";

const app = express();

app.use(express.json());

app.use("/webhooks", webhooksRoute);

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

async function seedDataBase2() {
  return await Webhooks.create({
    id: 1,
    city_id: 1,
    callback_url: "https://my-service.com/low-temperature",
  });
}

describe("POST/ Creating a webhook", () => {
  beforeEach(() => {
    return clearDataBase();
  });

  beforeEach(() => {
    return seedDataBase();
  });

  afterEach(() => {
    return clearDataBase();
  });

  test("should specify charset=utf-8 in the content type header", async () => {
    const response = await request(app).post("/webhooks").send({
      city_id: 1,
      callback_url: "https://my-service.com/low-temperature",
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("charset=utf-8")
    );
  });

  test("should response with a 200 StatusCode", async () => {
    const response = await request(app).post("/webhooks/").send({
      city_id: 1,
      callback_url: "https://my-service.com/low-temperature",
    });
    expect(response.statusCode).toBe(200);
  });

  test("should response with a 404 StatusCode", async () => {
    const response = await request(app).post("/webhooks/").send({
      city_id: 2,
      callback_url: "https://my-service.com/low-temperature",
    });
    expect(response.statusCode).toBe(404);
  });

  test("should response with a 200 StatusCode", async () => {
    const response = await request(app).post("/webhooks/").send({
      city_id: 1,
      callback_url: "https://my-service.com/low-temperature",
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: {
          id: expect.any(Number),
          city_id: expect.any(Number),
          callback_url: expect.any(String),
        },
      })
    );
  });
});

describe("DELETE/ Deleting a webhook", () => {
  beforeEach(() => {
    return clearDataBase();
  });

  beforeEach(() => {
    return seedDataBase();
  });

  beforeEach(() => {
    return seedDataBase2();
  });

  afterEach(() => {
    return clearDataBase();
  });

  test("DELETE /webhooks/ - success - delete a webhook", async () => {
    const response = await request(app).delete("/webhooks/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: {
          id: expect.any(Number),
          city_id: expect.any(Number),
          callback_url: expect.any(String),
        },
      })
    );
  });

  test("DELETE/ should response with a 200 status code", async () => {
    const response = await request(app).delete("/webhooks/1");
    expect(response.statusCode).toBe(200);
  });

  test("DELETE/ should response with a 404 status code", async () => {
    const response = await request(app).delete("/webhooks/2");
    expect(response.statusCode).toBe(404);
  });
});
