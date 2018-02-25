export default class TokenRouter {
    
    static testToken(token) {
        return Api.get("/token/test/" + token);
    }

    static updateToken(token) {
        return Api.get("/token/update/" + token).then(token => {
            Cache.add(App.CACHE.TOKEN, token, token.expires - Date.now() / 1000);
            return token;
        });
    }
}