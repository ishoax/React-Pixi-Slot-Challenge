import { useEffect, useRef } from "react";
import styled from "styled-components";
import PixiApp from "../pixi/PixiApp";

const PixiCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PixiApp>(null);

  useEffect(() => {
    let isMounted = true;
    let resize: () => void;

    const setupPixi = async () => {
      if (!containerRef.current) return;

      const app = new PixiApp();
      await app.init();

      if (!isMounted) {
        if (resize) {
          window.removeEventListener("resize", resize);
        }
        app.destroy(true, { children: true });
        return;
      }

      appRef.current = app;
      containerRef.current.appendChild(app.canvas);

      resize = () => app.handleResize();
      window.addEventListener("resize", resize);
    };

    setupPixi();

    return () => {
      isMounted = false;
      if (resize) {
        window.removeEventListener("resize", resize);
      }
      appRef.current?.unmount();
      appRef.current?.destroy(
        { removeView: true },
        {
          children: true,
          texture: true,
          textureSource: false,
          context: true,
        }
      );
    };
  }, []);

  return <GameContainer ref={containerRef} id="gameContainer"></GameContainer>;
};

const GameContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default PixiCanvas;
