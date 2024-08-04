import { useState } from "react";

async function bulkeval(files) {
  for (let i = 0; i < files.length; i++) {
    if (!files[i]) {
      return;
    }
  }

  const forData = new FormData();
  for (let i = 0; i < files.length; i++) {
    forData.append("files", files[i]);
  }

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
  const [files, setFiles] = useState(null);
  function handleFileChange(e) {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    bulkeval(files);
    console.log(files.length);
  };

  return (
    <>
      <input id="omr" onChange={handleFileChange} type="file" multiple />
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
