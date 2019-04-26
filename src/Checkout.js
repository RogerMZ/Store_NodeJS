const Checkout = {
  new: function(rules) {
    this.rules = rules;
    this.elements = [];
    return Object.create(Checkout);
  },
  elements: [],
  total: 0,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
  scan: function(code) {
    console.log("add element");
    // Consult catalog
    var found = this.rules.prods.find(function(e) {
      return e.Code === code;
    });
    //console.log(found);
    // exist on list?
    var index = this.elements.findIndex(function(e) {
      return e.Code === code;
    });
    if (index === -1)
      this.elements.push({ Code: found.Code, Price: found.Price, n: 1 });
    else this.elements[index].n += 1;
    // proms and totals
    var acum = 0;
    var proms = this.rules.proms;
    this.elements.forEach(function(e) {
      var prom = proms.find(function(el) {
        return el.Code === e.Code;
      });
      if (prom) {
        switch (prom.type) {
          case "2x1":
            acum +=
              e.Price * (parseInt(e.n / prom.effect) + (e.n % prom.effect));
            break;
          case "discount":
            if (eval(e.n + prom.op)) acum += prom.effect * e.n;
            else acum += e.Price * e.n;
            break;
        }
      } else acum += e.Price * e.n;
    });
    this.total = acum;
  }
};

module.exports = Checkout;
