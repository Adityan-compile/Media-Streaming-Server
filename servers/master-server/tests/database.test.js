const {movie} = require("../models");
const db = require("../config/database/sequelize");

describe("Database Tests", () => {
  beforeAll(async () => {
    await db.get().sync();
  });

  test("Can Create Movie", async () => {
    expect.assertions(5);
    const newMovie = await movie.create({
      name: "test",
      tagline: "test",
      description: "test",
      lang: "en",
    });
    expect(newMovie.id.toString().length).toBe(20);
    expect(newMovie.name).toBe("test");
    expect(newMovie.tagline).toBe("test");
    expect(newMovie.description).toBe("test");
    expect(newMovie.lang).toBe("en");

  });

  test.todo("Can Create Show");
  test.todo("Can Create Server");
});
