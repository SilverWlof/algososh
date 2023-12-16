
export const wait = (delay: number, ...args: any[]) => new Promise(resolve => setTimeout(resolve, delay, ...args));