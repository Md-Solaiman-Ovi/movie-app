import Link from "next/link";

const Navbar = () => (
  <nav className="bg-gray-800 p-4 text-white">
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
