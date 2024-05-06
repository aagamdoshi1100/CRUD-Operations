import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductListing from "./Components/ProductListing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductListing />} />
      </Routes>
    </div>
  );
}

export default App;
