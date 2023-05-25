import Crawler from "./crawler.js"
import URLProxy from "./urlproxy.js"

class PhucAnhCrawler extends Crawler {
  constructor() {
    super("https://www.phucanh.vn", "Phúc Anh", "https://www.phucanh.vn/tim?q=");
  }

  getProductsFromHTML(html) {
    let res = [];
    let products = html.getElementsByClassName("p-container");
    for (let i = 0; i < products.length; i++) {
      let res_product = {}
      res_product.image_url = this.resolveURL(products[i].getElementsByClassName("p-img")[0]
        .getElementsByTagName("img")[0].dataset.src);
      res_product.image_url = URLProxy.resolve(res_product.image_url);
      res_product.name = products[i].getElementsByClassName("p-name")[0].innerHTML;
	  let price = products[i].getElementsByClassName("p-price2")
	  if (price.length == 1) res_product.price = price[0];
	  else res_product.price = price[1];
	  res_product.price = this.resolvePrice(res_product.price.childNodes[2].data);
      res_product.details = "";
      res_product.rate = -1;
      res_product.url = this.resolveURL(products[i].getElementsByTagName("a")[0].getAttribute("href"));
	  res_product.shop = this.getName();
      res.push(res_product);
    }
    return res;
  }
};

export default PhucAnhCrawler;
