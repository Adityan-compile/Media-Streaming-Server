const {movies, shows, server} = require("../models");
const migrate = require("../config/database/migrate");

describe("Database Tests", () => {
  beforeAll(async () => {
    await migrate();
  });

  test("Can Create Movie", async () => {
    expect.assertions(6);
    const newMovie = await movies.create({
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
    expect(newMovie.adult).toBe(false);
  });

  test("Can Create Show", async () => {
    expect.assertions(5);
    const newServer = await server.create({
      name: "test",
      description: "test",
      lang: "en",
    });
    expect(newShow.id.toString().length).toBe(20);
    expect(newShow.name).toBe("test");
    expect(newShow.description).toBe("test");
    expect(newShow.lang).toBe("en");
    expect(newShow.adult).toBe(false);

  });

  test("Can Create Server", async ()=>{
    expect.assertions(5);
    const newShow = await shows.create({
      name: "test",
      tmdbKey: "test key",
      videoQuality: "1920x?",
      audioQuality: "256k"
    });
    expect(newShow.id.toString().length).toBe(20);
    expect(newShow.name).toBe("test");
    expect(newShow.tmdbKey).toBe("test key");
    expect(newShow.videoQuality).toBe("1920x?");
    expect(newShow.audioQuality).toBe("256k");
    expect(newShow.transcoder).toBe(true);
  });
});
