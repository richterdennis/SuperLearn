export default class QuestionRouter {

	static postNewQuestion(question) {
		return Api.post("/question", question);
	}

	static updateQuestion(questionId, changes) {
		return Api.put("/question/" + questionId, changes);
	}

	static deleteQuestion( questionId) {
		return Api.delete("/question/" + questionId);
	}

	static getQuestions() {
        if(Cache.get(App.CACHE.MY_QUESTIONS) != null)
            return Promise.resolve(Cache.get(App.CACHE.MY_QUESTIONS));

        return Api.get("/questions").then(questions => {
            Cache.add(App.CACHE.MY_QUESTIONS, questions, 15 * Cache.MINUTE);
            return questions;
        });
	}

	static updateAnswer(answerId, changes) {
        return Api.put("/answer/" + answerId, changes);
	}

	static postSolution(solution) {
        return Api.post("/solution", solution);
	}

	static updateSolution(solutionId, changes) {
        return Api.put("/solution/" + solutionId, changes);
	}
}