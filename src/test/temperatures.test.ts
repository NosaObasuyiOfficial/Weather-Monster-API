import request from "supertest";
import express from "express";
import temperaturesRoute from "../test_routes/temperatures.route";
import Cities from "../test_model/cities.model";
import { test_db } from "../database_connect/test_dbconnect";

const app = express();

app.use(express.json());
app.use("/temperatures", temperaturesRoute);

async function seedDataBase() {
  return await Cities.create({
    id: 1,
    name: "kairo",
    latitude: 23.8773,
    longitude: 12.3242,
  });
}

async function clearDataBase() {
  return await test_db.sync({ force: true });
}

describe("POST/ Create a Temperature", () => {
  beforeEach(() => {
    return clearDataBase();
  });

  beforeEach(() => {
    return seedDataBase();
  });

  afterEach(() => {
    return clearDataBase();
  });

  test("should response with a 200 StatusCode", async () => {
    const response = await request(app).post("/temperatures/").send({
      city_id: 1,
      max: 8.899,
      min: 6.6756,
    });
    expect(response.statusCode).toBe(200);
  });

  test("should response with a 404 StatusCode", async () => {
    const response = await request(app).post("/temperatures/").send({
      city_id: 2,
      max: 8.899,
      min: 6.6756,
    });
    expect(response.statusCode).toBe(404);
  });

  test("Testing Wrong Temperatures Inputs; max < min & min > max", async () => {
    const response = await request(app).post("/temperatures/").send({
      city_id: 1,
      max: 4.899,
      min: 5.6756,
    });
    expect(response.statusCode).toBe(400);
  });

  test("POST /temperatures/ - success - create max and min temperature", async () => {
    const response = await request(app).post("/temperatures/").send({
      city_id: 1,
      max: 8.899,
      min: 6.6756,
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: {
          id: expect.any(Number),
          city_id: expect.any(Number),
          max: expect.any(Number),
          min: expect.any(Number),
          timestamp: expect.any(Number),
        },
      })
    );
  });
});
