// PROBLEM
/*
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
In a shift cipher the meanings of the letters are shifted by some set amount.
A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.
Write a function which takes a ROT13 encoded string as input and returns a decoded string.
All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/

// SOLUTION
function rot13(str) {
  let letters = [  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S' , 'T',  'U', 'V', 'W', 'X', 'Y', 'Z']
  let transformedStr = ""
  for(let letter of str){
    if(letters.includes(letter)){
      let newIndex = letters.indexOf(letter) + 13;
      if(newIndex >= 26){
        newIndex = newIndex - 26
      }
      transformedStr = transformedStr.concat(letters  [newIndex])
      } else{
        transformedStr = transformedStr.concat(letter);
      }
  }
  return transformedStr;
}

// TESTS
console.log(rot13("SERR PBQR PNZC"));
console.log(rot13("SERR CVMMN!"));
console.log(rot13("SERR YBIR?"));
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));
