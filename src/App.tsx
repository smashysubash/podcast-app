import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { Dashboard } from "./components/dashboard";
import Protected from "./services/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
