const RegisterForm = () => {
  return (
    <form className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Nama Lengkap
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Masukkan nama lengkap"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Masukkan password"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password-confirmation"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Konfirmasi Password
        </label>

        <input
          id="password-confirmation"
          name="password-confirmation"
          type="password"
          autoComplete="new-password"
          placeholder="Masukkan password"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text-primary outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-4 focus:ring-brand/20"
      >
        Masuk
      </button>
    </form>
  );
};

export default RegisterForm;
