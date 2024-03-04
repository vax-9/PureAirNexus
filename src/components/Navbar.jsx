import { BsClockHistory, BsFillPinMapFill } from "react-icons/bs";
import { BiWorld, BiHomeAlt2 } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();

  const [active, setActive] = useState(`${location.pathname}`);

  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex h-[100px] items-center justify-around bg-pureWhite pb-3">
      <button
        className={`rounded-lg border-2 p-3 ${active === "/" ? " border-skyBlue text-skyBlue" : "border-transparent"}`}
        onClick={() => {
          setActive("/");
          navigate("/");
        }}
      >
        <BiHomeAlt2 size={"1.5em"} />
      </button>
      <button
        className={`rounded-lg border-2 p-3 ${active === "/date" ? " border-skyBlue text-skyBlue" : "border-transparent"}`}
        onClick={() => {
          setActive("/date");
          navigate("/date");
        }}
      >
        <BsClockHistory size={"1.5em"} />
      </button>
      <button
        className={`rounded-lg border-2 p-3 ${active === "/map" ? " border-skyBlue text-skyBlue" : "border-transparent"}`}
        onClick={() => {
          setActive("/map");
          navigate("/map");
        }}
      >
        <BsFillPinMapFill size={"1.5em"} />
      </button>
      <button
        className={`rounded-lg border-2 p-3 ${active === "/world" ? " border-skyBlue text-skyBlue" : "border-transparent"}`}
        onClick={() => {
          setActive("/world");
          navigate("/world");
        }}
      >
        <BiWorld size={"1.5em"} />
      </button>
    </nav>
  );
}

export default Navbar;
