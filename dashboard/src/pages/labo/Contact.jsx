import { useState } from "react";
import axios from "axios";
import { Mail, Phone } from "lucide-react"; // Optional: icons ke liye

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/contact", form);
      setSuccess(res.data.message || "Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-4xl font-black text-slate-900 mb-2">Contact Us</h2>
        <p className="text-slate-500 mb-8 font-medium">We usually respond within 24 hours</p>

        {error && <div className="p-4 mb-6 bg-red-50 text-red-600 text-sm font-bold rounded-xl">{error}</div>}
        {success && <div className="p-4 mb-6 bg-emerald-50 text-emerald-600 text-sm font-bold rounded-xl">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />

          <input type="text" name="subject" placeholder="Subject (optional)" value={form.subject} onChange={handleChange} 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />

          <textarea name="message" placeholder="Your Message" rows="5" value={form.message} onChange={handleChange} 
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"></textarea>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 text-slate-600">
            <Mail className="text-blue-600" size={20} />
            <span className="font-semibold text-sm">careScynify@smartlab.com</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Phone className="text-blue-600" size={20} />
            <span className="font-semibold text-sm">+92 300 1234567</span>
          </div>
        </div>
      </div>
    </div>
  );
}