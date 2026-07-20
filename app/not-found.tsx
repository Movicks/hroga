import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/80 transition"
      >
        Go Home
      </Link>
    </main>
  );
}