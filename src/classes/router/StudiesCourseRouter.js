export default class StudiesCourseRouter {
    static getStudiesCourses() {
        const cachedStudiesCourses = Cache.get(App.CACHE.STUDIES_COURSES);
        if(cachedStudiesCourses) {
            return Promise.resolve(cachedStudiesCourses);
        }

        return Api.get('/studiesCourses').then(courses => {
            Cache.add(App.CACHE.STUDIES_COURSES, courses, Cache.HOUR);
            return courses;
        })
    }
}