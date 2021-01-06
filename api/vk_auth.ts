import { NowRequest, NowResponse } from "@vercel/node";
import { vkAuth } from "./config/vkAuth";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req: NowRequest, res: NowResponse) => {
  res.redirect(
    `${vkAuth.url}authorize?client_id=${vkAuth.client_id}&redirect_uri=${vkAuth.redirect_uri}`
  );
};

module.exports = allowCors(handler);
