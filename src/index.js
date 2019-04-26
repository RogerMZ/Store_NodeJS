var http = require("http");
var Checkout = require("./Checkout");

var pricing_rules = require("./store_rules.json");

//create a server object:
http
  .createServer(function(req, res) {
    var transactions = [];
    var price;
    // Test tansactions
    var co = Checkout.new(pricing_rules);
    co.scan("VOUCHER");
    co.scan("TSHIRT");
    co.scan("MUG");
    price = co.total;
    console.log("Total: $ " + price);
    transactions.push({ trans: co.elements, tot: price });
    co = Checkout.new(pricing_rules);
    co.scan("VOUCHER");
    co.scan("VOUCHER");
    co.scan("TSHIRT");
    price = co.total;
    console.log("Total: $ " + price);
    transactions.push({ trans: co.elements, tot: price });
    co = Checkout.new(pricing_rules);
    co.scan("TSHIRT");
    co.scan("TSHIRT");
    co.scan("TSHIRT");
    co.scan("VOUCHER");
    co.scan("TSHIRT");
    price = co.total;
    console.log("Total: $ " + price);
    transactions.push({ trans: co.elements, tot: price });
    co = Checkout.new(pricing_rules);
    co.scan("VOUCHER");
    co.scan("TSHIRT");
    co.scan("VOUCHER");
    co.scan("VOUCHER");
    co.scan("MUG");
    co.scan("TSHIRT");
    co.scan("TSHIRT");
    price = co.total;
    console.log("Total: $ " + price);
    transactions.push({ trans: co.elements, tot: price });
    res.write(
      `<pre id="json">${JSON.stringify(transactions, undefined, 2)}</pre>`
    ); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
