export default class Api {
    static get(path) {
        return fetch(App.API_ADDRESS + path, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': App.API_APP_TOKEN,
                'X-User-Token': Cache.get(App.CACHE.TOKEN) && Cache.get(App.CACHE.TOKEN).token
            },
            cache: 'no-cache'
        });
    }

    static post(path, body) {
        return fetch(App.API_ADDRESS + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': App.API_APP_TOKEN,
                'X-User-Token': Cache.get(App.CACHE.TOKEN) && Cache.get(App.CACHE.TOKEN).token
            },
            body: JSON.stringify(body),
            cache: 'no-cache'
        });
    }

    static put(path, body) {
        return fetch(App.API_ADDRESS + path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': App.API_APP_TOKEN,
                'X-User-Token': Cache.get(App.CACHE.TOKEN) && Cache.get(App.CACHE.TOKEN).token
            },
            body: JSON.stringify(body),
            cache: 'no-cache'
        });
    }

    static delete(path) {
        return fetch(App.API_ADDRESS + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': App.API_APP_TOKEN,
                'X-User-Token': Cache.get(App.CACHE.TOKEN) && Cache.get(App.CACHE.TOKEN).token
            },
            cache: 'no-cache'
        });
    }
}