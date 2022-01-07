import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../src/components/LandingPage";
import Home from "../src/components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
{
  /*
  <Route path="activity" element={<ActivityCreate />} />
  <Route path="/home/:id" element={<Detail />} />
</Routes> */
}

export default App;
