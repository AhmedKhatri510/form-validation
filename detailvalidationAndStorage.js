"use strict";

const btnFormSubmit = document.getElementById("btnformsubmit");

const btn = document.querySelector(".button");

const alertFullname = document.querySelector(".alert-fullname");
// const MIN_WORD_LENGTH_FULLNAME = 4;

const domMobProvider = document.querySelector(".mobile-provider");
const domMobProviderLogo = document.querySelector(".mobile-provider-logo");

const inputPhoneNumber = document.getElementById("phone-number");

let phoneNumber;
let firstName;

class FullNameValidation {
  #MIN_WORD_LENGTH_FULLNAME = 4;
  validFullName = false;
  inputFullName = document.querySelector("#fullname");

  constructor() {
    this.inputFullName.addEventListener(
      "keydown",
      this.enforceFormatForAlphabet.bind(this)
    );
    this.inputFullName.addEventListener("keyup", this.checkFullname.bind(this));
  }
  minLength(words) {
    console.log(words);
    //check if the words in fullName are of MIN_WORD_LENGTH_FULLNAME
    for (const word of words) {
      if (word.length < this.#MIN_WORD_LENGTH_FULLNAME) {
        return false;
      }
    }
    return true;
  }

  checkFullname() {
    const fullName = document.querySelector("#fullname").value;

    console.log(fullName);

    //words in fullName
    const words = fullName.split(" ");
    firstName = words[0];
    console.log(words);

    //check the length of words >=2
    if (
      !(
        words.length >= 2 &&
        // this.checkWordsContainOnlyAlphabets(fullName, words) &&
        this.minLength(words)
      )
    ) {
      alertFullname.style.display = "block";
      this.validFullName = false;
    } else {
      alertFullname.style.display = "none";
      this.validFullName = true;
    }
  }

  isAlphabetInput(event) {
    const key = event.keyCode;

    if ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8)
      return true;
    else return false;
  }

  isModifierKey(event) {
    const key = event.keyCode;
    console.log(key);
    return (
      event.shiftKey === true ||
      key === 32 || // space
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
  }

  enforceFormatForAlphabet(event) {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!this.isAlphabetInput(event) && !this.isModifierKey(event)) {
      event.preventDefault();
    }
  }
}

const fullNameValidation = new FullNameValidation();

/////////////////////////////////////////////
//variable to check the phone number

// stateObjCreation();

class PhoneNumberValidation {
  validMobProvider = false;
  storePhoneNumber;
  statesAndUnionTerritory = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra Nagar Haveli and Daman Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  constructor() {
    inputPhoneNumber.addEventListener(
      "keydown",
      this.enforceFormatForNumber.bind(this)
    );
    inputPhoneNumber.addEventListener("keyup", this.formatToPhone.bind(this));
    this.stateObjCreation();
  }

  stateObjCreation() {
    const noOfStateAndTerritory = this.statesAndUnionTerritory.length;
    const permutationOf3Digits = 9 * 10 * 10;

    const noOfDigitsToEachStateAndTerritory =
      permutationOf3Digits / noOfStateAndTerritory;

    let start = 100;
    let end = start + noOfDigitsToEachStateAndTerritory - 1; //124
    for (let i = 0; i < noOfStateAndTerritory; i++) {
      const key = `${start}-${end}`;
      const value = this.statesAndUnionTerritory[i];
      this.statesAndUnionTerritory[i] = { key, value };

      start = end + 1; // 125 150 175
      end = start + noOfDigitsToEachStateAndTerritory - 1; //149 174 199
    }
  }

  /////////////////////////////////////////
  //formating the phone number
  isNumericInput(event) {
    const key = event.keyCode;
    return (
      (key >= 48 && key <= 57) || // Allow number line
      (key >= 96 && key <= 105) // Allow number pad
    );
  }

  isModifierKey(event) {
    const key = event.keyCode;
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
  }

  enforceFormatForNumber(event) {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!this.isNumericInput(event) && !this.isModifierKey(event)) {
      event.preventDefault();
    }
  }

  validateMobProvider(provider, url) {
    this.validMobProvider = true;
    domMobProvider.textContent = provider;
    domMobProviderLogo.style.display = "inline";
    domMobProviderLogo.src = url;
  }

  inValidateMobProvider() {
    this.validMobProvider = false;
    domMobProvider.style.color = "red";
    domMobProvider.textContent = "Invalid No";
  }

  checkMobProvider(mobProvider) {
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
      this.validateMobProvider("Reliance Jio", "./img/jio_logo.png");
    else if (mobProvider >= 801 && mobProvider <= 920)
      this.validateMobProvider("Idea", "./img/Idea_logo.png");
    else if (mobProvider >= 921 && mobProvider <= 999)
      this.validateMobProvider("Vodafone", "./img/Vodafone_Logo.png");
    else this.inValidateMobProvider();
  }

  checkStateandUnionTerritory(states) {
    //when user press delete
    for (const [i, state] of this.statesAndUnionTerritory.entries()) {
      let [low, high] = state.key.split("-");
      low = +low;
      high = +high;
      if (Number(states) >= low && Number(states) <= high) {
        domMobProvider.textContent += `, ${state.value}`;
        return;
      }
    }
  }

  formatToPhone(event) {
    const target = event.target;
    const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
    const mobProvider = +input.substring(0, 3);

    this.checkMobProvider(mobProvider);

    //check if the key is modfier key like delete and the mobProvider length < 3, then accordingly display provider
    if (this.isModifierKey(event) && mobProvider.length < 3) {
      this.checkMobProvider(mobProvider);
      return;
    }

    const states = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (states.split("").length === 3) {
      this.checkStateandUnionTerritory(states);
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
      this.validLast = true;
      phoneNumber = +input;
      this.storePhoneNumber = String(input);
    } else {
      this.validLast = false;
    }
  }
}

///////////////////////////////
const phoneNumberValidation = new PhoneNumberValidation();

const domForm = document.querySelector(".form");

//////////////////////////////////////////////////
//Email validation
let storeEmail;
const validateEmail = function (email) {
  console.log("email", email);
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// const emailObj = new Email();
const inputEmail = document.querySelector("#email");
const domEmailAlert = document.querySelector(".alert-email");
let validEmail = false;

const checkForValidEmail = function () {
  validEmail = validateEmail(inputEmail.value);
  if (!validEmail) {
    validEmail = false;
    domEmailAlert.style.display = "block";
  } else {
    storeEmail = inputEmail.value;
    validEmail = true;
    domEmailAlert.style.display = "none";
  }
};

const detailSubmission = function (e) {
  //prevent reloading the page
  // e.preventDefault();

  //check for valid fullname
  //email validation
  checkForValidEmail();
  //realtime formatting of phone number and validation

  if (
    phoneNumberValidation.validMobProvider &&
    fullNameValidation.validFullName &&
    validEmail
  ) {
    localStorage.setItem("full name", fullNameValidation.inputFullName.value);
    localStorage.setItem("email", storeEmail);
    localStorage.setItem(
      "phone number",
      phoneNumberValidation.storePhoneNumber
    );
    domForm.setAttribute("action", "otpForm.html");
  } else {
    alert("Please enter detail correctly");
  }
};

////////////////////////////////
//event handler

btnFormSubmit.addEventListener("click", detailSubmission);
