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
  //For more information on Cheerio visit https://github.com/cheeriojs/cheerio
  const cf = require('cloudscraper');
  //For more information on cloudscraper visit https://github.com/codemanki/cloudscraper
  
	//Sample way to get url parameters
    var GETParameter = req.query.GETParameter;
 
	//NOTE: This only works with Cloudflare protected sites, the Lukes Toolkit blog is not protected with Cloudflare
	cf.get("https://lukestoolkit.blogspot.com")
	  .then(function(response) {
		
		var $$ = cheerio.load(response);
		
		var data = $$("#PageElementID");
			
		//Examples on how to get data from the page
		var rows = data.find("table > tr").length; //returns number of tr elements
		var title = data.find("h1").text(); //returns text content of h1 tag
		
		
		res.status(200).send(response);
		
	  })
	  .catch(function (err) {
		res.status(200).send(err);
	});
  
	//Alternative usage - Ability to specify more options
	var options = {
	  uri: 'https://website.com/',
	  formData: { field1: 'value', field2: 2 }
	};

	cf.post(options).then(console.log).catch(console.error);
  
  
};
