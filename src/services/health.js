import { API_URL } from "../config";

export async function getHealth() {
  const res = await fetch(`${API_URL}/health`);

  if (!res.ok) {
    throw new Error(`Backend error: ${res.status}`);
  }

  return await res.json();
}
