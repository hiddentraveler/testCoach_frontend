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

async function uploadPublic(file, testname, testid, user) {
  if (!file) {
    return;
  }

  const forData = new FormData();
  forData.append("file", file);
  forData.append("testname", testname);
  forData.append("testid", testid);
  forData.append("testpublic", false);
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
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle data submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const ansArr = answers.map((item) => item.answer);
    console.log("Submitting answers(preprocessed):", answers);
    console.log("Submitting answers:", ansArr);
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
        <>
          <div>
            <h3>uploading</h3>
          </div>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <div>
          <Navbar />
          <div>
            <label htmlFor="testname">Test Name: </label>
            <input
              type="text"
              id="testname"
              value={testname}
              onChange={(e) => setTestName(e.target.value)}
            />
            <br />
            <label htmlFor="omr">Omr: </label>
            <input type="file" id="omr" onChange={handleFileChange} />
          </div>
          <PDFProcessor
            setAnswers={setAnswers}
            handleSubmit={handleSubmit}
            answers={answers}
          />
        </div>
      )}
    </>
  );
}
