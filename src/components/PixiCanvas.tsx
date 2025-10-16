import { useEffect, useRef } from "react";
import styled from "styled-components";
import PixiApp from "../pixi/PixiApp";

const PixiCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PixiApp>(null);

  useEffect(() => {
    let isMounted = true;

    const setupPixi = async () => {
      if (!containerRef.current) return;

      const app = new PixiApp();
      await app.init();

      if (!isMounted) {
        app.destroy(true, { children: true });
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);
    };

    setupPixi();

    return () => {
      isMounted = false;
      appRef.current?.unmount();
      appRef.current?.destroy(true, { children: true });
    };
  }, []);

  return <GameContainer ref={containerRef} id="gameContainer"></GameContainer>;
};

const GameContainer = styled.div`
  position: relative;
  width: "100%";
  height: "100%";
`;

export default PixiCanvas;
