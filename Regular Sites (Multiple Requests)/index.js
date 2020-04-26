/**
 * 
 * Templates developed for nodejs, designed for use with Google Cloud Functions
 * Webscraping template provided by lukestoolkit.blogspot.com
 *
 * LukesToolkit Blog: https://lukestoolkit.blogspot.com
 * Template files avaliable at: https://github.com/lukegackle
 *
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
  exports.helloWorld = (req, res) => {
  
  var cheerio = require('cheerio'); // Basically jQuery for node.js
  let rp = require('request-promise').defaults({jar: true});
  //For more information on Cheerio visit https://github.com/cheeriojs/cheerio
  
  var StocksString = "AIZ,COL,AGL,ANZ"; // OR req.query.[GET Parameter]
  var stocks = StocksString.split(",");
  var StockData = "";
  

  var promises = [];

  let getData = function(ticker) {
  return new Promise(function(resolve, reject){
    let options = {
      hostname: 'au.finance.yahoo.com',
      url: 'https://au.finance.yahoo.com/quote/' + ticker+".AX",
      port: 443,
      path: '/quote/' + ticker + ".AX",
      method: 'GET'
    };
	 
	 
        rp.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                var $$ = cheerio.load(body);
				//Not possible to resolve multiple params, just like functions only return one value, can possibly use arrays depending on your usecase.
                resolve($$("h1[data-reactid=7]").text());
            }
        });
    
	});
    
};

for(let i = 0; i < stocks.length; i++){
  promises.push(getData(stocks[i]));
}


Promise.all(promises).then(function(result){
  for(let i = 0; i < promises.length; i++){
    let rate = result[i];
    rate = rate.replaceAll(',', '');
    rate = rate.replaceAll('\n', '');
    rate = rate.replaceAll('\r', '');
    StockData = StockData + rate + "\n";
  }
    //console.log("" + StockData); 
	res.status(200).send(StockData);
});
  
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
  
  };
