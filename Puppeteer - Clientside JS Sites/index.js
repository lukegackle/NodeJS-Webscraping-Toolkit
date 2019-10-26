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
  
	//For more information on Puppeteer visit https://developers.google.com/web/tools/puppeteer
	const puppeteer = require('puppeteer');    
    
    (async () => {
      const browser = await puppeteer.launch({args: ['--no-sandbox']})
      const page = await browser.newPage()
      await page.setViewport({ width: 1280, height: 1800 })
      await page.setDefaultTimeout(0) //Wait Maximum amount of time for page to load
      await page.setDefaultNavigationTimeout(0) //Wait Maximum amount of time for page to load
      await page.goto("https://lukestoolkit.blogspot.com", {waitUntil: 'load', timeout: 0})
      await page.waitForFunction('document.querySelector("span#SPANID").innerText.includes("Content")') //Wait for an element to contain particular text
      await page.waitFor(1000) //Wait for 1000
	  var mentions = await page.$eval("span#SPANID", node => node.textContent); //Get text content of element
      
      
      //Further usage examples from Puppeteer docs
      //const checkboxStatus = await page.$eval('#defaultCheck1', input => { return input.checked })
      //console.log('Checkbox checked status:', checkboxStatus)

      //const radios = await page.$$eval('input[name="exampleRadios"]', inputs => { return inputs.map(input => input.value) })
      //console.log('Radio values:', radios)

      //await page.goto('https://lukestoolkit.blogspot.com')

      //const selectOptions = await page.$$eval('.bd-example > select.custom-select.custom-select-lg.mb-3 > option', options => { return options.map(option => option.value ) })
	  
	  //await page.screenshot({path: 'example.png'});
	  
	  //await page.pdf({path: 'hn.pdf', format: 'A4'});


      await browser.close() //Close the browser when finished
    })()
  
};
