//Log in
let form = document.getElementById("pasaLoadForm");
let loginContainer = document.getElementById("loginContainer");
let addAmount = document.getElementById("addAmountContainer");
let registerContainer = document.getElementById("registerContainer");
let modal1 = new bootstrap.Modal(document.getElementById("addAmountContainer"));

let amountAvailable = 0;
let userMobileNo;
let amountToSend;
let randNum;
let counter = 0;

let invoice = [];
showForm();
// ============== test ===============
// let user = [];
// {
//   mobileNum,
//   Amount,
//   history,
// }

// ============== Events ===============
document.getElementById("resendOTP").addEventListener("click", () => {
  randNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  console.log(randNum);
});

document.getElementById("otpBtn").addEventListener("click", () => {
  let otpSection = document.getElementById("block1");
  let addAmountSection = document.getElementById("block2");
  let otpInput = document.getElementById("otpValidation");

  if (randNum == otpInput.value) {
    otpSection.style.display = "none";
    addAmountSection.style.display = "block";
  } else {
    alert("Wrong otp");
    document.getElementById("otpValidation").value = "";
  }
});

document.getElementById("loginBtn").addEventListener("click", () => {
  userMobileNo = document.getElementById("loginMobileNo").value;
  //console.log(userMobileNo.length);
  let isTrue = validateMobileNumberInput(userMobileNo, userMobileNo.length);

  document.getElementById("loginMobileNo").value = "";
  if (isTrue != false) {
    counter = 1;
    formProcess();
  }

  // for(elements of user){
  //   if(elements === user.userMobileNumber){
  //     document.getElementById("loginMobileNo").value = "";
  //     counter = 1;
  //     formProcess();
  //   }
  // }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("addLoad").addEventListener("click", function () {
  showAmount(); // Opens or closes the modal
});

document.getElementById("submitBtn").addEventListener("click", () => {
  let mobileToSend = document.getElementById("mobileNumToSend").value;
  amountToSend = document.getElementById("amountToSend").value;

  let isTrue = validateMobileNumberInput(mobileToSend, mobileToSend.length);

  if (isTrue != false) {
    pasaloadProcess(amountToSend);
  }
});

document.getElementById("closeBtn").addEventListener("click", () => {
  modal1.hide();
});

document.getElementById("submitAddBtn").addEventListener("click", () => {
  modal1.hide();

  let amountAdded = document.getElementById("amountToAdd").value;
  document.getElementById("amountToAdd").value = "";
  amountAvailable = Number(amountAvailable) + Number(amountAdded);

  let addHistory = Number(amountAdded) + " amount was added";
  invoice.push(addHistory);
  formProcess();
});

// document.getElementById("signUp").addEventListener("click", () => {
//   showSignUp(true);
// })

// document.getElementById("signUpBtn").addEventListener("click", () => {
//   let registerUser = document.getElementById("registerMobileNo").value;

//   let isTrue= validateMobileNumberInput(registerUser, registerUser.length);

//   if(isTrue != false){
//     user = {
//       userMobileNumber: registerUser,
//       loadBalance: 0,
//       invoice: []
//     }

//     showSignUp(false);
//   }
// })

// ============== Functions ===============

function formProcess() {
  showForm();
  // console.log(number)
  document.getElementById("mobileNumber").innerHTML = userMobileNo;
  document.getElementById("amountAvailable").innerHTML = amountAvailable;

  printHistory();
}

function pasaloadProcess(amount) {
  if (amountAvailable < amount) {
    insufficientBalance();
  } else {
    amountAvailable = Number(amountAvailable) - Number(amount);
    let addHistory = Number(amount) + " amount was deducted";
    invoice.push(addHistory);
    document.getElementById("amountAvailable").innerHTML = amountAvailable;

    document.getElementById("mobileNumToSend").value = "";
    document.getElementById("amountToSend").value = "";
    printHistory();
  }
}

function insufficientBalance() {
  alert("Insufficient Load Amount");
  showAmount();
}

// function showSignUp(check) {
//   if(check){
//     registerContainer.style.display ="block";
//     loginContainer.style.display = "none";
//   }else{
//     registerContainer.style.display ="none";
//     loginContainer.style.display = "block";
//   }

// }

function showForm() {
  if (counter == "1") {
    form.style.display = "block";
    loginContainer.style.display = "none";
    addAmount.style.display = "none";
  } else {
    form.style.display = "none";
    // registerContainer.style.display ="none";
  }
}

function showAmount() {
  let addAmountSection = document.getElementById("block2");
  randNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  console.log(randNum);

  modal1.show();
  addAmountSection.style.display = "none";
}

function validateMobileNumberInput(mobileNo, length) {
  if (mobileNo == "" || length != "11") {
    alert("Mobile Number must be filled out and it should be 11 digits");
    return false;
  }
}

function printHistory() {
  const ulTag = document.getElementById("historyList");
  const newDiv = document.createElement("div");

  for (let elements of invoice) {
    newDiv.innerHTML = elements;
    ulTag.appendChild(newDiv);
  }
}
