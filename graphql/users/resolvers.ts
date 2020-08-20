import { User, Credentials } from "./types";
import usersJson from "./users.json";
import jwt from "jsonwebtoken";

const users: User[] = usersJson;

const getUsers = () => {
  return users;
};

async function login(
  parent: null,
  args: { credentials: Credentials },
  context,
  info
): Promise<{ token: string }> {
  const { credentials } = args;
  const user = users.find((u) => u.email === credentials.email);

  if (!user) {
    throw new Error(`No user found with email: ${credentials.email}`);
  }

  if (user.password !== credentials.password) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      email: user.email,
      username: user.username,
    },
    process.env.APP_SECRET
  );

  return {
    token,
  };
}

export const queries = {
  users: getUsers,
};

export const mutations = {
  login,
};
