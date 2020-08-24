import { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ key: process.env.MAPS_API_KEY });
};
