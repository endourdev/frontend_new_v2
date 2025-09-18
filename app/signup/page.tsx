'use client'

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:80/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include", // pour que les cookies côté backend passent
      });

      if (res.ok) {
        const data = await res.json();

        // Stockage côté frontend
        Cookies.set("username", data.username, { expires: 30 });
        Cookies.set("userId", data.userId, { expires: 30 });
        Cookies.set("email", data.email, { expires: 30 });

        setMessage("Inscription réussie !");
        router.push("/login"); // redirection vers login
      } else {
        const err = await res.json();
        setMessage("An error has occured" + err.message || err.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">📝 Inscription</h1>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}