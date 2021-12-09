const User = require("../models/user");
const db = require("../config/database/sequelize");

beforeAll(async () => {
  await db.get().sync();
});

test("Create User", async () => {
  expect.assertions(3);
  const user = await User.create({
    name: "test",
    password: "test",
  });
  expect(user.id.toString().length).toBe(20);
  expect(user.name).toBe("test");
  expect(user.password).toBe("test");
});
