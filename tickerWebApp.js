const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb+srv://creidy02:Danny0512!@cluster0.2ygoinn.mongodb.net/myFirstDatabase';

client = new MongoClient(url,{ useUnifiedTopology: true });

$("input[type='button']").click(async function() {
    try {
        // connect to client + open collection
        await client.connect();
        var dbo = client.db('equities');
        var collection = dbo.collection('equitiesFinal');
        // get input
        const userInput = $("input[name='userInput']").val();
        // get radio button choice
        let choice = $("input[name='s_or_c']:checked").val();
        // based on choice, choose an output
        if(choice == "symbol"){
            let search = "ticker: " + userInput;
        }
        else {
            let search = "company: " + userInput;
        }

        // search for specified result
        const curs = coll.find({},search);

        // print a message if no documents were found
        if ((await curs.count()) === 0) {
            $("#result").html("No matches found! Try again.");
        }
        //print each item that matches;
        await curs.forEach(function(item){
            $("#result").html("Company Name: " + item.company + "</br> Symbol: " + item.ticker);
        });
    }
    catch(err) {
        console.log("Database error: " + err);
    }
    finally {
        client.close();
    }
});
