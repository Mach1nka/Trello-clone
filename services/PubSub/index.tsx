interface EventBusType {
  subscribers: Record<string, Listener[]>;
  subscribe: (eventName: PubSubEvents, listener: Listener) => void;
  publish: (eventName: PubSubEvents) => undefined | void;
  unsubscribe: (eventName: PubSubEvents) => void;
}

type Listener = () => void;

export enum PubSubEvents {
  TokenUpdate = 'TokenUpdate',
}

export const EventBus: EventBusType = {
  subscribers: {},
  subscribe(eventName, listener) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [listener];
    }
  },
  publish(eventName) {
    const subscriber = this.subscribers[eventName];
    if (!subscriber || !subscriber.length) {
      return undefined;
    }
    subscriber.forEach((listener: Listener) => listener());
  },
  unsubscribe(eventName) {
    delete this.subscribers[eventName];
  },
};
