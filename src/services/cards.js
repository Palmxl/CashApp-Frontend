import { API_URL } from "../config";

export async function getCards() {
  const res = await fetch(`${API_URL}/cards/`);
  if (!res.ok) throw new Error("Error fetching cards");
  return await res.json();
}

export async function createCard(card) {
  const res = await fetch(`${API_URL}/cards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });

  if (!res.ok) throw new Error("Error creating card");
  return await res.json();
}
