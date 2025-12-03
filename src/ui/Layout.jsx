import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { label: "Inicio", to: "/" },
    { label: "Tarjetas", to: "/cards" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">

      {/* Navbar */}
      <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">CashApp ⚡</h1>

        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-slate-300 hover:text-white transition ${
                location.pathname === item.to ? "font-semibold text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Contenido */}
      <main className="p-8">{children}</main>
    </div>
  );
}

export default Layout;
