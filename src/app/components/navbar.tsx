import Link from "next/link";

const Navbar = () => (
  <nav className="bg-purple-800 p-4 text-white sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/">
        <p className="text-2xl font-bold">MovieApp</p>
      </Link>
      <Link href="/watchlist">
        <p className="text-lg">Watchlist</p>
      </Link>
    </div>
  </nav>
);

export default Navbar;
