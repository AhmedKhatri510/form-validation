"use strict";

const btnFormSubmit = document.getElementById("btnformsubmit");
const btnOtpSubmit = document.getElementById("btnotpsubmit");
const domOtp = document.getElementById("otp");

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

class PhoneNumberValidation {
  validMobProvider = false;
  validState = false;
  validLast = false;
  statesGlobal = [
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

  unionTerritory = [
    { 149: "Andaman and Nicobar Islands" },
    { 150: "Chandigarh" },
    { 151: "Dadra Nagar Haveli and Daman Diu" },
    { 152: "Delhi" },
    { 153: "Jammu and Kashmir" },
    { 154: "Ladakh" },
    { 155: "Lakshadweep" },
    { 156: "Puducherry" },
  ];

  constructor() {
    inputPhoneNumber.addEventListener(
      "keydown",
      this.enforceFormatForNumber.bind(this)
    );
    inputPhoneNumber.addEventListener("keyup", this.formatToPhone.bind(this));
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
    this.validState = false;

    for (const [i, state] of this.statesGlobal.entries()) {
      if (Number(Object.keys(state)[0]) === Number(states)) {
        domMobProvider.textContent += `, ${Object.values(state)[0]}`;
        this.validState = true;
        return;
      }
    }

    for (const [i, state] of this.unionTerritory.entries())
      if (Number(Object.keys(state)[0]) === Number(states)) {
        domMobProvider.textContent += `, ${Object.values(state)[0]}`;
        this.validState = true;
        break;
      }

    if (!this.validState) {
      domMobProvider.style.color = "red";
      domMobProvider.textContent += ", Not a valid state";
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
    } else {
      this.validLast = false;
    }
  }
}

///////////////////////////////
const phoneNumberValidation = new PhoneNumberValidation();

const domOtpValidationForm = document.querySelector(".otp-validation-form");
const domForm = document.querySelector(".form");

/////////////////////////////////////////////////////
//otp generation and validation
let otpGeneratedNumber;
const fourDigitNumber = function () {
  return (
    (Math.floor(Math.random() * 9) + 1) * 10 ** 3 +
    Math.floor(Math.random() * 10) * 10 ** 2 +
    Math.floor(Math.random() * 10) * 10 ** 1 +
    Math.floor(Math.random() * 10) * 10 ** 0
  );
};

const generateOtp = function () {
  //generate otp
  otpGeneratedNumber = +fourDigitNumber();
};

const domMessage = document.querySelector(".message");
const domAttemptAlert = document.querySelector(".attempt-alert");

const displayOtp = function (otpNo) {
  domMessage.textContent += `, OTP:${otpNo}`;
};

const displayMessage = function () {
  domMessage.textContent = `Dear ${firstName},
   Thank you for your inquiry. A 4 digit verification number has been sent to your phone number:
   ${phoneNumber}, please enter in the following box and submit for confirmation`;
};

const detailSubmission = function (e) {
  //prevent reloading the page
  e.preventDefault();
  //check for valid fullname
  //email validation
  //realtime formatting of phone number and validation

  if (
    phoneNumberValidation.validMobProvider &&
    phoneNumberValidation.validState &&
    phoneNumberValidation.validLast &&
    fullNameValidation.validFullName
  ) {
    domForm.style.display = "none";
    domOtpValidationForm.style.display = "grid";

    //generateOtp
    generateOtp();

    //display message
    displayMessage();

    displayOtp(otpGeneratedNumber);
    console.log(otpGeneratedNumber);
  } else {
    alert("Please enter detail correctly");
  }
};

const resetOtpForm = function () {
  //reset form
  domOtp.value = "";
  domMessage.textContent = "";
  generateOtp();
  displayMessage();
  displayOtp(otpGeneratedNumber);
};
////////////////////////////////
//event handler

btnFormSubmit.addEventListener("click", detailSubmission);

let attempt = 4;
btnOtpSubmit.addEventListener("click", function (e) {
  attempt--;
  console.log(otpGeneratedNumber, otp.value);
  if (otpGeneratedNumber === +domOtp.value) {
    domOtpValidationForm.setAttribute("action", "https://pixel6.co/");
  } else {
    if (attempt === 0)
      domOtpValidationForm.setAttribute("action", "https://pixel6.co/404.html");
    else {
      resetOtpForm();
      domAttemptAlert.textContent = `you have only ${attempt} attempt now`;
    }
  }
});
