import { Container, Graphics } from "pixi.js";
import Reel from "./Reel";
import Constants from "../Constants";

/**
 * Container that holds all the Reel(s)
 */
class SlotMachine extends Container {
  private reels: Reel[] = [];
  private reelsComplete: Reel[] = [];
  private bg: Graphics = new Graphics();
  private reelsContainer: Container = new Container();
  private isSpinning: boolean = false;

  constructor() {
    super();

    const spacing = Constants.REEL_SPACING;

    const numReels = Constants.NUM_REELS;
    const width = numReels * 100 + 50 + (numReels - 1) * spacing;
    console.log(width);
    const height = Constants.REEL_HEIGHT + 50;

    this.bg.label = "Background";
    this.bg.roundRect(-width / 2, -height / 2, width, height, 10);
    this.bg.fill(0x008080);
    this.addChild(this.bg);

    this.reelsContainer.label = `Reels Container`;
    this.addChild(this.reelsContainer);

    for (let i = 0; i < Constants.NUM_REELS; i++) {
      const reel = new Reel();
      reel.position.x = i * reel.width + i * spacing;
      reel.label = `Reel ${i}`;
      this.reels.push(reel);
      this.reelsContainer.addChild(reel);
    }

    this.reelsContainer.pivot.x = this.reelsContainer.width / 2;
  }

  /**
   * Spin all the wheels
   */
  public spin(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;

    this.reels.forEach((reel, i) =>
      reel.spin(i, (reel: Reel) => this.handleReelComplete(reel))
    );
  }

  /**
   * Callback when reel spin is completed
   */
  private handleReelComplete(reel: Reel): void {
    if (!this.reelsComplete.includes(reel)) {
      this.reelsComplete.push(reel);
    }

    // All reels completed spinning
    if (this.reelsComplete.length === this.reels.length) {
      this.reelsComplete.length = 0; // Clear for new spin round
      this.isSpinning = false;
    }
  }
}

export default SlotMachine;
