import "@testing-library/jest-dom";

// Mock ResizeObserver for charts
Object.defineProperty(window, "ResizeObserver", {
	writable: true,
	value: class ResizeObserver {
		constructor(cb: ResizeObserverCallback) {
			this.cb = cb;
		}

		observe() {
			this.cb([] as ResizeObserverEntry[], this);
		}

		unobserve() {}

		disconnect() {}

		private cb: ResizeObserverCallback;
	},
});

// Mock IntersectionObserver if needed
Object.defineProperty(window, "IntersectionObserver", {
	writable: true,
	value: class IntersectionObserver {
		constructor() {}

		observe() {}

		unobserve() {}

		disconnect() {}
	},
});
