class URLProxy {
	static proxy = process.env.REACT_APP_PROXY;
	constructor() {}
	static async get(url) {
		let get_url = this.proxy + encodeURI(url);
		let web = await fetch(get_url);
		return web.text();
	}

	static resolve(url) {
		return this.proxy + encodeURI(url);
	}
}

export default URLProxy;
