import { createRef, useEffect } from "react";
import "./App.css";
import Model from "./modules/Model";
function App() {
  const box = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (box.current) {
      new Model(box.current);
    }
  }, [box.current]);

  return <canvas style={{}} ref={box}></canvas>;
}

export default App;
