import request from "supertest";
import express from "express";
import forecastsRoute from "../test_routes/forecasts.route";
import Cities from "../test_model/cities.model";
import Temperatures from "../test_model/temperatures.model";
import { test_db } from "../database_connect/test_dbconnect";

const app = express();

app.use(express.json());
app.use("/forecasts", forecastsRoute);

async function seedDataBase() {
  return await Cities.create({
    id: 1,
    name: "kairo",
    latitude: 23.8773,
    longitude: 12.3242,
  });
}

async function seedDataBase2() {
  return await Temperatures.create({
    id: 1,
    city_id: 1,
    max: 4.68,
    min: 2.56,
    timestamp: new Date().getTime(),
  });
}

async function clearDataBase() {
  return await test_db.sync({ force: true });
}

describe("GET/ Forecasts for a City", () => {
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

  test("should response with a 200 StatusCode", async () => {
    const response = await request(app).get("/forecasts/1");
    expect(response.statusCode).toBe(200);
  });

  test("GET /forecasts/ - success - forecast for a city", async () => {
    const response = await request(app).get("/forecasts/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        data: {
          city_id: expect.any(Number),
          max: expect.any(Number),
          min: expect.any(Number),
          sample: expect.any(Number),
        },
      })
    );
  });
});
