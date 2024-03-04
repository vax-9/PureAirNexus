import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Date from "./pages/Date";
import World from "./pages/World";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:type" element={<Home />} />
        <Route path="/date" element={<Date />} />
        <Route path="/map" element={<Map />} />
        <Route path="/world" element={<World />} />
      </Routes>
      <Navbar />
      <div className="h-[100px]"></div>
    </>
  );
}

export default App;
