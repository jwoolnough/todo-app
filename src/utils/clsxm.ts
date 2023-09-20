import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge list of Tailwind classes
 * @param {ClassValue[]} classes - List of classes to merge
 * */
const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export { clsxm };
