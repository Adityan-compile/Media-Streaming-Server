const {movie} = require("../models");
const migrate = require("../config/database/migrate");

describe("Database Tests", () => {
  beforeAll(async () => {
    await migrate();
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
