import Crawler from "./crawler.js"
import URLProxy from "./urlproxy.js"

class ThinkProCrawler extends Crawler {
  constructor() {
    super("https://thinkpro.vn", "ThinkPro", "https://thinkpro.vn/tim-kiem?keyword=");
  }

  getProductsFromHTML(html) {
    let res = [];
    let products = html.getElementsByClassName("t-product-item");
    for (let i = 0; i < products.length; i++) {
      let res_product = {}
      res_product.image_url = this.resolveURL(products[i].getElementsByClassName("t-product-item__image")[0]
        .getElementsByTagName("img")[0].dataset.src);
      res_product.image_url = URLProxy.resolve(res_product.image_url);
      res_product.name = products[i].getElementsByClassName("t-product-item__title")[0].innerHTML;
	  res_product.price = this.resolvePrice(products[i].getElementsByClassName("t-product-item__price")[0].innerHTML);
      let detailsElem = products[i].getElementsByClassName("t-product-item__specs");
      if (detailsElem.length) res_product.details = detailsElem[0].innerHTML;
      else res_product.details = "";
      res_product.rate = -1;
      res_product.url = this.resolveURL(products[i].getAttribute("href"));
	  res_product.shop = this.getName();
      res.push(res_product);
    }
    return res;
  }
};

export default ThinkProCrawler;
