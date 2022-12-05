var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

const PORT = process.env.PORT

http.createServer(function (req, res) 
  {

	  if (req.url == "/")
	  {

		  let tempString = '<div id="result"></div> <script src="tickerWebApp.js"></script> </body> </html>'

		  file = 'tickerWebAppIdx.html';
		  fs.readFile(file, function(err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
			res.write(tempString);
            res.end();
		  });
	  }
	  else if (req.url.includes("?"))
	  {

		const MongoClient = require('mongodb').MongoClient;
		const connStr = 'mongodb+srv://creidy02:Danny0512!@cluster0.2ygoinn.mongodb.net/myFirstDatabase';

		// const port = process.env.PORT || 5000;

		client = new MongoClient(connStr,{ useUnifiedTopology: true });

		// $("input[type='submit']").click(async function() {

		const testing = async() => {
			try {
				// connect to client + open collection
				await client.connect();
				var dbo = client.db('equities');
				var collection = dbo.collection('equitiesFinal');
				
				// set inital response (if there is not match)
				let toPrint = "<br/>No matches found! Please try again.";


				// get input from URL
				var qobj = url.parse(req.url, true).query;
				// separate parameters
				let params = new URLSearchParams(qobj);
				let userInput = params.get('userInput');
				let choice = params.get('s_or_c');

				// based on radio button choice, choose an output
				if(choice == "symbol"){
				    curs = collection.find({ticker: userInput});
				}
				else {
				    curs = collection.find({company: userInput});
				}
				
				// print each item that matches
				// and empty out the print string if it still contains the no matches message
				await curs.forEach(function(item){
					if(toPrint == "<br/>No matches found! Please try again."){
						toPrint = "";
					}
					toPrint += "<br/>Company Name: " + item.company + "<br/> Symbol: " + item.ticker + "<br/>";
				});

				// change result
				let tempString = '<div id="result">'+ toPrint +'</div> <script src="tickerWebApp.js"></script> </body> </html>'

				// reload page
				file = 'tickerWebAppIdx.html';
				fs.readFile(file, function(err, txt) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(txt);
					res.write(tempString);
					res.end();
				});

			}
			catch(err) {
				console.log("Database error: " + err);
			}
			finally {
				client.close();
			}
		};
		// call function
		testing();
		
	  }
	  else 
	  {

		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }
  

}).listen(PORT);
