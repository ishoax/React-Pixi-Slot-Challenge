import { Container } from "pixi.js";
import Button from "./SpinButton";
import SlotMachine from "./SlotMachine";

class Game extends Container {
  private slotMachine: SlotMachine;
  private button: Button;

  constructor() {
    super();

    this.slotMachine = new SlotMachine();
    this.slotMachine.position.set(0, -50);

    this.button = new Button();
    this.button.position.set(0, 250);

    this.addChild(this.slotMachine, this.button);

    this.addListeners();
  }

  /**
   * Add button listeners
   */
  private addListeners(): void {
    this.button.eventMode = "static";
    this.button.cursor = "pointer";
    this.button.on("pointertap", this.handleButton, this);
  }

  /**
   * Handle button pointertap event
   */
  private handleButton(): void {
    this.slotMachine.spin();
  }
}

export default Game;
