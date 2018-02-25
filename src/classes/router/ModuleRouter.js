export default class ModuleRouter {
    static setModuleStatus(moduleId, status) {
        if(Cache.get(App.CACHE.MODULES) != null) {
            const modules = Cache.get(App.CACHE.MODULES);
            modules.find(m => m.id == moduleId).status = status;
        }
        return Api.put("/module/" + moduleId + "/" + status);
    }

    static getModules() {
        if(Cache.get(App.CACHE.MODULES) != null)
            return Promise.resolve(Cache.get(App.CACHE.MODULES));

        return Api.get("/modules").then(modules => {
            Cache.add(App.CACHE.MODULES, modules, 5 * Cache.MINUTE);
            return modules;
        });
    }
}