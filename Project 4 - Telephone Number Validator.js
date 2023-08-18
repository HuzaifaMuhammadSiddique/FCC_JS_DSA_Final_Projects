// PROBLEM
/*
Return true if the passed string looks like a valid US phone number.
The user may fill out the form field any way they choose as long as it has the format of a valid US number.
The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf.
Your job is to validate or reject the US phone number based on any combination of the formats provided above.
The area code is required.
If the country code is provided, you must confirm that the country code is 1.
Return true if the string is a valid US phone number; otherwise return false.
*/

// SOLUTION (so far)
function telephoneCheck(str) {
  let digits = ['1','2','3','4','5','6','7','8','9','0'];
  let noOfDigits = 0;

  for(let i=0; i<str.length; i++){
    if(digits.includes(str[i])){
      noOfDigits++;
    }
  }
  console.log(noOfDigits);

  if(noOfDigits > 11 || noOfDigits < 10){
    return false
  }
}

// TESTS
console.log(telephoneCheck("555-555-5555"));
console.log(telephoneCheck("1 555-555-5555"));
console.log(telephoneCheck("1 (555) 555-5555"));
console.log(telephoneCheck("5555555555"));
console.log(telephoneCheck("(555)555-5555"));
console.log(telephoneCheck("1(555)555-5555"));
console.log(telephoneCheck("555-5555"));
console.log(telephoneCheck("5555555"));
console.log(telephoneCheck("1 555)555-5555"));
console.log(telephoneCheck("1 555 555 5555"));
console.log(telephoneCheck("1 456 789 4444"));
console.log(telephoneCheck("123**&!!asdf#"));
console.log(telephoneCheck("55555555"));
console.log(telephoneCheck("(6054756961)"));
console.log(telephoneCheck("2 (757) 622-7382"));
console.log(telephoneCheck("0 (757) 622-7382"));
console.log(telephoneCheck("-1 (757) 622-7382"));
console.log(telephoneCheck("2 757 622-7382"));
console.log(telephoneCheck("10 (757) 622-7382"));
console.log(telephoneCheck("27576227382"));
console.log(telephoneCheck("(275)76227382"));
console.log(telephoneCheck("2(757)6227382") );
console.log(telephoneCheck("2(757)622-7382"));
console.log(telephoneCheck("555)-555-5555"));
console.log(telephoneCheck("555)-555-5555"));
console.log(telephoneCheck("(555)5(55?)-5555"));
console.log(telephoneCheck("55 55-55-555-5"));
console.log(telephoneCheck("11 555-555-5555"));
