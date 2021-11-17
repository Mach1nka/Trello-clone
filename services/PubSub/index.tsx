import { channel } from 'diagnostics_channel';

interface EventBusType {
  subscribers: Record<string, any>;
  subscribe: (subsName: string, listener) => void;
  publish: (subsName: string, listener) => undefined | void;
}

export const EventBus: EventBusType = {
  subscribers: {},
  subscribe(subsName: string, listener) {
    if (!this.subscribers[subsName]) {
      this.subscribers[subsName] = [];
    }
    this.subscribers[subsName].push(listener);
  },
  publish(subsName: string, data) {
    const subscriber = this.subscribers[subsName];
    if (!subscriber || !channel.length) {
      return undefined;
    }
    subscriber.forEach((listener) => listener(data));
  },
};
