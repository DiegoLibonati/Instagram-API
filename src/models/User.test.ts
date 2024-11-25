import { User } from "./User";

const USER = {
  id: "1234",
  username: "Jose",
  account_type: "public",
  media_count: 0,
};

describe("User Class", () => {
  const user: User = new User(
    USER.id,
    USER.username,
    USER.account_type,
    USER.media_count
  );

  test("It must have the correct initial state when initializing an instance of user.", () => {
    expect(user.id).toBe(USER.id);
    expect(user.username).toBe(USER.username);
    expect(user.account_type).toBe(USER.account_type);
    expect(user.media_count).toBe(USER.media_count);
  });

  test("It must return an object with the user's attributes.", () => {
    const object = user.createUser();

    expect(object).toEqual({
      id: user.id,
      username: user.username,
      account_type: user.account_type,
      media_count: user.media_count,
    });
  });

  test("It must return an object with the user's attributes but in string form.", () => {
    const objectString = user.userStringify();

    expect(typeof objectString).toBe("string");
    expect(objectString).toEqual(
      JSON.stringify({
        id: user.id,
        username: user.username,
        account_type: user.account_type,
        media_count: user.media_count,
      })
    );
  });

  test("It must return instance information.", () => {
    const instanceInformation = user.toString();

    expect(instanceInformation).toBe(
      `User(id: ${user.id}, username: ${user.username}, account_type: ${user.account_type}, media_count: ${user.media_count})`
    );
  });
});
