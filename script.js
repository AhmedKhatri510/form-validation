"use strict";

/* // const string = "all your base are belong to you";
const string = "my name is ahmed and my age is 23";
// const regex = /base/;   //check whether regex is there in string
// const regex = /^your/;  //check for starting regex is your in string
const regex = /name is [a-z]+/; //check for ending regex is your in string
//+ is to check one or more
//* is to check zero or more
//{1,4} characters
//[a-zA-Z]+

const isExisting = regex.test(string);
console.log(isExisting); */

/* const string = "my name is ahmed";
const regex = /name is ([a-zA-Z]+)/;
const match = regex.exec(string);

if (match) {
  const name = match[1];
  console.log(name);
} else {
  console.log("no match");
}

console.log(match);
 */

/* const string = "filea.mp3 fileb.mp3 file_02.mp3 test.csv other.txt";
const regex = /(\w+)\.mp3/g;
let match = regex.exec(string);

while (match) {
  const filename = match[1];
  console.log(filename);
  match = regex.exec(string);
}
 */

const statesGlobal = [
  { 111: "Andaman and Nicobar Islands" },
  { 112: "Andhra Pradesh" },
  { 113: "Arunachal Pradesh" },
  { 114: "Assam" },
  { 115: "Bihar" },
  { 116: "Chandigarh" },
  { 117: "Chhattisgarh" },
  { 118: "Dadra and Nagar Haveli" },
  { 119: "Daman and Diu" },
  { 120: "Delhi" },
  { 121: "Goa" },
  { 122: "Gujarat" },
  { 123: "Haryana" },
  { 124: "Himachal Pradesh" },
  { 125: "Jammu" },
  { 126: "Jharkhand" },
  { 127: "Karnataka" },
  { 128: "Kashmir" },
  { 129: "Kerala" },
  { 130: "Ladakh" },
  { 131: "Lakshadweep" },
  { 132: "Madhya Pradesh" },
  { 133: "Maharashtra" },
  { 134: "Manipur" },
  { 135: "Meghalaya" },
  { 136: "Mizoram" },
  { 137: "Nagaland" },
  { 138: "Odisha" },
  { 139: "Puducherry" },
  { 140: "Punjab" },
  { 141: "Rajasthan" },
  { 142: "Sikkim" },
  { 143: "Tamil Nadu" },
  { 144: "Telangana" },
  { 145: "Tripura" },
  { 146: "Uttarakhand" },
  { 147: "Uttar Pradesh" },
  { 148: "West Bengal" },
];

const unionTerritory = [
  { 149: "Andaman and Nicobar Islands" },
  { 150: "Chandigarh" },
  { 151: "Dadra Nagar Haveli and Daman Diu" },
  { 152: "Delhi" },
  { 153: "Jammu and Kashmir" },
  { 154: "Ladakh" },
  { 155: "Lakshadweep" },
  { 156: "Puducherry" },
];

const btnSubmit = document.getElementById("btnsubmit");
const alertFullname = document.querySelector(".alert-fullname");
const MIN_WORD_LENGTH_FULLNAME = 4;
const domMobProvider = document.querySelector(".mobile-provider");
const domMobProviderLogo = document.querySelector(".mobile-provider-logo");

/////////////////////////////////////////////
//variable to check the phone number
let validMobProvider = false;
let validState = false;
let validLast = false;

const minLength = function (words) {
  console.log(words);

  //check if the words in fullName are of MIN_WORD_LENGTH_FULLNAME
  for (const word of words) {
    if (word.length < MIN_WORD_LENGTH_FULLNAME) {
      return false;
    }
  }

  return true;
};

const checkWordsContainOnlyAlphabets = function (fullName, words) {
  const regex = /([a-zA-Z]+)/g; //it will extract alphabets from the words
  let match = regex.exec(fullName); //traverse the fullName
  console.log(words);
  //check if the orginal word contain any character other than alphabets
  for (const word of words) {
    console.log(match);
    if (match && word.length !== match[1].length) return false;
    match = regex.exec(fullName);
  }

  return true;
};

const checkFullname = function () {
  const fullName = document.querySelector("#fullname").value;
  console.log(fullName);

  //words in fullName
  const words = fullName.split(" ");
  console.log(words);

  //check the length of words >=2
  if (
    !(
      words.length >= 2 &&
      checkWordsContainOnlyAlphabets(fullName, words) &&
      minLength(words)
    )
  ) {
    alertFullname.style.display = "block";
  }
};

/////////////////////////////////////////
//formating the phone number
const isNumericInput = (event) => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  console.log(key);
  return (
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

const validateMobProvider = function (provider, url) {
  validMobProvider = true;
  domMobProvider.textContent = provider;
  domMobProviderLogo.style.display = "inline";
  domMobProviderLogo.src = url;
};

const inValidateMobProvider = function () {
  validMobProvider = false;
  domMobProvider.style.color = "red";
  domMobProvider.textContent = "Invalid No";
};

const checkMobProvider = function (mobProvider) {
  //resetting the color of the alert to black
  domMobProvider.style.color = "black";

  //length of mobProvider is less than 3 then hide the logo and text
  if ((mobProvider + "").split("").length < 3) {
    domMobProviderLogo.style.display = "none";
    domMobProvider.textContent = "";
    return;
  }

  //checking whether the entered mobile provide is in following range
  //if not warn the user
  if (mobProvider >= 621 && mobProvider <= 799)
    validateMobProvider("Reliance Jio", "./img/jio_logo.png");
  else if (mobProvider >= 801 && mobProvider <= 920)
    validateMobProvider("Idea", "./img/Idea_logo.png");
  else if (mobProvider >= 921 && mobProvider <= 999)
    validateMobProvider("Vodafone", "./img/Vodafone_Logo.png");
  else inValidateMobProvider();
};

const checkStateandUnionTerritory = function (states) {
  for (const [i, state] of statesGlobal.entries())
    if (Number(Object.keys(state)[0]) === Number(states)) {
      domMobProvider.textContent += `, ${Object.values(state)[0]}`;
      return;
    }

  for (const [i, state] of unionTerritory.entries())
    if (Number(Object.keys(state)[0]) === Number(states)) {
      domMobProvider.textContent += `, ${Object.values(state)[0]}`;
      validState = true;
      break;
    }

  if (!validState) {
    domMobProvider.style.color = "red";
    domMobProvider.textContent += ", Not a valid state";
  }
};

const formatToPhone = (event) => {
  const target = event.target;
  const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
  const mobProvider = +input.substring(0, 3);

  checkMobProvider(mobProvider);

  //check if the key is modfier key like delete and the mobProvider length < 3, then accordingly display provider
  if (isModifierKey(event) && mobProvider.length < 3) {
    checkMobProvider(mobProvider);
    return;
  }

  const states = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (states.split("").length === 3) {
    checkStateandUnionTerritory(states);
  }

  console.log(mobProvider);
  if (input.length > 6) {
    target.value = `(${mobProvider}) - ${states} - ${last}`;
  } else if (input.length > 3) {
    target.value = `(${mobProvider}) - ${states}`;
  } else if (input.length > 0) {
    target.value = `(${mobProvider}`;
  }

  //to check last 4 digit successfully entered
  if (last.split("").length === 4) {
    validLast = true;
  } else {
    validLast = false;
  }
};

const inputElement = document.getElementById("phone-number");
inputElement.addEventListener("keydown", enforceFormat);
inputElement.addEventListener("keyup", formatToPhone);

////////////////////////////////
//event handler
btnSubmit.addEventListener("click", function () {
  //check for valid fullname
  checkFullname();
  //email validation

  //realtime formatting of phone number
  if (!(validMobProvider && validState && validLast)) {
    alert("Please enter detail correctly");
  }
});
