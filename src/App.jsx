import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Upload from "./Upload";
import Footprint from "./footprint";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
