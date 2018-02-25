export default class VoteRouter {
	static setQuestionVote(value, questionId) {
		return Api.put("/vote/" + value + "/question/" + questionId);
	}

	static setUserVote(value, userId) {
		return Api.put("/vote/" + value + "/user/" + userId);
	}
}