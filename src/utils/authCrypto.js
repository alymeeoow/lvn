
const enc = new TextEncoder();

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function pbkdf2Hash(password, saltBytes, iterations = 120000) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  return new Uint8Array(bits);
}

async function createPasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16)); // 128-bit salt
  const hash = await pbkdf2Hash(password, salt);

  return {
    salt: bytesToBase64(salt),
    hash: bytesToBase64(hash),
    algo: "PBKDF2-SHA256",
    iterations: 120000,
  };
}

async function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const saltBytes = base64ToBytes(record.salt);
  const hashBytes = await pbkdf2Hash(password, saltBytes, record.iterations || 120000);
  return bytesToBase64(hashBytes) === record.hash;
}
