import { API_URL } from "../config";

export async function getTransactions() {
  const res = await fetch(`${API_URL}/transactions/`);
  if (!res.ok) throw new Error("Error fetching transactions");
  return await res.json();
}

export async function createTransaction(tx) {
  const res = await fetch(`${API_URL}/transactions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  });

  if (!res.ok) throw new Error("Error creating transaction");
  return await res.json();
}
