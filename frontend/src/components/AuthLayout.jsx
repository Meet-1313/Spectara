function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">

      {/* Background */}
      <div className="absolute inset-0">

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-black to-zinc-900" />

        {/* Accent */}
        <div className="absolute -left-32 top-0 h-96 w-96  bg-red-600/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96  bg-blue-600/20 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-6 lg:px-8">

        <div className="w-full max-w-lg">

          {/* Logo */}
          <div className=" text-center sm:mb-10">

            <div className="mx-auto mt-4 h-1 w-24 " />
          </div>

          {/* Card */}
          <div className="overflow-hidden  border border-white/10 bg-zinc-950/80 shadow-[0_30px_90px_rgba(0,0,0,.55)] backdrop-blur-2xl">
            <div className="h-1 w-full " />

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <div className="mb-8 space-y-3 text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
                </h2>

                <p className="text-sm leading-6 text-zinc-400 sm:text-base">
                  {subtitle}
                </p>
              </div>

              {children}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AuthLayout;