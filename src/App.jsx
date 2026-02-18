import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <UpdateProduct />
            </PrivateRoute>
          }
        />

        {/* Protected Route */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
