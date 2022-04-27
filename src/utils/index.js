import { USER_TYPES } from "./data";

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const isTypeAdmin = (type) => type === USER_TYPES.ADMIN || type === USER_TYPES.SUPER_ADMIN;
