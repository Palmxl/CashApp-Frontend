import { useEffect, useState } from "react";
import { getCards, createCard } from "../services/cards";

function Cards() {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    name: "",
    credit_limit: "",
    annual_rate: "",
    cutoff_day: "",
    payment_day: "",
  });

  const loadCards = async () => {
    const data = await getCards();
    setCards(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCard({
      ...form,
      credit_limit: Number(form.credit_limit),
      annual_rate: Number(form.annual_rate),
      cutoff_day: Number(form.cutoff_day),
      payment_day: Number(form.payment_day),
    });
    await loadCards();
    setForm({
      name: "",
      credit_limit: "",
      annual_rate: "",
      cutoff_day: "",
      payment_day: "",
    });
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="p-8 text-slate-100 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mis Tarjetas 💳</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-5 rounded-xl mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">Agregar tarjeta</h2>

        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 rounded bg-slate-700"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Cupo"
          className="w-full p-2 rounded bg-slate-700"
          value={form.credit_limit}
          onChange={(e) => setForm({ ...form, credit_limit: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Tasa anual (%)"
          className="w-full p-2 rounded bg-slate-700"
          value={form.annual_rate}
          onChange={(e) => setForm({ ...form, annual_rate: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Día de corte"
          className="w-full p-2 rounded bg-slate-700"
          value={form.cutoff_day}
          onChange={(e) => setForm({ ...form, cutoff_day: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Día de pago"
          className="w-full p-2 rounded bg-slate-700"
          value={form.payment_day}
          onChange={(e) => setForm({ ...form, payment_day: e.target.value })}
          required
        />

        <button className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded font-medium">
          Guardar
        </button>
      </form>

      {/* Lista */}
      <h2 className="text-xl font-semibold mb-3">Tarjetas registradas:</h2>

      {cards.length === 0 ? (
        <p className="text-slate-400">No tienes tarjetas aún 👀</p>
      ) : (
        <div className="space-y-3">
          {cards.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700"
            >
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p className="text-slate-300">Cupo: ${c.credit_limit}</p>
              <p className="text-slate-300">Tasa anual: {c.annual_rate}%</p>
              <p className="text-slate-300">Corte: día {c.cutoff_day}</p>
              <p className="text-slate-300">Pago: día {c.payment_day}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cards;
