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
  let rp = require('request-promise').defaults({jar: true});
  var cheerio = require('cheerio'); // Basically jQuery for node.js
  //For more information on Cheerio visit https://github.com/cheeriojs/cheerio
  var tough = require('tough-cookie'); //Dont know that this is required but included for good measure
  
  
    var GETURLParam = req.query.GETURLParam;
 
	  let ReqOptions = {
		method: 'GET',
		uri: "https://lukestoolkit.blogspot.com",
		port: 443,
		resolveWithFullResponse: true
		/* Example options can be used for API requests with authentication headers
		headers: {
			'Content-Type': 'application/json',
			'sign': sign,
			'key': key
		}
		
		Example Options for posting data to a page with form data
		form: {
			// Like <input type="text" name="name">
			username: '',
			password: '',
			csrf: csrf
		}
		*/
		
	   };

	  rp(ReqOptions)
	  .then(function (response) {
		  
		//Example on Getting Response headers and setting cookies in request-promise
		//This is useful for web requests that require authentication
		var setcookies = response.headers["set-cookie"]; //If response headers are JSON and if website returns a set-cookie object
		var dt = Date.now();

		//setcookies.forEach(function(cookie) {
		//  rp.jar().setCookie(cookie, 'https://domain.com', {expires: dt });  
		//});
				
		//
		var $$ = cheerio.load(response.body);
		
		var data = $$(".blog-name > a").attr('src');
		res.status(200).send(response.body);
		//Examples on how to get data from the page
		//var rows = data.find("table > tr").length; //returns number of tr elements
		//var title = data.find("h1").text(); //returns text content of h1 tag
	  
	  }) 
	  .catch(function (err) {
		// Crawling failed...
		res.status(200).send(err);
	  });  						  

  
};
