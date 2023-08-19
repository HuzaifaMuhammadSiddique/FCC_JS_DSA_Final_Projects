// PROBLEM
/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
cid is a 2D array listing available currency.
The checkCashRegister() function should always return an object with a status key and a change key.
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/

// SOLUTION (so far)
var denom = [
	{ name: 'ONE HUNDRED', val: 100},
	{ name: 'TWENTY', val: 20},
	{ name: 'TEN', val: 10},
	{ name: 'FIVE', val: 5},
	{ name: 'ONE', val: 1},
	{ name: 'QUARTER', val: 0.25},
	{ name: 'DIME', val: 0.1},
	{ name: 'NICKEL', val: 0.05},
	{ name: 'PENNY', val: 0.01}
];

function checkCashRegister(price, cash, cid) {
 var output = {status: null, change: []};
 var change = cash - price;
 var register = cid.reduce(function(acc, curr) {
 acc.total += curr[1];
 acc[curr[0]] = curr[1];
 return acc;
 }, {total: 0});
 if(register.total === change) {
 output.status = 'CLOSED';
 output.change = cid;
 return output;
 }
 if(register.total < change) {
 output.status = 'INSUFFICIENT_FUNDS';
 return output;
 }
 var change_arr = denom.reduce(function(acc, curr) {
 var value = 0;
 while(register[curr.name] > 0 && change >= curr.val) {
 change -= curr.val;
 register[curr.name] -= curr.val;
 value += curr.val;
 change = Math.round(change * 100) / 100;
 } 
 if(value > 0) {
 acc.push([ curr.name, value ]);
 }
 return acc;
 }, []);
 if(change_arr.length < 1 || change > 0) {
 output.status = 'INSUFFICIENT_FUNDS';
 return output;
 }
 output.status = 'OPEN';
 output.change = change_arr;
 return output;
}


// ANOTHER SOLUTION
function checkCashRegister(price, cash, cid) {
  const cidCopy = JSON.parse(JSON.stringify(cid)); // JSON limitation might be slow, but for some reason even the faster solutions, like .slice(0) and the other ones, might not work without affecting the original array
  const revCid = cidCopy.reverse();

  const currencyVal = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01
  }

  // sum up what we have in cash-in-drawer
  const cidSum = cid.reduce((acc, val) => {
    if(!isNaN(acc + val[1])) {
      return acc + val[1];
    }
  }, 0);

  // convert units in order to work aroung floating point number limitations
  function convertDollarToCent(val) {
    if(!Array.isArray(val) && typeof val === "object") {
      const currencyValCopy = {...val};

      for(let dollar in currencyValCopy) {
        currencyValCopy[dollar] *= 100;
      }
      return currencyValCopy;
    }
    if(Array.isArray(val)) {
      const currencyValCopy = [...val];

      currencyValCopy.forEach(dollar => {
        return dollar[1] *= 100;
      });
      return currencyValCopy;
    }
    else {
      return val * 100;
    }
  }
  const centPrice = convertDollarToCent(price);
  const centCash = convertDollarToCent(cash);
  const centUnit = convertDollarToCent(currencyVal);
  const centRevCid = convertDollarToCent(revCid);
  const centCidSum = convertDollarToCent(cidSum);
  let change = centCash - centPrice;

  let changeObj = {}

  function calculateChange() {
    for(let unit in centUnit) { // loop through each Currency Unit
      centRevCid.forEach(amount => {  // loop through each amount
        if(amount[1] >= centUnit[unit] && amount[0] === unit) { // check what I have in cash-in-drawer
          while(change - centUnit[unit] >= 0 && amount[1]) {
            // calculate the change and convert it into an object
            if(Object.keys(changeObj).length === 0 && changeObj.constructor === Object) {
              changeObj[unit] = centUnit[unit];
            } else {
              if(changeObj.hasOwnProperty(unit)) {
                changeObj[unit] += centUnit[unit];
              }
              if(!changeObj.hasOwnProperty(unit)) {
                changeObj[unit] = centUnit[unit];
              }
            }

            change -= centUnit[unit];
            amount[1] -= centUnit[unit];
          }
        }
      });
    }

    let changeArr = Object.entries(changeObj); // convert changeObj into an Array
    // convert the change-unit back from Cent into Dollar
    changeArr.forEach(cent => {
      return cent[1] /= 100;
    });

    return changeArr;
  }

  let sumChangeArr = calculateChange()
    .reduce((acc, val) => {
      if(!isNaN(acc + val[1])) {
        return acc + val[1] * 100;
      }
    }, 0);

  if(change < 0 || centCidSum - change < 0 || change > sumChangeArr) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if(centCidSum === sumChangeArr) {
    return {status: "CLOSED", change: cid};
  } else {
    return {status: "OPEN", change: calculateChange()};
  }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
// TESTS
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
