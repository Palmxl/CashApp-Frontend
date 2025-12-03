import { API_URL } from "../config";

export async function getCardBalance(cardId) {
  const res = await fetch(`${API_URL}/stats/balance/${cardId}`);
  if (!res.ok) throw new Error("Error fetching stats");
  return await res.json();
}
