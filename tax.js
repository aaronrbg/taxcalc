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
      // console.log(salesData[i]);
      var coName = salesData[i].name;

      if (results[coName]) {
        // let currTotalSales = results[coName];
        results[coName].totalSales += calculateTotalSales(i, salesData);
        results[coName].totalTaxes += calculateTotalTax(i, salesData, taxRates);
      } else {
        results[coName] = {
          totalSales: calculateTotalSales(i, salesData),
          totalTaxes: calculateTotalTax(i, salesData, taxRates)
        };
      }
      //console.log(salesData[i].name);
  }


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

  return results;
}

// function calculateSalesTax(salesData, taxRates) {

//   var results = {};

//   for (var i = 0; i < salesData.length; i++) {
//       // console.log(salesData[i]);

//       results[salesData[i].name] = {
//         totalSales: calculateTotalSales(i, salesData),
//         totalTaxes: calculateTotalTax(i, salesData, taxRates)
//       };
//       //console.log(salesData[i].name);
//   }


//   /* Expected Results:
// {
//           Telus: {
//             totalSales: 1300
//             totalTaxes: 144
//           },
//           Bombardier: {
//             totalSales: 800,
//             totalTaxes: 40
//           }
//         }
// */

//   return results;
// }



function calculateTotalSales(companyIndex, salesData) {
  var array = salesData[companyIndex].sales;
  var totalSales = array.reduce((x, y) => x + y);
  return totalSales;
}


function calculateTotalTax(companyIndex, salesData, taxRates) {
  var totalTax;
  for (var p in salesTaxRates) {
    // console.log(typeof(p));
    if (salesData[companyIndex].province == p) {
      totalTax = calculateTotalSales(companyIndex, salesData) * salesTaxRates[p];
    }
  }
  // console.log(totalTax);
  return totalTax;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);

console.log(results);

