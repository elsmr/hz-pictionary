export const required = string => !string.startsWith(' ') && !string.endsWith(' ') && string.length > 2;

export const isSlug = () => true;
