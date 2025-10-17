import { Application, Assets, Container } from "pixi.js";
import Game from "./Game";
import Constants from "../Constants";

class PixiApp extends Application {
  private mainContainer: Container = new Container();
  private baseCanvasWidth: number = 500;
  private baseCanvasHeight: number = 600;

  async init(): Promise<void> {
    const numReels = Constants.NUM_REELS;
    this.baseCanvasWidth =
      numReels * 100 + 50 + (numReels - 1) * Constants.REEL_SPACING + 50;

    await super.init({
      backgroundAlpha: 0,
      width: this.baseCanvasWidth,
      height: this.baseCanvasHeight,
      sharedTicker: false,
      antialias: true,
    });

    // Dev only chrome plugin
    (globalThis as any).__PIXI_APP__ = this;

    // Center the Canvas
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "50%";
    this.canvas.style.left = "50%";
    this.canvas.style.transform = "translate(-50%, -50%)";

    this.mainContainer.label = "Main Container";
    this.stage.addChild(this.mainContainer);

    await Assets.load("spritesheets/slots.json");

    const game = new Game();
    this.mainContainer.addChild(game);

    this.handleResize(); // Initial resize
  }

  /**
   * Handle resize event
   */
  public handleResize(): void {
    this.applyObjectFitContain(
      this.canvas,
      document.getElementById("gameContainer") as HTMLDivElement
    );

    this.mainContainer.position.set(
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }

  /**
   * Object-fit contain effect on the canvas
   * Using the CSS property causes issues with PIXI interactions
   */
  private applyObjectFitContain(
    canvasElement: HTMLCanvasElement,
    containerElement: HTMLDivElement
  ) {
    const containerWidth = containerElement.clientWidth;
    const containerHeight = containerElement.clientHeight;

    const canvasAspectRatio = this.baseCanvasWidth / this.baseCanvasHeight;
    const containerAspectRatio = containerWidth / containerHeight;

    let newWidth, newHeight;

    if (canvasAspectRatio > containerAspectRatio) {
      // Canvas is wider than container, constrain by container width
      newWidth = containerWidth;
      newHeight = containerWidth / canvasAspectRatio;
    } else {
      // Canvas is taller than container, constrain by container height
      newHeight = containerHeight;
      newWidth = containerHeight * canvasAspectRatio;
    }

    canvasElement.style.width = `${newWidth}px`;
    canvasElement.style.height = `${newHeight}px`;
  }

  public unmount(): void {}
}

export default PixiApp;
