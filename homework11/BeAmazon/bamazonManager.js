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
  start();
  
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "View [PRODUCTS] for Sale, View [LOW] Inventory, [ADD] to Inventory, Add [NEW] Product?",
      choices: ["PRODUCTS", "LOW", "ADD", "NEW"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "PRODUCTS") {
        console.log('viewProducts');
        viewProducts();
      }
      else if (answer.postOrBid.toUpperCase() === "LOW"){
        console.log('lowInventory');
        lowInventory();
      }
      else if (answer.postOrBid.toUpperCase() === "ADD"){
        console.log('addInventory');
        addInventory();
      }
      else if (answer.postOrBid.toUpperCase() === "NEW"){
        console.log('addProduct');
        addProduct();
      }
    });
}

function viewProducts() {
  console.log("Products for Sale...\n");
  var rows ='';
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, rows, fields) {
    if (err) throw err;
    // Log all results of the SELECT auctions
    var str='';
    for (var i = 0;i < rows.length; i++) {
      str += 
      rows[i].item_id + " " + 
      rows[i].product_name+ " " + 
      rows[i].price+ " " + 
      rows[i].stock_quantity+"\n";
    }
    console.log("\n" +str);

    start();
  });
}

function lowInventory() {
  console.log("Low Inventory Products...\n");
  var rows ='';
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, rows, fields) {
    if (err) throw err;
    // Log all results of the SELECT auctions
    var str='';
    var rowsLength = rows.length;

    if (rowsLength != 0) {
        for (var i = 0;i < rowsLength; i++) {
            str += 
            rows[i].item_id + " " + 
            rows[i].product_name+ " " + 
            rows[i].price+ " " + 
            rows[i].stock_quantity+"\n";
        }
        console.log("\n" +str);
    } else {
        console.log("\nThere are currently no low inventory products!\n\n");
    }

    start();
  });
}

function addInventory() {
  // query the database for adding items to inventory
  connection.query("SELECT * FROM products", function(err, results) {
    //console.log('results[0].stock_quantity is: ', results[0].stock_quantity)
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
          message: "Which product do you wish to add Inventory?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How much inventory to you wish to add?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
            //console.log("answer.quantity: "+ answer.quantity);
          }
        }

        // calculate new value of inventory
        var newItemNum = ( (parseInt(chosenItem.stock_quantity)) + (parseInt(answer.quantity)) );
        //console.log("Item Test " +chosenItem.stock_quantity + " : " + answer.quantity);
        //console.log("newItemNum: "+ newItemNum);
        //console.log("chosenItem.item_id: "+ chosenItem.item_id);

        connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
            stock_quantity: newItemNum
            },
            {
            item_id: chosenItem.item_id
            }
        ],
        function(error) {
            if (error) throw err;
            console.log("\n Update was successful! New inventory value is "+newItemNum+"\n\n");
            start();
        }
        );
    });
  });
}

// function to handle adding to products
function addProduct() {
  // prompt for info to add item
  // Related TABLE ROWS: product_name, department_name, price, stock_quantity
  inquirer
    .prompt([
      {
        name: "addProduct_Inventory",
        type: "input",
        message: "What item would you like to add to inventory?",
        validate: function(value) {
          if (value != '') {
            return true;
          }
          return false;
        }
      },
      {
        name: "addProduct_Department",
        type: "input",
        message: "What department does the item belong in?",
        validate: function(value) {
          if (value != '') {
            return true;
          }
          return false;
        }
      },
      {
        name: "addProduct_Price",
        type: "input",
        message: "What is the price of the item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "addProduct_Quantity",
        type: "input",
        message: "How many item will be in the inventory?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          // product_name, department_name, price, stock_quantity
          product_name: answer.addProduct_Inventory,
          department_name: answer.addProduct_Department,
          price: answer.addProduct_Price,
          stock_quantity: answer.addProduct_Quantity
        },
        function(err) {
          if (err) throw err;
          console.log("\nYour product was created successfully!\n\n");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}


