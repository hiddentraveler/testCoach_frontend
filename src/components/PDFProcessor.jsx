import React, { useState } from "react";
import * as pdfJS from "pdfjs-dist/build/pdf";

const PDFProcessor = ({ answers, setAnswers, handleSubmit }) => {
  // const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [editable, setEditable] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const answers = await processPDF(file);
        setAnswers(answers);
        setError(null);
      } catch (err) {
        setError(`Error processing the PDF file: ${err.message}`);
        console.error(err);
      }
    }
  };

  const processPDF = async (file) => {
    pdfJS.GlobalWorkerOptions.workerSrc =
      window.location.origin + "/pdf.worker.min.mjs";
    const pdf = await pdfJS.getDocument(URL.createObjectURL(file)).promise;
    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await page.getTextContent();
      textContent += text.items.map((item) => item.str).join(" ");
    }

    console.log("Extracted Text:", textContent); // Log the extracted text

    const regex = /(\d+)\.\s*\((1|2|3|4|A|B|C|D|a|b|c|d)\)/g;
    const matches = Array.from(textContent.matchAll(regex));

    console.log("Matches:", matches); // Log the matches

    const answers = {};

    // to convert answer in A,B,C,D to 1,2,3,4
    const answerMap = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    matches.forEach((match) => {
      const questionNumber = parseInt(match[1]);
      const answer = parseInt(match[2])
        ? parseInt(match[2])
        : answerMap[match[2]];
      if (!answers[questionNumber]) {
        answers[questionNumber] = answer;
      }
    });

    // Assume there are 200 questions
    const totalQuestions = 200;
    const finalAnswers = [];
    for (let i = 1; i <= totalQuestions; i++) {
      const correctAnswer = answers[i] || "Not Found";
      finalAnswers.push({ question: i, answer: correctAnswer });
    }

    return finalAnswers;
  };

  // Handle clear button click
  const handleClear = () => {
    setAnswers([]);
  };

  // Handle Edit button click
  const handleEdit = () => {
    setEditable(!editable);
  };

  // Show answers in 4 columns
  const splitIntoColumns = (arr, numColumns) => {
    const perColumn = Math.ceil(arr.length / numColumns);
    return new Array(numColumns)
      .fill("")
      .map((_, i) => arr.slice(i * perColumn, (i + 1) * perColumn));
  };

  const columns = splitIntoColumns(answers, 5);

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">PDF Answer Key Processor</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <div className="flex flex-col items-center underline pb-4">
          {answers.length > 0 && (
            <h2 className="text-2xl font-semibold mt-4 mb-2">
              Processed Answers
            </h2>
          )}
        </div>
        <ul className="list-disc pl-5 space-y-4">
          <div className="flex space-x-10">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex}>
                {column.length > 0 && (
                  <ul className="flex space-x-6 font-semibold">
                    <span></span>
                    <span></span>
                    {[1, 2, 3, 4].map((option) => (
                      <li key={option} className="">
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                {column.map(({ question, answer }) => (
                  <li
                    key={question}
                    className="text-gray-700 flex items-center"
                  >
                    <span className="font-semibold mr-4">
                      {question.toString().padStart(3, "0")}.
                    </span>
                    <ul className="flex space-x-4">
                      {[1, 2, 3, 4].map((option) => (
                        <li key={option} className="relative">
                          <div
                            className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                              answer === option
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {answer === option && (
                              <span className="block w-2 h-2 bg-white rounded-full"></span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </div>
            ))}
          </div>
        </ul>
      </div>

      {answers.length > 0 && (
        <div className="mt-4 space-x-4">
          <button
            type="button"
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            {editable ? "Reset" : "Edit"}
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFProcessor;
