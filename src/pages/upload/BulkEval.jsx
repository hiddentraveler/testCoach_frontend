import { useState } from "react";

async function bulkeval(inputs, csv) {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i]) {
      return;
    }
  }

  if (!csv[0]) {
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
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

export default function BulkEval() {
  const [inputs, setInputs] = useState(null);
  const [csv, setCsv] = useState(null);
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
    bulkeval(inputs, csv);
    console.log(inputs.length);
    console.log(csv[0]);
  };

  return (
    <>
      <label htmlFor="omr">Omrs:</label>
      <input id="omr" onChange={handleFileChange} type="file" multiple />
      <label htmlFor="csv">Ans Csv:</label>
      <input id="csv" onChange={handleCsv} type="file" />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Evaluate
      </button>
    </>
  );
}
