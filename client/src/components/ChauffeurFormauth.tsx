import api from "@/api/axios";
import { useState } from "react";

export type LoginChauffeur = {
  email: string;
  password: string;
};

const ChauffeurFormauth = () => {
  const [form, setForm] = useState<LoginChauffeur>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/chauffeurs", form);

      if (res.data?.exists) {
        setMessage("Chauffeur exists ✅");
      } else {
        setMessage("Not found ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <button type="submit">Login</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default ChauffeurFormauth;
