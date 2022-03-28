const request = require("supertest");
const express = require("express");
const router = require("../routes/main.js");

const mediaRouter = require("../routes/media");
const indexRouter = require("../routes/index");

const { loadServerSettings } = require("./utils/settings");
const migrate = require("../config/database/migrate");
const db = require("./config/database/sequelize");
const cache = require("./config/cache");

const app = express();

app.use("/api", indexRouter);
app.use("/api/media", mediaRouter);

beforeAll(() => {
  migrate((e) => {
    if (e) {
      console.error(e);
      throw new Error("Migration Failed" + "\n" + e);
    }
    console.log("Migration Successful");

    loadServerSettings()
      .then(() => {
        return console.info("Server Settings Loaded");
      })
      .catch((e) => {
        throw new Error("Error Loading Server Config" + "\n" + e);
      });
  });
});

describe("api tests", () => {
  describe("/api routes", () => {
    test.todo("responds to /server/settings/save");
    test.todo("responds to /server/settings");
  });

  describe("/api/media routes", () => {
    test.todo("responds to /tmdb/movies/search");
    test.todo("responds to /tmdb/shows/search");
    test.todo("responds to /movies/new");
    test.todo("responds to /shows/new");
    test.todo("responds to /movies/all");
    test.todo("responds to /shows/all");
    test.todo("responds to /movies/upload");
    test.todo("responds to /movies/delete");
    test.todo("responds to /movies/stream");
    test.todo("responds to /movies/search");
    test.todo("responds to /highlights");
    test.todo("responds to /highlights/new");
    test.todo("responds to /highlights/delete");
    test.todo("responds to /toprated");
  });
});
