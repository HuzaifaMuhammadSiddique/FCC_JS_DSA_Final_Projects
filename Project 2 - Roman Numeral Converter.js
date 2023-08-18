// PROBLEM
/*
Convert the given number into a roman numeral.
Roman numerals	Arabic numerals
M -	1000
CM - 900
D - 500
CD - 400
C -	100
XC - 90
L - 50
XL - 40
X	- 10
IX - 9
V	- 5
IV - 4
I - 1
All roman numerals answers should be provided in upper-case.
*/


// SOLUTION
function convertToRoman(num) {
  let result = [];
  while(num > 0){
    if(num >= 1000){
      result.push("M");
      num = num - 1000;
    } else if(num >= 900 && num < 1000){
      result.push("CM");
      num = num - 900;
    } else if(num >= 500 && num < 900){
      result.push("D");
      num = num - 500;
    } else if(num >= 400 && num < 500){
      result.push("CD");
      num = num - 400;
    } else if(num >= 100 && num < 400){
      result.push("C");
      num = num - 100;
    } else if(num >= 90 && num <100){
      result.push("XC");
      num = num - 90;
    } else if(num >= 50 && num < 90){
      result.push("L");
      num = num - 50;
    } else if(num >= 40 && num < 50){
      result.push("XL");
      num = num - 40;
    } else if(num >= 10 && num < 40){
      result.push("X");
      num = num - 10;
    } else if(num >= 9 && num < 10){
      result.push("IX");
      num = num - 9;
    } else if(num >= 5 && num < 9){
      result.push("V");
      num = num - 5;
    } else if(num >= 4 && num < 5){
      result.push("IV");
      num = num - 4;
    } else if(num >= 1 && num < 4){
      result.push("I");
      num = num - 1;
    }
  }
 return result.join("");
}


// TESTS
console.log(convertToRoman(2));
console.log(convertToRoman(3));
console.log(convertToRoman(4));
console.log(convertToRoman(5));
console.log(convertToRoman(9));
console.log(convertToRoman(12));
console.log(convertToRoman(16));
console.log(convertToRoman(29));
console.log(convertToRoman(44));
console.log(convertToRoman(68));
console.log(convertToRoman(83));
console.log(convertToRoman(97));
console.log(convertToRoman(99));
console.log(convertToRoman(400));
console.log(convertToRoman(500));
console.log(convertToRoman(501));
console.log(convertToRoman(649));
console.log(convertToRoman(798));
console.log(convertToRoman(891));
console.log(convertToRoman(1000));
console.log(convertToRoman(1004));
console.log(convertToRoman(1006));
console.log(convertToRoman(1023));
console.log(convertToRoman(2014));
console.log(convertToRoman(3999));
