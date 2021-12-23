const Movie = require("../models/movie");
const db = require("../config/database/sequelize");

describe("Database Tests", () => {
  beforeAll(async () => {
    await db.get().sync();
  });

  test("Can Create Movie", async () => {
    expect.assertions(5);
    const movie = await Movie.create({
      name: "test",
      tagline: "test",
      description: "test",
      lang: "en",
    });
    expect(movie.id.toString().length).toBe(20);
    expect(movie.name).toBe("test");
    expect(movie.tagline).toBe("test");
    expect(movie.description).toBe("test");
    expect(movie.lang).toBe("en");

  });

  test.todo("Can Create Show");
  test.todo("Can Create Server");
});
