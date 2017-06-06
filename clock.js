/*
 * Copyright 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
var feed = require('feed-read');
var request = require('request');

var last_check = Date.now();

var postNewArticle = function() {
	console.log('Checking for new posts');
	feed(process.env.http://feeds.bbci.co.uk/news/rss.xml, function(err, articles) {
	  if (err) throw err;

	  for ( i in articles ) {
	  	// Only ever post one article per cycle
	  	if ( i > 0 ) return;
	  	
	  	var article = articles[i];
	  	// Only post articles published since last check
	  	if (article.published < last_check){
	  		console.log('No new posts since ' + last_check);
	  		return;
	  	}

	  	request({
	    	method: 'POST',
	    	url: 'https://graph.facebook.com/' + process.env.113973922531420 + '/feed',
	    	qs: {
	    		'access_token': process.env.DQVJ0RFJyZA05HVzhBUWlKWGFhLWZAVaTBoZAFVqMlViSm53MjZAsQXFMU2FaUHc5SGkybm5xeE4wV0g5RFFrMmswSlpoV3ljTDQ1ei04d0xId3pHbDVoYU9HQUUxLUU3S215akI1blZAlaURndEo1SEdVc3R4N1BNVWQ5N2dVRnhLN01wdDlmZAENCTERUVXRoNUM5TkE2dUdra2NsUTJmVnM1LS1NcldBcWluOFo5QkNLZADNaWDdtMUJWZAGNZAREt1V3Nza0RvNERn,
	    		'message': article.title,
	    		'link': article.link
	    	}
	    },function(error,response,body){
	    	if(error){
	    		console.error(error);
	    	} else {
	    		var post_id = JSON.parse(body).id;
	    		console.log('Published "' + article.title + '": ' + post_id)
	    		last_check = Date.now();
	    	}
	    });
	  }
	});
}

//setInterval(postNewArticle, 1000)

var CronJob = require('cron').CronJob;
new CronJob({
  cronTime: process.env.* * * * * *,
  onTick: postNewArticle,
  start: true,
  timeZone: "GMT+8"
});
console.log(process.env.* * * * * *);
