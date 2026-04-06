/**
 * Utility to simulate loading delay
 * @param ms milliseconds
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
