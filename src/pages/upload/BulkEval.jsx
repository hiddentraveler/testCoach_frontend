import { useState } from "react";
import Navbar from "../../components/Navbar";

async function bulkeval(inputs, csv, resetInputs, resetCsv, setError) {
  if (!inputs || !inputs.length) {
    setError("Please upload at least one OMR sheet.");
    return;
  }

  if (!csv || !csv.length) {
    setError("Please upload the answer key CSV file.");
    return;
  }

  const forData = new FormData();

  for (let i = 0; i < inputs.length; i++) {
    forData.append("inputs", inputs[i]);
  }

  forData.append("csv", csv[0]);
  const url = "http://localhost:8000/bulkeval";

  const options = {
    mode: "cors",
    method: "POST",
    body: forData,
  };

  console.log(forData);
  try {
    const response = await fetch(url, options);
    const blob = await response.blob();
    const url2 = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url2;
    a.download = "evaluation_result.csv"; // The name of the file to be saved
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url2);

    // Reset the state of the inputs and clear any errors
    resetInputs();
    resetCsv();
    setError("");

    // Clear the file inputs in the DOM
    document.getElementById("omr").value = "";
    document.getElementById("csv").value = "";
  } catch (e) {
    console.log(e);
  }
}

export default function BulkEval() {
  const [inputs, setInputs] = useState(null);
  const [csv, setCsv] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    if (e.target.files) {
      setInputs(e.target.files);
    }
  }

  function handleCsv(e) {
    if (e.target.files) {
      setCsv(e.target.files);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    bulkeval(
      inputs,
      csv,
      () => setInputs(null),
      () => setCsv(null),
      setError,
    );
    console.log(inputs ? inputs.length : 0);
    console.log(csv ? csv[0] : "No CSV");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Bulk OMR Evaluation
          </h1>
          {error && (
            <div className="mb-4 text-red-600 font-medium text-center">
              {error}
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="omr"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload OMR Sheets:
            </label>
            <input
              id="omr"
              onChange={handleFileChange}
              type="file"
              multiple
              accept="image/*" // Restrict to image files
              className="block w-full text-gray-800 border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="csv"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Answer Key CSV:
            </label>
            <input
              id="csv"
              onChange={handleCsv}
              type="file"
              accept=".csv" // Restrict to CSV files
              className="block w-full text-gray-800 border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Start Evaluation
          </button>
        </form>
      </div>
    </>
  );
}
