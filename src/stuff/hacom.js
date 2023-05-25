import Crawler from "./crawler.js"
import URLProxy from "./urlproxy.js"

class HacomCrawler extends Crawler {
  constructor() {
    super("https://hacom.vn", "HACOM", "https://hacom.vn/tim?q=");
  }

  getProductsFromHTML(html) {
    let res = [];
    let products = html.getElementsByClassName("p-component");
    for (let i = 0; i < products.length; i++) {
      let res_product = {}
      res_product.image_url = this.resolveURL(products[i].getElementsByClassName("p-img")[0]
        .getElementsByTagName("img")[0].dataset.src);
      res_product.image_url = URLProxy.resolve(res_product.image_url);
      res_product.name = products[i].getElementsByClassName("p-name")[0].getElementsByTagName("a")[0].innerHTML;
	  res_product.price = this.resolvePrice(products[i].getElementsByClassName("p-price")[0].dataset.price);
      res_product.details = "";
      res_product.rate = -1;
      res_product.url = this.resolveURL(products[i].getElementsByClassName("p-name")[0].getElementsByTagName("a")[0].getAttribute("href"));
	  res_product.shop = this.getName();
      res.push(res_product);
    }
    return res;
  }
};

export default HacomCrawler;
