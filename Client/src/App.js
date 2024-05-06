import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductListing from "./Components/ProductListing";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListing />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
