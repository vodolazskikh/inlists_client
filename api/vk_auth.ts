import { NowRequest, NowResponse } from "@vercel/node";
import { vkAuth } from "./config/vkAuth";

const vkAuthRoute = (req: NowRequest, res: NowResponse) => {
  // const { name = "лолкек" } = req.query;
  res.redirect(
    301,
    `${vkAuth.url}?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`
  );
};

export default allowCors(vkAuthRoute);
