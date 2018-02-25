export const MINUTE = 60;
export const HOUR = 60 * 60;
export const DAY = 60 * 60 * 24;

const STORAGE_KEY = 'SUPERLEARN';
const memoryStorage = {};

export function load() {
    const storage = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );

    for(const key in storage) {
        if(!storage[key]) {
            continue;
        }
        memoryStorage[key] = new CacheEntry(storage[key]);
    }
}

export function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryStorage));
}

export function get(key) {
    const cacheEntry = memoryStorage[key];

    if (!cacheEntry)
        return null;

    return cacheEntry.getValue();
}

export function getLast(key) {
    const cacheEntry = memoryStorage[key];

    if (!cacheEntry)
        return null;

    return cacheEntry.getLastValue();
}

export function add(key, value, lifetime) {
    const cacheEntry = new CacheEntry(lifetime, value);
    memoryStorage[key] = cacheEntry;
}

export function remove(key) {
    memoryStorage[key] = null;
}

export function clear() {
    for(const key in memoryStorage) {
        memoryStorage[key] = null;
    }
}

class CacheEntry {

    _constructor1(cacheEntry) {
        this.deathTime = cacheEntry.deathTime;
        this.value = cacheEntry.value;
    }

    _constructor2(lifetime, value) {
        this.deathTime = Date.now() / 1000 + lifetime;
        this.value = value;
    }

    constructor(...args) {
        const _constructor = '_constructor' + args.length;
        this[_constructor](...args);
    }

    getValue() {
        if (this.deathTime < Date.now() / 1000)
            return null;

        return this.value;
    }

    getLastValue() {
        return this.value;
    }
}
