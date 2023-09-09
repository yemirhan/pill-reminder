import twColors from "tailwindcss/colors";

export const colors = {
  emerald: twColors.emerald[500],
  red: twColors.red[600],
  sky: twColors.sky[600],
  orange: twColors.orange[500],
  purple: twColors.purple[600],
  pink: twColors.pink[500],
} as const;
export const bgColors = {
  emerald: "bg-emerald-500",
  red: "bg-red-600",
  sky: "bg-sky-600",
  orange: "bg-orange-500",
  purple: "bg-purple-600",
  pink: "bg-pink-500",
} as const;
export const nameToTWBgColor = (name: ColorNames) => {
  return bgColors[name];
};
export type ColorNames = keyof typeof colors;
export type Color = (typeof colors)[ColorNames];
