const singletonRegistry = new WeakMap<Function, any>();

function Singleton<T extends { new (...args: any[]): {} }>(constructor: T): T {
  const wrappedConstructor: any = function (...args: any[]) {
    if (!singletonRegistry.has(wrappedConstructor)) {
      singletonRegistry.set(wrappedConstructor, new constructor(...args));
    }
    return singletonRegistry.get(wrappedConstructor);
  };

  wrappedConstructor.prototype = constructor.prototype;

  return wrappedConstructor;
}

function getSingletonInstance<T>(constructor: new (...args: any[]) => T): T {
  const instance = singletonRegistry.get(constructor);
  if (!instance) {
    throw new Error(`${constructor.name} has not been instantiated yet.`);
  }
  return instance;
}

export { Singleton, getSingletonInstance };
