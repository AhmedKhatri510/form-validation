"use strict";

const domValidationSuccessful = document.querySelector(
  ".validation-successful"
);
const btn = document.querySelector(".button");
const btnOtpSubmit = document.getElementById("btnotpsubmit");
const domOtp = document.getElementById("otp");

//////////////////////////
//setting up otp form
///////////////////////////////////////////////////////////////////////////
//otp generation and validation
const domOtpValidationForm = document.querySelector(".otp-validation-form");

const domMessage = document.querySelector(".message");
const domAttemptAlert = document.querySelector(".attempt-alert");

////////////////////////
//otp form validation

class Otp {
  firstName = localStorage.getItem("full name").split(" ")[0];
  phoneNumber = localStorage.getItem("phone number");
  otpGeneratedNumber;
  otp = document.getElementById("otp");

  constructor() {
    //generateOtp
    this.generateOtp();

    //display message
    this.displayMessage();

    //display otp
    this.displayOtp(this.otpGeneratedNumber);
  }

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

  resetOtpForm() {
    //reset form
    domOtp.value = "";
    domMessage.textContent = "";
    this.generateOtp();
    this.displayMessage();
    this.displayOtp(this.otpGeneratedNumber);
  }

  replaceOtpForm() {
    domOtp.style.display = "none";
    domMessage.style.display = "none";
    btn.style.display = "none";
    domOtpValidationForm.style.display = "none";
  }

  fourDigitNumber = function () {
    return (
      (Math.floor(Math.random() * 9) + 1) * 10 ** 3 +
      Math.floor(Math.random() * 10) * 10 ** 2 +
      Math.floor(Math.random() * 10) * 10 ** 1 +
      Math.floor(Math.random() * 10) * 10 ** 0
    );
  };

  generateOtp = function () {
    //generate otp
    this.otpGeneratedNumber = +this.fourDigitNumber();
  };

  displayOtp(otpNo) {
    domMessage.textContent += `, OTP:${otpNo}`;
  }

  displayMessage() {
    domMessage.textContent = `Dear ${this.firstName},
     Thank you for your inquiry. A 4 digit verification number has been sent to your phone number:
     ${this.phoneNumber}, please enter in the following box and submit for confirmation`;
  }
}

const ootp = new Otp();
//won't allow any alphabet and symbols, only allow number and modifier keys
ootp.otp.addEventListener("keydown", ootp.enforceFormatForNumber.bind(ootp));

// No of attempts
let attempt = 3;

btnOtpSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  if (ootp.otpGeneratedNumber === +domOtp.value) {
    //if otp match then display validation successful
    domValidationSuccessful.style.display = "block";
    //replace the otp form with a valid successful message
    ootp.replaceOtpForm();

    //wait for 5 sec before redirecting to pixel6 website
    setTimeout(() => {
      location.assign("https://pixel6.co/");
    }, 5000);
  } else {
    //guard clause
    // console.log("hello", Number(domOtp.value));
    if (domOtp.value.length !== 4 && typeof domOtp.value !== "number") return;

    //decrease the attempt if otp not match
    attempt--;

    //if attempt left is 0, then redirect to 404 error page on pixel6 website
    if (attempt === 0) location.assign("https://pixel6.co/404.html");
    // domOtpValidationForm.setAttribute("action", "https://pixel6.co/404.html");
    else {
      //reset the otp form
      ootp.resetOtpForm();

      //alert the user about the attempts
      domAttemptAlert.textContent = `Incorrect OTP please reenter, you have only ${attempt} attempt now`;
    }
  }
});
