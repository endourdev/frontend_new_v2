'use client'

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:80/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include", // pour que les cookies côté backend soient pris en compte
      });

      if (res.ok) {
        const data = await res.json();
        // data = { username, userId, email, role }

        // Stocker dans les cookies côté frontend
        Cookies.set("username", data.username, { expires: 30 });
        Cookies.set("userId", data.userId, { expires: 30 });
        Cookies.set("email", data.email, { expires: 30 });

        setMessage("Connexion réussie !");
        // Rediriger vers upload ou page principale
        router.push("/upload");
      } else {
        const err = await res.json();
        setMessage("An error has occured" + err.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleLogin}
        className=""
      >
        <h1 className="">Connexion</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=""
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
          required
        />

        <button
          type="submit"
          disabled={loading}
          className=""
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && (
          <p className="text-center">{message}</p>
        )}
      </form>
    </div>
  );
}