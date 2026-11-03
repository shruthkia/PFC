import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { RECOVERY_ALPHABET, formatRecoveryCode } from "@/lib/auth/validation";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;

export type SecretDigest = { hash: string; salt: string };

export async function hashSecret(secret: string): Promise<SecretDigest> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(secret, salt, KEY_LENGTH);
  return { hash: derived.toString("hex"), salt };
}

export async function verifySecret(secret: string, digest: SecretDigest): Promise<boolean> {
  try {
    const derived = await scrypt(secret, digest.salt, KEY_LENGTH);
    const expected = Buffer.from(digest.hash, "hex");
    return expected.length === derived.length && timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}

/** 16 characters from an unambiguous alphabet, formatted as XXXX-XXXX-XXXX-XXXX. */
export function generateRecoveryCode(): string {
  const bytes = randomBytes(16);
  let code = "";
  for (let index = 0; index < 16; index += 1) {
    code += RECOVERY_ALPHABET[bytes[index] % RECOVERY_ALPHABET.length];
  }
  return formatRecoveryCode(code);
}

/** Burn roughly the same time as a real hash so unknown emails are not faster. */
export async function burnPasswordTime(password: string): Promise<void> {
  await scrypt(password, "pfc-timing-equalizer", KEY_LENGTH);
}
