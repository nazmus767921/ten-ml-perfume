export type BadgeType = "sales" | "premium" | "new";

export interface ProductColor {
  /** CSS color value e.g. "#ffffff" or "rgb(0,0,0)" */
  value: string;
  label?: string;
}

export interface Product {
  id: string | number;
  name: string;
  /** Original price before discount */
  originalPrice?: number;
  price: number;
  /** Badge to show on product card */
  badge?: BadgeType;
  /** Secondary badge (top right corner of card) */
  secondaryBadge?: BadgeType;
  colors?: ProductColor[];
  /** Selected color index */
  defaultColorIndex?: number;
  /** If true, shows "Out of stock" + Notify Me button instead of cart controls */
  outOfStock?: boolean;
  /** Short descriptor e.g. "Super white" */
  colorLabel?: string;
}
