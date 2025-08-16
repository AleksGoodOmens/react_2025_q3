import { Link } from 'src/i18n/navigation';

export default function NotFound() {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          404 — This page was not found in this language 🌍
        </h1>
        <p>Could not find requested resource</p>
        <Link
          className="mt-4 rounded-2xl bg-amber-100 px-4 py-2 transition-colors duration-300 hover:bg-amber-300 hover:text-red-500"
          href="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
