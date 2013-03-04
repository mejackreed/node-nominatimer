var csv = require('csv');
var express = require('express');
var request = require('request');
var sleep = require('sleep');

// request('http://georgiaenergydata.herokuapp.com/123', function(e, res, body) {
// console.log(body)
// });
var fs = require('fs');
var stream = fs.createWriteStream("my_file.txt");

csv().from.path(__dirname + '/1.csv').transform(function(data) {
	request('http://nominatim.openstreetmap.org/search/' + data[1] + '?format=json', function(e, res, body) {
		var row = [];
		body = JSON.parse(body)
		console.log(body[0]);

		row.push(data[0], data[1])
		if (body[0]) {
			row.push(body[0]['lat'], body[0]['lon'])
		}
		stream.write(row + "\n")
		sleep.sleep(1)
	})
	//
	// value = getLatLng()
	//console.log(lat)
	// data.push('test')
	return data;
}).on('record', function(data, index) {

	console.log('#' + index + ' ' + JSON.stringify(data));

}).on('end', function(count) {
	console.log('Number of lines: ' + count);
}).on('error', function(error) {
	console.log(error.message);
});

function toCSV(data) {
	csv().to.path(__dirname + '/sample.out').transform(function(data) {
		console.log(data)
		return data;
	})
}

/*

 `node samples/sample.js`

 #0 ["2000-01-01","20322051544","1979.0","8.8017226E7","ABC","45"]
 #1 ["2050-11-27","28392898392","1974.0","8.8392926E7","DEF","23"]
 Number of lines: 2

 */
