import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/home/Home";
import Quiz from "./Component/quiez/Quiz";
import Results from "./Component/results/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
