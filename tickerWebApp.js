const MongoClient = require('mongodb').MongoClient;
const connStr = 'mongodb+srv://creidy02:Danny0512!@cluster0.2ygoinn.mongodb.net/myFirstDatabase';

const userInput = $("input[name='userInput']").val();

$("input[type='button']").click(findTicker());

client =new MongoClient(url,{ useUnifiedTopology: true });
async function findTicker() {
    try {
        await client.connect();
        var dbo = client.db('equities');
        var collection = dbo.collection('equitiesFinal');

        let choice = $("input[name='s_or_c']:checked").val();
        if(choice == "symbol"){
            let search = "ticker: userInput";
        }
        else {
            let search = "company: userInput";
        }

        const curs = coll.find({},search);

        // print a message if no documents were found
        if ((await curs.count()) === 0) {
            console.log("No documents found!");
        }
        //await curs.forEach(console.dir);
        await curs.forEach(function(item){
            console.log(item.title);
        });
    } 
    catch(err) {
        console.log("Database error: " + err);
    }
    finally {
        client.close();
    }
}