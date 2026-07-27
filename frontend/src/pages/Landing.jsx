// import { Link } from "react-router-dom";
// import {
//   Compass,
//   Heart,
//   Bookmark,
// } from "lucide-react";

// function Landing() {
//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
//         <div className="absolute -left-32 top-0 h-96 w-96  bg-red-600/20 blur-3xl" />
//         <div className="absolute -right-32 bottom-0 h-96 w-96  bg-blue-600/20 blur-3xl" />


//       {/* Navbar */}
//       <nav className="mx-auto flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
//         <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-3xl">
//           S p e c t a r a
//         </h1>

//         <div className="flex items-center gap-4">
//           <Link
//             to="/login"
//             className="btn-b text-zinc-300 transition hover:text-white"
//           >
//             Login
//           </Link>

//           <Link
//             to="/register"
//             className="btn-b text-zinc-300 px-5 py-2 font-medium transition hover:text-white"
//           >
//             Get Started
//           </Link>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="mx-auto flex min-h-[75vh] flex-col items-center justify-center px-5 text-center sm:min-h-[80vh] sm:px-8">

//         <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-900">
//           Your Personal Movie Companion
//         </p>

//         <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
//           Discover Movies You'll
//           <span className="text-blue-900"> Actually Love.</span>
//         </h1>

//         <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-8 sm:text-lg sm:leading-8">
//           Search thousands of movies, discover trending titles,
//           build your watchlist, save your favorites, and never
//           run out of something to watch.
//         </p>

//         <div className="mt-10 flex w-full max-w-sm flex-col gap-4 sm:mt-12 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5">
//           <Link
//             to="/register"
//             className="btn-b w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto"
//           >
//             Get Started
//           </Link>

//           <Link
//             to="/home"
//             className="btn-b w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto"
//           >
//             Browse Movies
//           </Link>
//         </div>

//       </section>

//       {/* Features */}
//       <section className="mx-auto grid gap-6 px-5 pb-20 sm:px-8 md:grid-cols-3">

//         <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">

//           <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
//   <Compass size={28} />
// </div>

//           <p className="text-zinc-400">
//             Browse trending, popular, top-rated and upcoming
//             movies from around the world.
//           </p>
//         </div>

//         <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
//           <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
//   <Heart size={28} />
// </div>

//           <p className="text-zinc-400">
//             Save the movies you love and build your own personal
//             collection.
//           </p>
//         </div>

//         <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
//           <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
//   <Bookmark size={28} />
// </div>

//           <p className="text-zinc-400">
//             Keep track of everything you want to watch next.
//           </p>
//         </div>

//       </section>

//       {/* CTA */}
//       <section className="border-t border-zinc-800 px-5 py-20 text-center sm:px-8 sm:py-24">

//         <h2 className="text-3xl font-bold sm:text-4xl">
//           Ready to start discovering?
//         </h2>

//         <p className="mx-auto mt-5 max-w-xl text-zinc-400">
//           Join Spectara today and organize every movie worth watching.
//         </p>

//       </section>

//       {/* Footer */}
//       <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-500">
//         © 2026 Spectara • Built with React & TMDB
//       </footer>

//     </div>
//   );
// }

// export default Landing;


import { Link } from "react-router-dom";
import {
  Compass,
  Heart,
  Bookmark,
} from "lucide-react";
import tmdbLogo from "../assets/logo.svg";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Landing() {
  const navigate = useNavigate();
  const {user,loading} = useAuth();
  useEffect(()=>{
    if(!loading && user){
      navigate("/home",{replace:true});
    }
  },[user,loading,navigate]);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      {/* Background Blobs */}
      <div className="absolute -left-32 top-0 h-96 w-96 bg-red-600/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 bg-blue-600/20 blur-3xl" />

      {/* Navbar */}
      <nav className="fade-in relative z-10 mx-auto flex items-center justify-between px-5 py-6 sm:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          S p e c t a r a
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="btn-b text-sm text-zinc-300 transition hover:text-white sm:text-base"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn-b px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white sm:px-5 sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="fade-in fade-delay-1 relative z-10 mx-auto flex min-h-[80vh] flex-col items-center justify-center px-5 text-center sm:px-8">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-blue-900 sm:text-sm">
          Your Personal Movie Companion
        </p>

        <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl md:text-7xl">
          Discover Movies You'll
          <span className="text-blue-900"> Actually Love.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-8 sm:text-lg sm:leading-8">
          Search thousands of movies, discover trending titles,
          build your watchlist, save your favorites, and never
          run out of something to watch.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-4 sm:mt-12 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            to="/register"
            className="btn-b w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto"
          >
            Get Started
          </Link>

          <Link
            to="/home"
            className="btn-b w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto"
          >
            Browse Movies
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="fade-in fade-delay-2 relative z-10 mx-auto grid gap-6 px-5 pb-20 sm:px-8 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
            <Compass size={28} />
          </div>

          <p className="text-zinc-400">
            Browse trending, popular, top-rated and upcoming
            movies from around the world.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
            <Heart size={28} />
          </div>

          <p className="text-zinc-400">
            Save the movies you love and build your own personal
            collection.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900">
            <Bookmark size={28} />
          </div>

          <p className="text-zinc-400">
            Keep track of everything you want to watch next.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-in fade-delay-3 relative z-10 border-t border-zinc-800 px-5 py-20 text-center sm:px-8 sm:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to start discovering?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-zinc-400">
          Join Spectara today and organize every movie worth watching.
        </p>
      </section>

      {/* Footer */}
      {/* <footer className="fade-in fade-delay-4 relative z-10 border-t border-zinc-900 py-8 text-center text-sm text-zinc-500">
        © 2026 Spectara • Built with React & TMDB
        <img
          src={tmdbLogo}
          alt="TMDB Logo"
          className="h-8 "
        />

        <p className="text-xs leading-6 text-gray-500">
          This website uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </p>

      </footer> */}
      <footer className="fade-in fade-delay-4 relative z-10 border-t border-zinc-900 py-8 text-center text-sm text-zinc-500">
  <p>© 2026 Spectara • Built with React</p>

  <p className="mt-4 text-xs uppercase tracking-wider text-zinc-400">
    Powered by
  </p>

  <img
    src={tmdbLogo}
    alt="TMDB Logo"
    className="mx-auto mt-2 h-8"
  />

  <p className="mt-3 text-xs leading-6 text-gray-500">
    This website uses TMDB and the TMDB APIs but is not endorsed,
    certified, or otherwise approved by TMDB.
  </p>
</footer>
    </div>
  );
}

export default Landing;