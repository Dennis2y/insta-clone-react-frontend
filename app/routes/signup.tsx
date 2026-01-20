import { Link } from "react-router";

export default function Signup() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <p className="mt-2 text-white/60 text-sm">Placeholder page (auth later).</p>

        <div className="mt-6 space-y-3">
          <input className="w-full rounded-xl bg-black/40 border border-white/10 p-3" placeholder="Name" />
          <input className="w-full rounded-xl bg-black/40 border border-white/10 p-3" placeholder="Email" />
          <input className="w-full rounded-xl bg-black/40 border border-white/10 p-3" placeholder="Password" type="password" />
          <button className="w-full rounded-xl bg-white text-black py-3 font-medium">Create account</button>
        </div>

        <div className="mt-6 text-sm text-white/60">
          Already have an account? <Link to="/login" className="text-white underline">Log in</Link>
        </div>

        <div className="mt-3 text-sm">
          <Link to="/" className="text-white/60 underline">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
