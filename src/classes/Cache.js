export class CacheEntry {

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

export const MINUTE = 60;
export const HOUR = 60 * 60;
export const DAY = 60 * 60 * 24;

export default class Cache {
	static get(key) {
        const cacheEntry = JSON.parse(localStorage.getItem(key));

        if(!cacheEntry)
            return null;

        return new CacheEntry(cacheEntry).getValue();
    }

	static getLast(key) {
        const cacheEntry = JSON.parse(localStorage.getItem(key));

        if(!cacheEntry)
            return null;

        return new CacheEntry(cacheEntry).getLastValue();
    }

	static set(key, value, lifetime) {
        const cacheEntry = new CacheEntry(lifetime, value);
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    }

	static remove(key) {
        localStorage.removeItem(key);
    }

	static clear() {
        localStorage.clear();
    }
}