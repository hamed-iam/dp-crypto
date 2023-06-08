import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  req.headers = {
    ...req.headers,
    "content-type": "application/json charset=utf-8",
    "X-CMC_PRO_API_KEY": process.env.API_KEY,
  };

  req.url = req.url && req.url.replace(/^\/api/, "");

  return new Promise((resolve, reject) => {
    proxy.web(
      req,
      res,
      { target: process.env.API_PROXY, changeOrigin: true },
      (err: any) => {
        if (err) {
          return reject(err);
        }
        resolve({});
      }
    );
  });
}
