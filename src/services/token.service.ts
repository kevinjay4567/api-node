import { decode, sign, verify } from "hono/jwt";
import { JWTPayload, JwtTokenInvalid } from "hono/utils/jwt/types";
import "dotenv/config";

const SECRET_KEY = process.env.JWT_SECRET ?? "default_secret_key";

export const validateToken = async (token: string | undefined) => {
  if (!token) throw new JwtTokenInvalid("Token vacio");

  return await verify(token, SECRET_KEY);
};

export const decodeTokenPayload = (token: string | undefined): JWTPayload => {
  if (!token) {
    throw new JwtTokenInvalid("Token vacio");
  }

  return decode(token).payload;
};

export const signUser = async (payload: any) => await sign(payload, SECRET_KEY);
