import React, { useEffect, useRef } from "react";
import "./MainPart.css";
import Header from "./content/Header/Header";
import { matrixRun } from "../../utils/matrix";
import DraggablePlayer from "./content/Header/components/draggable-player/draggable-player";
import { handleScroll } from "../../utils/scroll";

const MainPart: React.FC = () => {
  const canvas: React.RefObject<HTMLCanvasElement> = useRef(null);

  const onScroll = (e: any) => {
    handleScroll(e, "target2");
  };

  useEffect(() => matrixRun(canvas), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="main-page" id="target1">
      <DraggablePlayer />
      {/* <DifferentOptions /> */}
      <canvas ref={canvas} id="matrix" />
      <Header />

    </div>
  );
};

export default MainPart;
