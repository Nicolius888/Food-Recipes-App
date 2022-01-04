import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Food</h1>
        {/* <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="activity" element={<ActivityCreate />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
