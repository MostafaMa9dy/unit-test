import { Observer } from "../observer";

describe("Observer", () => {
  test("calls listener when notify is called", () => {
    const observer = new Observer();
    const listener = jest.fn();

    observer.subscribe(listener);
    observer.notify(42);

    expect(listener).toHaveBeenCalledWith(42);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("calls multiple listeners", () => {
    const observer = new Observer();
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    observer.subscribe(listener1);
    observer.subscribe(listener2);
    observer.notify("hello");

    expect(listener1).toHaveBeenCalledWith("hello");
    expect(listener2).toHaveBeenCalledWith("hello");
  });

  test("does not call unsubscribed listener", () => {
    const observer = new Observer();
    const listener = jest.fn();

    observer.subscribe(listener);
    observer.unsubscribe(listener);
    observer.notify(10);

    expect(listener).not.toHaveBeenCalled();
  });

  test("tracks listener count correctly", () => {
    const observer = new Observer();
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    expect(observer.getListenerCount()).toBe(0);

    observer.subscribe(listener1);
    observer.subscribe(listener2);
    expect(observer.getListenerCount()).toBe(2);

    observer.unsubscribe(listener1);
    expect(observer.getListenerCount()).toBe(1);
  });

  test("does nothing when notify is called with no listeners", () => {
    const observer = new Observer();
    expect(() => observer.notify(5)).not.toThrow();
  });
});
