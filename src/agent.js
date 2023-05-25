const API_ROOT = process.env.REACT_APP_API_ROOT;
const agent = async (url, body, method = "GET") => {
	const headers = new Headers();
	// if (body) {
	//   // headers.set("Content-Type", "application/json")
	// }
	const response = await fetch(`${API_ROOT}${url}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});
	let result;
	try {
		result = await response.json();
	} catch (error) {
		result = { errors: { [response.status]: [response.statusText] } };
	}

	if (!response.ok) throw result;
	return result;
};
function serialize(object) {
	const params = [];

	for (const param in object) {
		if (Object.hasOwnProperty.call(object, param) && object[param] != null) {
			params.push(`${param}=${encodeURIComponent(object[param])}`);
		}
	}

	return params.join("&");
}
const requests = {
	get: (url, query = {}) => {
		const isEmptyQuery = query == null || Object.keys(query).length === 0;
		return agent(isEmptyQuery ? url : `${url}?${serialize(query)}`);
	},
	post: (url, body) => agent(url, body, "POST"),
	put: (url, body) => agent(url, body, "PUT"),
};
const ChatBot = {
	sendMessage: (message) => requests.post("/laptop", message),
};
const Laptop = {
	getLaptops: (name) => requests.post("/name", name),
};
export default {
	ChatBot,
	Laptop,
};
