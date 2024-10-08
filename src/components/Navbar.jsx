import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";

function Navbar() {
  function handleLogOut() {
    localStorage.removeItem("user");
    window.location.assign("/login");
  }
  return (
    <div className="flex justify-between items-center px-4 py-1 border-b-2 border-gray-900 bg-green-100">
      <Link
        to="/"
        className="flex justify-between space-x-2 items-center text-white bg-zinc-700 hover:bg-zinc-900 rounded-md py-2 px-3"
      >
        <img src={logo} alt="logo of the site" className="h-7 invert" />
        <div className="font-bold text-1xl align-top h-6 w-1 bg-white rounded-sm"></div>
        <div className="font-bold text-xl">Test Coach</div>
      </Link>

      <div className="flex space-x-2">
        <Link
          to={"/upload"}
          type="button"
          className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-base px-3 py-1.5 text-center inline-flex items-center"
        >
          Self Evaluation
        </Link>

        <Link
          to={"/bulkeval"}
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-base px-3 py-1.5 text-center inline-flex items-center"
        >
          Bulk Evaluation
        </Link>
      </div>

      <button
        onClick={handleLogOut}
        className="text-white bg-sky-500 hover:bg-sky-600 font-medium rounded-lg text-base px-3 py-1.5 text-center inline-flex items-center"
      >
        Log Out
      </button>
    </div>
  );
}

export default Navbar;
