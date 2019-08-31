//const mockIndexData = require("./public/mock/data.json");
let mockIndexData;
let axios = require('axios');
axios.get("https://api.myjson.com/bins/19fsaz").then(res => {
  mockIndexData = res.data;
});

module.exports = {
  //...  
  devServer: {
    port: 80,
    before(app) {
      app.get("/api/seller", (req, res) => {
        res.json(mockIndexData.seller);
      });
      app.get("/api/goods", (req, res) => {
        res.json(mockIndexData.goods);
      });
      app.get("/api/ratings", (req, res) => {
        res.json(mockIndexData.ratings);
      });
    }
  }
};