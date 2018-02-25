export default class ReportRouter {
	static createReport(report) {
		return Api.post("/report", report);
	}

	static getReports() {
        if (Cache.get(App.CACHE.REPORTS) != null)
            return Promise.resolve(Cache.get(App.CACHE.MODULES));
        
		return Api.get("/reports").then(reports => {
            Cache.add(App.CACHE.REPORTS, reports, 15 * Cache.MINUTE);
            return reports;
        });
	}

	static setReport(reportId) {
		return Api.put("/report/" + reportId + "/processed");
	}
}