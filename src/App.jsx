import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import LogIn from "./pages/login/login.jsx";
import SignUp from "./pages/signup/signup.jsx";
import Upload from "./pages/upload/upload.jsx";
import BulkEval from "./pages/upload/BulkEval.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/bulkeval" element={<BulkEval />} />
    </Routes>
  );
}

export default App;
