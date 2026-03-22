import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import TicketDetails from "./Pages/TicketDetails";

const App: React.FC = () => {
  return (
    <div className="bg-background h-screen flex">
      <div className="flex-shrink-0">
        <NavBar />
      </div>
      <main className="flex-1 overflow-y-auto text-gray-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ticket/:ticketId" element={<TicketDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;