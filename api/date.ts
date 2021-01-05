import { NowRequest, NowResponse } from "@vercel/node";

export default function(req: NowRequest, res: NowResponse) {
  const { name = "лолкек" } = req.query;
  res.send(`Привет ${name}!`);
}
