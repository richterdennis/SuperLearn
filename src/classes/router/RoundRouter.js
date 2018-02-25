export default class RoundRouter {
    static getRoundByModule(moduleId) {
		return Api.get("/round/module/" + moduleId);
	}

	static setRoundFinish(roundId, questions) {
		return Api.put("/round/" + roundId + "/finish");
	}
}