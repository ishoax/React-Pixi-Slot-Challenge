import { Assets, Sprite, Texture } from "pixi.js";
import type { Fruits } from "../Constants";

/**
 * Each individual symbol on the Reel
 */
class ReelSymbol extends Sprite {
  public value: string;

  constructor(value: Fruits) {
    super(ReelSymbol.getTexture(value));

    this.label = `${value}`;
    this.value = value;
    this.anchor.set(0.5);
  }

  /**
   * Get the texture for the specific symbol
   */
  private static getTexture(value: Fruits): Texture {
    let textureName: string;

    switch (value) {
      case "Apple":
        textureName = "Apple_96x96";
        break;
      case "Banana":
        textureName = "Banana_96x96";
        break;
      case "Cherry":
        textureName = "Cherry_96x96";
        break;
      case "Grape":
        textureName = "Green_Grape_96x96";
        break;
      case "Lemon":
        textureName = "Lemon_96x96";
        break;
      case "Lime":
        textureName = "Lime_96x96";
        break;
      case "Orange":
        textureName = "Orange_96x96";
        break;
      case "Plum":
        textureName = "Plum_96x96";
        break;
      case "Strawberry":
        textureName = "StrawBerry_96x96";
        break;
      case "Watermelon":
        textureName = "Watermelon_96x96";
        break;
    }

    return Assets.get(textureName);
  }
}

export default ReelSymbol;
