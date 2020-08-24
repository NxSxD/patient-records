import jwt from "jsonwebtoken";

export function getUser(token: string) {
  let user;

  try {
    user = jwt.verify(token, process.env.APP_SECRET);
  } catch (err) {
    // err
    console.log(err);
    return err;
  }

  return user;
}
