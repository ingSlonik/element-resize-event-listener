declare type Size = { width: number, height: number };

declare type Handler = (element: HTMLElement, size: Size) => void;

declare type Interval = number | "animationFrame";

declare export const addResizeEventListener: (element: HTMLElement, handler: Handler) => void;

declare export const removeResizeEventListener: (element: HTMLElement, handler: Handler) => void;

declare export const removeAllResizeEventListeners: (element: HTMLElement) => void;

declare export const setCheckInterval: (customInterval: Interval) => void;
