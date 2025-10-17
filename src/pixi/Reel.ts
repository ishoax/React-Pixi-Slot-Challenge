import { Container, Graphics, Rectangle } from "pixi.js";
import Constants from "../Constants";
import ReelSymbol from "./ReelSymbol";
import gsap from "gsap";
import { random } from "lodash-es";

/**
 * Individual Reel for slot machine
 */
class Reel extends Container {
  private bg: Graphics = new Graphics();
  private offsetContainer: Container = new Container();
  private symbolsContainer: Container = new Container();
  private symbolsMask: Graphics = new Graphics();
  private spacing: number = 0;
  private isSpinning: boolean = false;

  constructor() {
    super();

    const rect = new Rectangle(
      0,
      -Constants.REEL_HEIGHT / 2,
      Constants.REEL_WIDTH,
      Constants.REEL_HEIGHT
    );

    this.bg.label = "Background";
    this.bg.rect(rect.x, rect.y, rect.width, rect.height);
    this.bg.fill(0xffffff);
    this.addChild(this.bg);

    this.symbolsMask.label = "Symbols Mask";
    this.symbolsMask.rect(rect.x, rect.y, rect.width, rect.height);
    this.symbolsMask.fill(0xff0000);
    this.addChild(this.symbolsMask);
    this.mask = this.symbolsMask;

    this.offsetContainer.label = "Offset Container";
    this.addChild(this.offsetContainer);

    this.symbolsContainer.label = "Symbols Container";
    this.offsetContainer.addChild(this.symbolsContainer);

    this.spacing = Math.floor(Constants.REEL_HEIGHT / Constants.VISIBLE_REELS);
    this.offsetContainer.position.y = this.spacing; // Move our first symbol down to the bottom

    // Reverse so we can scroll down
    const reversed = Array(Constants.NUM_REPEATS)
      .fill(Constants.SLOT_VALUES)
      .flat()
      .reverse();

    reversed.forEach((slot, index) => {
      const reelSymbol = new ReelSymbol(slot);
      reelSymbol.position.set(Constants.REEL_WIDTH / 2, -this.spacing * index);
      this.symbolsContainer.addChild(reelSymbol);
    });

    // Random start position
    this.symbolsContainer.position.y =
      random(0, Constants.SLOT_VALUES.length) * this.spacing;
  }

  /**
   * Spin the Reel
   */
  spin(index: number, callback: (reel: Reel) => void) {
    if (this.isSpinning) return;

    this.isSpinning = true;

    const min = Constants.SLOT_VALUES.length;
    const max =
      this.symbolsContainer.children.length -
      Constants.SLOT_VALUES.length -
      Constants.VISIBLE_REELS;

    gsap.to(this.symbolsContainer, {
      pixi: {
        positionY:
          this.symbolsContainer.position.y +
          this.spacing * random(min, max, false),
      },
      delay: index * Constants.SPIN_DELAY,
      duration: Constants.SPIN_DURATION + index * Constants.SPIN_OFFSET,
      ease: "power1.inOut",
      onComplete: () => {
        // Reduce Y position to first set
        const step = Constants.SLOT_VALUES.length * this.spacing; // One full 'rotation'

        // Total 'rotations' or 'steps' taken by the spin
        const totalStepsTaken = Math.floor(
          this.symbolsContainer.position.y / step
        );

        // Reduce back to first slot value segements
        this.symbolsContainer.position.y -= totalStepsTaken * step;

        this.isSpinning = false;
        callback(this);
      },
    });
  }
}

export default Reel;
