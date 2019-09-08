var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: '',
	database: 'bamazon'
});

function showInventory() {
	products = 'SELECT * FROM products';

	connection.query(products, function(err, data) {
		if (err) throw err;

		console.log('Current Inventory: ');
		console.log('...................\n');

		var inventory = '';
		for (var i = 0; i < data.length; i++) {
			// inventory = '';
			// inventory += 'Item ID: ' + data[i].item_id + '  //  ';
			// inventory += 'Product Name: ' + data[i].product_name + '  //  ';
			// inventory += 'Department: ' + data[i].department_name + '  //  ';
			// inventory += 'Price: $' + data[i].price + '\n';

			inventory = '' + 'Item ID: ' + data[i].item_id + '  //  Product Name: ' + data[i].product_name + '  //  Department: ' + data[i].department_name + '  //  Price: $' + data[i].price + '\n';

			console.log(inventory);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	userOrder();
	});
};

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a valid Item ID.';
	};
};

function userOrder() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID for the product you would like to purchase:',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to buy?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var products = 'SELECT * FROM products WHERE ?';

		connection.query(products, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				showInventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('The product you requested is in stock! Placing order now...');

					var updateProducts = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateProducts, function(err, data) {
						if (err) throw err;
						var total = productData.price * quantity;
						var t = total.toFixed(2);
						console.log('Your order has been placed! Your total is: $' + t + ".");
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					});
				} else {
					console.log('Insufficient quantity!');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					showInventory();
				}
			}
		});
	});
};

showInventory();