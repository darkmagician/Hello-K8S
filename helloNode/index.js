const  http = require('http'),os = require('os');

var httpservice;

if(process.env.SERVICES){
	var services = process.env.SERVICES.split(',');
	

	
	httpservice = function (request, response) {
		var result='Hello, I am '+os.hostname()+'. Let me introduce: ';
		function nextService(i){
				if (i < services.length && i<5) {
					var serviceName = services[i];
					http.get('http://'+serviceName, (res) => {
							const statusCode = res.statusCode;
							const contentType = res.headers['content-type'];

							let error;
							if (statusCode !== 200) {
								error = new Error('Request Failed.\n' +
										'Status Code: ${statusCode}');
							}
							if (error) {
								console.log(error.message);
								res.resume();
								nextService(i + 1)
								return;
							}
							result += '\n{ Get Response from ' + serviceName+': ';
							res.setEncoding('utf8');
							res.on('data', (chunk) => result += chunk);
							res.on('end', ()=> {
									result += '}\n';
									nextService(i + 1);
								});
						}).on('error', (e) => {
							console.log('Got error: ${e.message}');
							nextService(i + 1);
						});
			}else{
				response.end(result);
			}
		}
		nextService(0);
	}
	
}else{
	httpservice = function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end('Hello, I am '+os.hostname());
}
}

var server = http.createServer(httpservice);

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});
