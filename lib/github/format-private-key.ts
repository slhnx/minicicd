import { createPrivateKey } from "node:crypto"

function wrapPem(base64: string, label: "RSA PRIVATE KEY" | "PRIVATE KEY") {
  const body = base64.match(/.{1,64}/g)?.join("\n") ?? base64

  return `-----BEGIN ${label}-----\n${body}\n-----END ${label}-----`
}

function stripPem(key: string) {
  return key
    .replace(/-----BEGIN [^-]+-----/g, "")
    .replace(/-----END [^-]+-----/g, "")
    .replace(/\s/g, "")
}

/** Normalize GitHub App private keys from .env / Vercel (escaped newlines, missing PEM headers). */
export function formatGithubAppPrivateKey(privateKey: string): string {
  let key = privateKey.trim()

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim()
  }

  key = key.replace(/\\n/g, "\n")

  if (!key.includes("-----BEGIN")) {
    const base64 = stripPem(key)
    key = wrapPem(base64, "RSA PRIVATE KEY")
  }

  try {
    createPrivateKey({ key, format: "pem" })
    return key
  } catch {
    const base64 = stripPem(key)
    const pkcs8Key = wrapPem(base64, "PRIVATE KEY")

    createPrivateKey({ key: pkcs8Key, format: "pem" })
    return pkcs8Key
  }
}
