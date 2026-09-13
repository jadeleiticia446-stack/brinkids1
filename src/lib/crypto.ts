import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // recommended for GCM
const AUTH_TAG_LENGTH = 16;

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key || key.length < 32) {
    // Fallback for development only – never use in production without a real key
    return crypto.scryptSync("dev-secret-key-change-me", "salt", 32);
  }
  return Buffer.from(key.slice(0, 32).padEnd(32, "0"));
}

/**
 * Encrypts text using AES-256-GCM.
 * Returns a string in the format: iv:authTag:ciphertext (all hex)
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Decrypts a string previously encrypted with encrypt().
 */
export function decrypt(encryptedText: string): string {
  try {
    const [ivHex, authTagHex, ciphertext] = encryptedText.split(":");
    if (!ivHex || !authTagHex || !ciphertext) {
      throw new Error("Invalid encrypted format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch {
    return "[erro ao descriptografar]";
  }
}

/**
 * Masks sensitive data for display (e.g. card number, CPF)
 */
export function maskCard(card: string): string {
  const clean = card.replace(/\D/g, "");
  if (clean.length < 4) return "****";
  return `**** **** **** ${clean.slice(-4)}`;
}

export function maskCpf(cpf: string): string {
  const clean = cpf.replace(/\D/g, "");
  if (clean.length < 5) return "***.***.***-**";
  return `***.***.***-${clean.slice(-2)}`;
}

export function maskCvv(): string {
  return "***";
}
