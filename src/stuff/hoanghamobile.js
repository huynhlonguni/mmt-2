import Crawler from "./crawler.js"
import URLProxy from "./urlproxy.js"

class HoangHaMobileCrawler extends Crawler {
  constructor() {
    super("https://hoanghamobile.com", "Hoàng Hà Mobile", "https://hoanghamobile.com/tim-kiem?kwd=");
  }

  getProductsFromHTML(html) {
    let res = [];
    let products = html.getElementsByClassName("lts-product")[0].getElementsByClassName("item");
    for (let i = 0; i < products.length; i++) {
      let res_product = {}
      res_product.image_url = this.resolveURL(products[i].getElementsByClassName("img")[0]
        .getElementsByTagName("img")[0].src);
      res_product.image_url = URLProxy.resolve(res_product.image_url);
      res_product.name = products[i].getElementsByClassName("title")[0].innerHTML;
	  res_product.price = this.resolvePrice(products[i].getElementsByClassName("price")[0].getElementsByTagName("strong")[0].innerHTML);
      res_product.details = "";
      res_product.rate = -1;
      res_product.url = this.resolveURL(products[i].getElementsByClassName("title")[0].getAttribute("href"));
	  res_product.shop = this.getName();
      res.push(res_product);
    }
    return res;
  }
};

export default HoangHaMobileCrawler;
