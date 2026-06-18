import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import EditApplication from "../pages/EditApplication";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/edit/:id" element={<EditApplication />} />
    </Routes>
  );
}
