import { useEffect, useState } from "react";
import { getCards } from "../services/cards";
import { getTransactions, createTransaction } from "../services/transactions";

function Transactions() {
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    type: "purchase",
    amount: "",
    description: "",
    card_id: "",
  });

  const loadData = async () => {
    const c = await getCards();
    const t = await getTransactions();
    setCards(c);
    setTransactions(t);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTransaction({
      ...form,
      amount: Number(form.amount),
      card_id: Number(form.card_id),
    });

    await loadData();

    setForm({
      type: "purchase",
      amount: "",
      description: "",
      card_id: "",
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const typeLabels = {
    purchase: "Compra 💸",
    payment: "Pago 💳",
    installment: "Cuota 📅",
  };

  return (
    <div className="max-w-3xl mx-auto text-slate-100">
      <h1 className="text-3xl font-bold mb-8">Transacciones 🧾</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-xl mb-10 space-y-4"
      >
        <h2 className="text-xl font-semibold">Nueva transacción</h2>

        {/* Tipo */}
        <select
          className="w-full p-2 rounded bg-slate-700"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="purchase">Compra 💸</option>
          <option value="payment">Pago 💳</option>
          <option value="installment">Cuota 📅</option>
        </select>

        {/* Monto */}
        <input
          type="number"
          placeholder="Monto"
          className="w-full p-2 rounded bg-slate-700"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        {/* Descripción */}
        <input
          type="text"
          placeholder="Descripción (opcional)"
          className="w-full p-2 rounded bg-slate-700"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Tarjeta */}
        <select
          className="w-full p-2 rounded bg-slate-700"
          value={form.card_id}
          onChange={(e) => setForm({ ...form, card_id: e.target.value })}
          required
        >
          <option value="">Selecciona una tarjeta</option>
          {cards.map((card) => (
            <option key={card.id} value={card.id}>
              {card.name} — cupo ${card.credit_limit}
            </option>
          ))}
        </select>

        {/* Botón */}
        <button className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded font-medium">
          Guardar transacción
        </button>
      </form>

      {/* Lista */}
      <h2 className="text-xl font-semibold mb-4">Historial</h2>

      {transactions.length === 0 ? (
        <p className="text-slate-400">No hay transacciones aún 👀</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700"
            >
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{typeLabels[tx.type]}</span>
                <span>${tx.amount}</span>
              </div>

              <p className="text-slate-300">
                {tx.description ? tx.description : "Sin descripción"}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Tarjeta ID: {tx.card_id}
              </p>

              <p className="text-slate-500 text-xs">
                {new Date(tx.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;
