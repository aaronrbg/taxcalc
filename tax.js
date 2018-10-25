var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]   //700            //index 0
  },
  {
    name: "Bombardier",                         //index 1
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]   //800 Tax 40
  },
  {
    name: "Telus",                              //index 2
    province: "SK",
    sales: [ 500, 100 ]       //600
  }
];

function calculateSalesTax(salesData, taxRates) {

  var results = {};

  for (var i = 0; i < salesData.length; i++) {
      var coName = salesData[i].name;
      var coObject = results[coName];
      var sales = calculateTotalSales(i, salesData);
      var tax = calculateTotalTax(i, salesData, taxRates);

      if (coObject) {
        results[coName].totalSales += sales;
        results[coName].totalTaxes += tax;
      } else {
        results[coName] = {
          totalSales: sales,
          totalTaxes: tax
        };
      }
  }
  return results;
}


function calculateTotalSales(companyIndex, salesData) {
  var array = salesData[companyIndex].sales;
  var totalSales = array.reduce((x, y) => x + y);
  return totalSales;
}

function calculateTotalTax(companyIndex, salesData, taxRates) {
  var totalTax;
  for (var p in salesTaxRates) {
    if (salesData[companyIndex].province == p) {
      totalTax = calculateTotalSales(companyIndex, salesData) * salesTaxRates[p];
    }
  }
  return totalTax;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);

console.log(results);

  /* Expected Results:
{
          Telus: {
            totalSales: 1300
            totalTaxes: 144
          },
          Bombardier: {
            totalSales: 800,
            totalTaxes: 40
          }
        }
*/

