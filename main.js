var fs = require( "fs" );
var https = require( "https" );


var PROJECT_PATH = __dirname + "/";
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

global.CONST = {};
global.CONST.Telegram = {};
global.CONST.Telegram.chat_id = "2104588399"

var option = { 
    headless: false,
    //executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', //Mac
    executablePath : "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", //Window
	userDataDir : "C:/Users/tjrwns/AppData/Local/Google/Chrome/User Data",
	defaultViewport : { width : 1920, height: 1080 },
	args: [
        //'--incognito',
        '--no-sandbox', 
        '--disable-setuid-sandbox'
	] 
};

/*
 *function
 *
 *
 *
 */
var sendTelegram = function( txt, imgUrl ){
     var data = {
        "chat_id": global.CONST.Telegram.chat_id,
        //"photo": "https://ssl.pstatic.net/imgfinance/chart/marketindex/FX_USDKRW.png?t=" + Date.now(),
        "photo": imgUrl + "?t=" + Date.now(),
        "caption" : txt
	}


	var options = {
        host: 'api.telegram.org',
        port: '443',
        path: '/bot5633371729:AAG9SwOCuJ8j9-eT57MKSlfLQfCWTWmohl0/sendPhoto',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
    	},
		data : data
	};

	var post_req = https.request(options, function(res) {
        
        res.setEncoding('utf8');
        
        var data = "";
        res.on('data', function (chunk) {
        	data += chunk;
		});
        
        res.on('end', function (chunk) {
        	console.log(data);
		});
            
	});

	// post the data
	post_req.write(JSON.stringify(data) );
	post_req.end();
}

global.page = null;


(async () => {
	await puppeteer.use(StealthPlugin())
	var browser = await puppeteer.launch( option )

    var startTime = new Date();
    console.log( '[s] - ' + startTime )

    global.page = await browser.newPage()
	await global.page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36");
	await global.page.evaluate("navigator.userAgent");
    await global.page.goto('https://www.instagram.com/bts.bighitofficial/?__a=1&__d=1');
   // await page.waitForTimeout(3000)

    
	
//     	page.waitForSelector('[name="username"]'),
//     	page.waitForSelector('[name="password"]'),
    
    
    

//   // Enter username and password

//   await page.type('[name="username"]', '01068636311');
//   await page.type('[name="password"]', 'tjrwns2482!@');

//   // Submit log in credentials and wait for navigation

//     page.click('[type="submit"]'),
    // page.waitForNavigation({
    //   waitUntil: 'networkidle0',
    // }),
  
  
    
//     await page.waitForTimeout(10000)

//  var button=  await page.$x("//button[contains(., '나중에 하기')]");
// if (button[0]) {
//     await button[0].click();
//     console.log( "click" )
// }
    
    
    //await page.waitForTimeout(10000)

    //await page.waitForNavigation();	// 해당 페이지의 탐색이 완료되면 클릭 이벤트를 실행
    // page.click( "ul.list_nav:nth-child(2) > li.nav_item:nth-child(3) > a" );	// 클릭이벤트를 실행


	// var n = await page.$(".head_info");
	// var txt = await (await n.getProperty('textContent')).jsonValue();
	// var imageUrl = "https://ssl.pstatic.net/imgfinance/chart/marketindex/FX_USDKRW.png";
    
    //await sendTelegram( txt, imageUrl );
    
	// page.on('response',  async (response) => {

	// var url = response.url();
	// if (url.indexOf( "https://ssl.pstatic.net/imgfinance/chart/main/KOSPI.png" ) != -1 ){
	// console.log( await response.url() )
	// var fileNM = PROJECT_PATH + "KOSPI";
	// var buffer =  await response.buffer();
	// fs.writeFileSync(`${fileNM}.png`, buffer, 'base64',{flgs:"w"});
	// }
	// console.log( await response.url() )
	// // console.log( await response.json() );

	// if(url.indexOf( "https://finance.naver.com/item/item_right_ajax.naver?type=recent&code=000000&page=1&pageSize=30" ) != -1 ){
   
	// }
	// //  console.log("response code: ", response.status());
	// //   // do something here
	// });
	// await page.waitForNavigation( )
	// await page.waitForTimeout(2000)

    // await page.evaluate(async function(){

    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', "https://finance.naver.com/item/item_right_ajax.naver?type=recent&code=000000&page=1&pageSize=30");
    //     xhr.onload = () => {
    //       console.log(xhr.response);
    //     };
    //     xhr.send();

    // });
    var data = await global.page.evaluate(() => document.querySelector('*').outerHTML);

    fs.writeFileSync( "test.json",data.replace(`<html><head><meta name="color-scheme" content="light dark"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">`,"")
    .replace( `</pre></body></html>`,"" ),{flag:"w"});
    await global.page.screenshot({ path: PROJECT_PATH + 'testresult.png', fullPage: true })
    //await browser.close()

    await global.page.goto('https://www.instagram.com/blackpinkofficial/')
	await global.page.screenshot({ path: PROJECT_PATH + 'testresult.png', fullPage: true })
	var endTime = new Date();
    console.log( '[e] - ' + endTime )
	global.page.goto("http://naver.com")
})();
//

/*
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('GET', 'https://i.instagram.com/api/v1/users/web_profile_info/?username=bts.bighitofficial');
    xhr.send();

*/