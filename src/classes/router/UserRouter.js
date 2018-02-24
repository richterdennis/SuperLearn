import UUID from '../UUID.js';

export default class UserRouter {
    static createUser(user) {
        return Api.post("/me", user).then(token => {
            Cache.set(App.CACHE.TOKEN, token, token.expires - Date.now() / 1000);
            return token;
        });
    }

    static getMe() {
        const cachedMe = Cache.get(App.CACHE.USER_ME);
        if(cachedMe) {
            return Promise.resolve(cachedMe);
        }
        
        return Api.get("/me").then(me => {
            Cache.set(App.CACHE.USER_ME, user, 5 * Cache.MINUTE);
            return me;
        });
    }

    static updateUser(changes) {
        return Api.put("/me", changes);
    }

    static loginUser(login) {
        if(!Cache.getLast(App.CACHE.UUID)) {
            Cache.set(App.CACHE.UUID, UUID.randomUUID(), 0);
        }

        login.deviceId = 'web:' + Cache.getLast(App.CACHE.UUID);

        return Api.post("/me/login", login).then(token => {
            Cache.set(App.CACHE.TOKEN, token, token.expires - Date.now() / 1000);
            return token;
        });
    }

    static getUser(userId) {
        return Api.get("/user/" + userId);
    }

    static getWallOfFame() {
        const cachedWallOfFame = Cache.get(App.CACHE.WALL_OF_FAME);
        if(cachedWallOfFame) {
            return Promise.resolve(cachedWallOfFame);
        }

        return Api.get("/user/").then(users => {
            Cache.set(App.CACHE.WALL_OF_FAME, users, 1 * Cache.DAY);
            return users;
        })
    }
}