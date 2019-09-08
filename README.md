#bamazon

## Overview

Bamazon is an Amazon-like CLI app that uses Node.js and MySQL to show customers items that are available for purchase, take their order, and then deplete stock from the store's inventory.

### Built With

* [Inquirer.js](https://www.npmjs.com/package/inquirer)

* [mysql](https://www.npmjs.com/package/mysql)

### Deployment

1. Clone repo
2. Run the contents from `schema.sql` and `seeds.sql` in a program like MySQLWorkbench to create the database that will act as the inventory system.
3. Run `npm install`
4. Run `node bamazonCustomer.js`
5. Follow the prompts in your terminal to select and product and quanity to finish placing your order

### Examples

1. Succesful Order

    * If there is enough stock of the requested product to complete the order then it will be processed. The customer will be provided with a total cost of their order and the number of requested items will be deducted from the available inventory.

    ![succesful-order](https://i.imgur.com/mvFwHT5.png)

2. Unsuccesful Orders

    * If the user inputs an Item ID that does not exist, they will be prompted to put in a valid Item ID instead.

    ![unsuccesful-order1](https://i.imgur.com/K28wVXP.png)

    * If the user tries to order a certain quanity of a product but there's not enough stock in the inventory to succesfully complete the order, the app will let them know there's insufficient quantity of that item to place their order and they'll be asked to modify their order. They'll then be shown the inventory of all available items again and asked to try placing their order again.

    ![unsuccesful-order2](https://i.imgur.com/vrMZpkb.png)


    

