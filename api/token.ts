import { NowRequest, NowResponse } from "@vercel/node";

const authmeRoute = (req: NowRequest, res: NowResponse) => {
  const { code } = req.query;
  res.send(code);
  //   res.redirect(
  //     301,
  //     `${vkAuth.url}access_token?client_id=${vkAuth.client_id}&client_secret=${process.env.VK_SECRET}&redirect_uri=${vkAuth.redirect_uri}&code=${code}`
  //   );
};

export default authmeRoute;
