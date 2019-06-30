// @flow

type Size = { width: number, height: number };

export type Handler = (element: HTMLElement, size: Size) => void;

type Listener = { 
    element: HTMLElement, 
    size: Size,
    handler: Handler,
};

export type Interval = number | "animationFrame";

// Magic constant
let interval: Interval = 250;

let listeners: Array<Listener> = [];
let timer: null | TimeoutID = null;

function checkSizes() {
    listeners.forEach(listener => {
        const { element, size, handler } = listener;
        const { width, height } = getSize(element);

        // Some browsers has each measurement different.
        if (Math.abs(width - size.width) > 1 || Math.abs(height - size.height) > 1) {
            listener.size = { width, height };
            handler(element, { width, height });
        }
    });

    if (listeners.length > 0) {
        if (interval === "animationFrame") {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(checkSizes);
            } else {
                timer = setTimeout(checkSizes, 66);
            }
        } else {
            timer = setTimeout(checkSizes, interval);
        }
    } else {
        window.removeEventListener("resize", resizeEvent, false);
    }
}

function resizeEvent() {
    if (timer) {
        clearTimeout(timer);
    }

    checkSizes();
}

function getSize(element: HTMLElement): Size {
    const { width, height } = element.getBoundingClientRect();
    return { width, height };
}

// Exported Listener functions

export function addResizeEventListener(element: HTMLElement, handler: Handler, sendActualSize: boolean = false) {
    const size = sendActualSize ? { width: 0, height: 0 } : getSize(element);

    listeners.push({
        element,
        size,
        handler,
    });

    if (listeners.length === 1) {
        window.addEventListener("resize", resizeEvent, false);
        checkSizes();
    }
}

export function removeResizeEventListener(element: HTMLElement, handler: Handler) {
    listeners = listeners.filter(listener => element !== listener.element && handler !== listener.handler);
}

export function removeAllResizeEventListeners(element: HTMLElement) {
    listeners = listeners.filter(listener => element !== listener.element);
}

export function setCheckInterval(customInterval: Interval) {
    interval = customInterval;
}

export default {
    addEventListener: addResizeEventListener,
    removeEventListener: removeResizeEventListener,
    removeAllEventListeners: removeAllResizeEventListeners,
    setCheckInterval,
};
