declare type Size = { width: number, height: number };

declare type Handler = (element: HTMLElement, size: Size) => void;

declare type Interval = number | "animationFrame";

export declare const addResizeEventListener: (element: HTMLElement, handler: Handler) => void;

export declare const removeResizeEventListener: (element: HTMLElement, handler: Handler) => void;

export declare const removeAllResizeEventListeners: (element: HTMLElement) => void;

export declare const setCheckInterval: (customInterval: Interval) => void;
