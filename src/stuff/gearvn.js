import Crawler from "./crawler.js"
import URLProxy from "./urlproxy.js"

class GearVNCrawler extends Crawler {
  constructor() {
    super("https://gearvn.com", "GearVN", "https://gearvn.com/search?type=product&q=filter=((title:product adjacent ");
  }

  async search(query) {
    let get_url = encodeURIComponent(this.query_url + query + "))");
    let res = await URLProxy.get(get_url);
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(res, 'text/html');
    return this.getProductsFromHTML(htmlDoc);
  }

  getProductsFromHTML(html) {
    let res = [];
    let products = html.getElementsByClassName("product-row");
    for (let i = 0; i < products.length; i++) {
        let res_product = {}
        res_product.image_url = this.resolveURL(products[i].getElementsByClassName("product-row-thumbnail")[0].src);
        res_product.name = products[i].getElementsByClassName("product-row-name")[0].innerHTML;
        res_product.price = this.resolvePrice(products[i].getElementsByClassName("product-row-sale")[0].innerHTML);
        res_product.details = "";
        res_product.rate = -1;
        res_product.url = this.resolveURL(products[i].getElementsByTagName("a")[0].getAttribute("href"));
	    res_product.shop = this.getName();
	    res.push(res_product);
    }
    return res;
  }
};

export default GearVNCrawler;
