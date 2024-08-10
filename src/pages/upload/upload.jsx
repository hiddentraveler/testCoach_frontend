import { useState } from "react";
import Navbar from "../../components/Navbar";
import PDFProcessor from "../../components/PDFProcessor";

async function uploadPrivate(file, testname, user, ansArr, setLoading) {
  if (!file) {
    return;
  }

  const forData = new FormData();
  forData.append("file", file);
  forData.append("testname", testname);
  forData.append("testpublic", false);
  forData.append("ansarr", JSON.stringify(ansArr));
  forData.append("testarr", [1, 2, 3, 4, 5]);
  forData.append("userid", `${user.id}`);

  const url = "http://localhost:8000/upload";

  const options = {
    mode: "cors",
    method: "POST",
    body: forData,
    headers: {
      "content-length": `${file.size}`,
    },
  };

  try {
    setLoading(true);
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    setLoading(false);
  } catch (e) {
    console.log(e);
    setLoading(false);
  }
}

export default function Upload() {
  const [answers, setAnswers] = useState([]);
  const [file, setFile] = useState(null);
  const [testname, setTestName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle data submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please upload an OMR image.");
      return;
    }
    if (!testname) {
      setError("Please enter a test name.");
      return;
    }
    const ansArr = answers.map((item) => item.answer);
    if (ansArr.length === 0) {
      setError("Please provide answers in the PDF processor.");
      return;
    }
    setError("");
    uploadPrivate(file, testname, user, ansArr, setLoading);
  };

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Uploading...</h3>
          <div className="lds-ring">
            <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-2xl mx-auto py-10 px-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex justify-center">
                  Upload Test
                </h2>
                {error && (
                  <div className="mb-4 text-red-600 font-medium text-center">
                    {error}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="testname"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Test Name:
                  </label>
                  <input
                    type="text"
                    id="testname"
                    value={testname}
                    onChange={(e) => setTestName(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="omr"
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    Upload OMR Image:
                  </label>
                  <input
                    type="file"
                    id="omr"
                    accept="image/*" // Restrict to image files
                    onChange={handleFileChange}
                    className="block w-full text-gray-900 border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <PDFProcessor
                  setAnswers={setAnswers}
                  handleSubmit={handleSubmit}
                  answers={answers}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Submit Test
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
