export class Observer {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify(data) {
    this.listeners.forEach((listener) => listener(data));
  }

  getListenerCount() {
    return this.listeners.length;
  }
}
