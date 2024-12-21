import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secret_key = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secret_key);

export default async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Error decrypting session", error);
    return null;
  }
}

export async function createSession(userId) {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expireAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    htpOnly: true,
    secure: true,
    expires: expireAt,
    sameSite: "lax",
    path: "/",
  });
}
