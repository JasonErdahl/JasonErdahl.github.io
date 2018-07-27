var mysql = require("mysql");
var inquirer = require("inquirer");
const Tablefy = require("tablefy");
let table = new Tablefy();

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  viewItems()
  // bidAuction();
  
});

function viewItems() {
  console.log("View all available items...\n");
  var rows ='';
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, rows, fields) {
    if (err) throw err;
    // Log all results of the SELECT auctions
    table.draw(rows);
    // var str='';
    // for (var i = 0;i < rows.length; i++) {
    //   str += 
    //   rows[i].item_id + " " + 
    //   rows[i].product_name+ " " + 
    //   rows[i].price+ " " + 
    //   rows[i].stock_quantity+"\n";
    // }
    // console.log("\n" +str);
    bidAuction();
  });
}

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction, [BID] on an auction or [VIEW] item(s)?",
      choices: ["POST", "BID", "VIEW"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else if (answer.postOrBid.toUpperCase() === "BID"){
        bidAuction();
      } else {
        viewItems();
      }
    });
}

function bidAuction() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    console.log('results[0].stock_quantity is: ', results[0].stock_quantity)
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "Which product do you wish to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many do you wish to purchase?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
            console.log("answer.quantity: "+ answer.quantity);
          }
        }

        // determine if bid was high enough
        //console.log(chosenItem.stock_quantity + " : " + parseInt(answer.quantity));
        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.quantity
              },
              {
                item_id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              viewItems();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          viewItems();
        }
      });
  });
}

