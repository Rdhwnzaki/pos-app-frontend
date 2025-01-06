import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
