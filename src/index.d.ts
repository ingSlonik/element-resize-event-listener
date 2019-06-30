declare type Size = { width: number, height: number };

declare type Handler = (element: HTMLDivElement, size: Size) => void;

declare type Interval = number | "animationFrame";

export declare const addResizeEventListener: (element: HTMLDivElement, handler: Handler, sendActualSize?: boolean) => void;

export declare const removeResizeEventListener: (element: HTMLDivElement, handler: Handler) => void;

export declare const removeAllResizeEventListeners: (element: HTMLDivElement) => void;

export declare const setCheckInterval: (customInterval: Interval) => void;
