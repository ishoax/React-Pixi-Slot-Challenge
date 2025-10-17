export type Fruits =
  | "Apple"
  | "Banana"
  | "Cherry"
  | "Grape"
  | "Lemon"
  | "Lime"
  | "Orange"
  | "Orange"
  | "Plum"
  | "Strawberry"
  | "Watermelon";

interface IConstants {
  NUM_REELS: number;
  NUM_REPEATS: number;
  REEL_SPACING: number;
  REEL_WIDTH: number;
  REEL_HEIGHT: number;
  VISIBLE_REELS: number;
  SPIN_DELAY: number;
  SPIN_DURATION: number;
  SPIN_OFFSET: number;
  SLOT_VALUES: Fruits[];
}

const Constants: IConstants = {
  NUM_REELS: 5,
  NUM_REPEATS: 5,
  REEL_SPACING: 10,
  REEL_WIDTH: 100,
  REEL_HEIGHT: 400,
  VISIBLE_REELS: 3,
  SPIN_DELAY: 0.05,
  SPIN_DURATION: 0.75,
  SPIN_OFFSET: 0.25,
  SLOT_VALUES: [
    "Apple",
    "Apple",
    "Banana",
    "Cherry",
    "Grape",
    "Grape",
    "Lemon",
    "Lime",
    "Orange",
    "Orange",
    "Plum",
    "Strawberry",
    "Watermelon",
  ],
};

export default Constants;
