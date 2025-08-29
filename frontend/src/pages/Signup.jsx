import { useState, useContext } from "react";
import { signup } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { login: saveUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup(form);
      console.log(data);
      saveUser(data);
    } catch (err) {
      alert(err.response.data.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input type="text" placeholder="Name"
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Signup</button>
    </form>
  );
}
