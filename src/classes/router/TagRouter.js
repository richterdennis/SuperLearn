export default class TagRouter {
	static createTag(tag) {
		return Api.post("/tag", tag);
	}

	static getTags(search) {
		return Api.get("/tags?search=" + search);
	}
}