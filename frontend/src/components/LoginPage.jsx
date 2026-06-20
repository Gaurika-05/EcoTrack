import { useState } from 'react';

const API_URL = 'http://localhost:5000/api';

const LoginPage = ({ onLogin }) => {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value) => /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value);

  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!isEmailValid(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? 'login' : 'signup';
      const body = mode === 'login'
        ? { email: email.trim().toLowerCase(), password }
        : { name: name.trim(), email: email.trim().toLowerCase(), password };

      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Unable to complete authentication.');
        return;
      }

      onLogin({ email: data.email, name: data.name });
      resetFields();
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((current) => (current === 'login' ? 'signup' : 'login'));
    resetFields();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 relative overflow-hidden" style={{ background: '#040812' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(16,185,129,0.15), transparent 24%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.14), transparent 20%)' }} />
        <div className="absolute top-2 left-1/2 w-[460px] h-[400px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)', transform: 'translateX(-50%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-slate-950/40 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-ecoGreen via-teal-400 to-cyan-400" />
          <div className="relative p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-ecoGreen/80 mb-3">EcoTrack</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-tight">
                  {mode === 'login' ? 'Welcome back' : 'Create your account'}
                </h1>
                <p className="mt-3 text-sm text-gray-400 max-w-[28rem]">
                  {mode === 'login'
                    ? 'Sign in for advanced carbon tracking, personalized insights, and a beautifully polished dashboard.'
                    : 'Create your secure EcoTrack account and start building a cleaner, smarter lifestyle today.'}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 shadow-sm shadow-black/10">
                Secure
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray-300">AI-powered guidance</div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray-300">Stylish glass UI</div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray-300">Live footprint stats</div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-gray-300">Fast secure login</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white outline-none transition focus:border-ecoGreen focus:ring-2 focus:ring-ecoGreen/20"
                    placeholder="Your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white outline-none transition focus:border-ecoGreen focus:ring-2 focus:ring-ecoGreen/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white outline-none transition focus:border-ecoGreen focus:ring-2 focus:ring-ecoGreen/20"
                  placeholder="Enter your password"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white outline-none transition focus:border-ecoGreen focus:ring-2 focus:ring-ecoGreen/20"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-gradient-to-r from-ecoGreen to-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-ecoGreen/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Working...' : (mode === 'login' ? 'Sign in' : 'Create account')}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              {mode === 'login' ? (
                <p>
                  New to EcoTrack?{' '}
                  <button type="button" className="text-ecoGreen font-semibold" onClick={toggleMode}>
                    Create an account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button type="button" className="text-ecoGreen font-semibold" onClick={toggleMode}>
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
