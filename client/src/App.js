import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../src/components/LandingPage";
import Home from "../src/components/Home";
import Create from "./components/Create";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
