export default class Api {
    static _fetch(method, path, body = null) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': App.API_APP_TOKEN,
                'X-User-Token': Cache.get(App.CACHE.TOKEN) && Cache.get(App.CACHE.TOKEN).token
            },
            cache: 'no-cache'
        };

        if(body) {
            options.body = JSON.stringify(body);
        }

        return fetch(App.API_ADDRESS + path, options).then(res => {
            if (!res.status.toString().startsWith('2')) {
                throw res;
            }

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }
            else {
                return res.text();
            }
        });
    }
    
    static get(path) {
        return Api._fetch('GET', path);
    }

    static post(path, body) {
        return Api._fetch('POST', path, body);
    }

    static put(path, body) {
        return Api._fetch('PUT', path, body);
    }

    static delete(path) {
        return Api._fetch('DELETE', path);
    }
}