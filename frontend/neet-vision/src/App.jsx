import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import AIDoubtSolver from "./pages/AIDoubtSolver";
import MockTest from "./pages/MockTest";
import Diagrams from "./pages/Diagram"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice/:subject" element={<Practice/>}/>
        <Route path="/ai-doubt" element={<AIDoubtSolver/>}/>
        <Route path="/mock-test" element={<MockTest/>}/>
        <Route path="/diagrams" element={<Diagrams />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;