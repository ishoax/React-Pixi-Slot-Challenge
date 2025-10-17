import { Container, Graphics, Text } from "pixi.js";

class SpinButton extends Container {
  private bg: Graphics = new Graphics();
  private spinText: Text;

  constructor() {
    super();

    this.bg.label = "Background";
    this.bg.roundRect(-50, -25, 100, 50, 5);
    this.bg.fill(0x800080);

    this.spinText = new Text({
      text: "Spin",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        align: "center",
      },
    });
    this.spinText.label = "Spin Text";
    this.spinText.anchor.set(0.5);

    this.addChild(this.bg, this.spinText);
  }
}

export default SpinButton;
