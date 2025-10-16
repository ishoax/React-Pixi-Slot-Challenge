import { Application } from "pixi.js";

class PixiApp extends Application {
  async init(): Promise<void> {
    await super.init({
      resizeTo: document.getElementById("gameContainer") as HTMLDivElement,
      backgroundAlpha: 0,
      sharedTicker: false,
      width: 300,
      height: 300,
      antialias: true,
    });

    this.canvas.style.position = "relative";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
  }

  public unmount(): void {}
}

export default PixiApp;
