import URLProxy from "./urlproxy.js"

class Crawler {
  constructor(url, name, query_url) {
    this.website_url = url;
    this.website_name = name;
    this.query_url = query_url;
  }

  getProductsFromHTML(html) {
    console.log("Something went wrong ma friend"); // ok friend
  }

  async search(query) {
    let get_url = encodeURIComponent(this.query_url + query);
    let res = await URLProxy.get(get_url);
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(res, 'text/html');
    return this.getProductsFromHTML(htmlDoc);
  }

  getName() {
    return this.website_name;
  }

  getURL() {
    return this.website_url;
  }

  resolveURL(url) {
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return this.website_url + url.substring(1);
    if (url.startsWith('/')) return this.website_url + url;
    else return this.website_url + "/" + url;
  };

  resolvePrice(priceStr) {
	priceStr = priceStr.trim();
    priceStr = priceStr.replace("₫", "");
    priceStr = priceStr.replace(/\./g, "");
    priceStr = priceStr.replace(/,/g, "");
    let price = parseInt(priceStr, 10);
    return price;
  }
};

export default Crawler;
