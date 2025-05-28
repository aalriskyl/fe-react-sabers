import { Link } from "react-router-dom";

const NotFoundView = () => {
  return (
    <div className="flex flex-col items-center bg-gray-800 justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-400">404</h1>
      <p className="text-xl mt-4 text-gray-400">
        Oops! Halaman tidak ditemukan.
      </p>
      <Link to="/" className="mt-6 px-6 py-4 bg-gray-900 text-white rounded-lg">
        Kembali ke Home
      </Link>
    </div>
  );
};

export default NotFoundView;
