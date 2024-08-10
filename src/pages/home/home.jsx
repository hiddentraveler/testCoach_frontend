import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

async function getPrivateTests(setLoading, setTests, id) {
  const url = "http://localhost:8000/";

  const options = {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ userid: id }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    setLoading(true);
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.testprivate.length);
    setTests(result.testprivate);
    console.log(result);
    setLoading(false);
  } catch (e) {
    console.log(e);
    setLoading(false);
  }
}

export default function Home() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // if user is'nt there redirect to login
  if (!user) {
    window.location.assign("/login");
  }

  useEffect(() => {
    getPrivateTests(setLoading, setTests, user.id);
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl items-center text-center font-bold">Home</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <svg
            className="animate-spin h-10 w-10 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : (
        <div>
          {tests.length ? (
            <div className="max-w-max  mx-auto p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                My Tests
              </h2>
              <ul className="space-y-3">
                {tests.map((test) => (
                  <li
                    key={test.testid}
                    className="max-w-5xl p-6 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 ease-in-out"
                  >
                    <div className="mt-2 flex justify-between text-sm text-gray-700">
                      <div>
                        <span
                          className="font-bold p-3 text-xl"
                          style={{ color: "#ea6d00" }}
                        >
                          {"Test name: "}
                          {test.testname}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold p-3 text-green-500 text-xl">
                          {" Correct: "}
                          {test.correct}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold p-3 text-red-500 text-xl">
                          {"Wrong: "}
                          {test.wrong}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold p-3 text-blue-500 text-xl">
                          {"Total Questions: "}
                          {test.totalque}
                        </span>
                      </div>
                      <div className="flex-shrink-0 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center ml-3">
                        <svg
                          className="h-5 w-5 text-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <polyline points="3 6 5 6 21 6" />{" "}
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                          <line x1="10" y1="11" x2="10" y2="17" />{" "}
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                It looks a bit empty! Why not get started by taking some tests?
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}
