const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="h-screen w-full bg-[#121110] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold font-display">
            D
          </div>
          <h1 className="text-xl font-semibold font-display tracking-tight text-white">
            DocuMind
          </h1>
        </div>

        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-7 backdrop-blur">
          <h2 className="text-lg font-semibold font-display text-white mb-1">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-zinc-500 mb-6">{subtitle}</p>}

          {children}
        </div>

        {footer && (
          <div className="text-center mt-5 text-sm text-zinc-500">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
