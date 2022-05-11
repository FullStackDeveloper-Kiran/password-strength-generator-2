var timeToCrack = ["Instantly", "Seconds", "Minutes", "Hours", "Days", "Years", "Thousands of years", "Millions of years", "Billions of years"];
var complexity = ['Very weak', 'Weak', 'Moderate', 'Decent', 'Strong', 'Very strong'];

var common = ['123456', '123456789', 'qwerty', '12345678', '111111', '1234567890', '1234567', 'password', '123123', '987654321', 'qwertyuiop', 'mynoob', '123321', '666666', '18atcskd2w', '7777777', '1q2w3e4r', '654321', '555555', '3rjs1la7qe', 'google', '1q2w3e4r5t', '123qwe', 'zxcvbnm', '1q2w3e'];

var special = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// password input on change
var score = 0;
document.querySelector('input').addEventListener('input', checkPassword);
function checkPassword() {
  let pwd = document.querySelector('input').value;
  if (pwd.includes(' ')) {
    alert('Your password should not contain any spaces!');
  } else {
    score = 0;
    let scorePart = 100 / document.querySelector('ul').children.length;
    let uppercase = /[A-Z]/.test(pwd);
    let lowercase = /[a-z]/.test(pwd);
    let numbers = /\d/.test(pwd);
    let symbols = special.test(pwd);
    
    if (uppercase) {
      styleList('Uppercase', 'green');
      score += scorePart;
    } else styleList('Uppercase', null);
    if (lowercase) {
      styleList('Lowercase', 'green');
      score += scorePart;
    } else styleList('Lowercase', null);
    if (numbers) {
      styleList('Numbers', 'green');
      score += scorePart;
    } else styleList('Numbers', null);
    if (symbols) {
      styleList('Symbols', 'green');
      score += scorePart;
    } else styleList('Symbols', null);
    
    document.querySelector('ul').querySelector('.length').innerHTML = pwd.length;
    if (pwd.length >= 8) {
      styleList('Length', 'green');
      score += scorePart;
    } else styleList('Length', null);
    
    let passwordComplexity = complexity[0];
    let crackTime = timeToCrack[1];
    if (pwd.length) {
      passwordComplexity = complexity[score / scorePart - 1];
      let complex = Number((pwd.length / 5 + Number((score / scorePart - 5).toFixed())).toFixed()) + 3;
      if (complex < 0) complex = 0;
      crackTime = timeToCrack[complex];
      if (crackTime == undefined) crackTime = timeToCrack[timeToCrack.length - 1];
    }
    
    let commonPwd = false, commonInclude = false;
    for (let i = 0; i < common.length; i++) {
      if (pwd.toLowerCase() === common[i]) commonPwd = true;
      else if (pwd.toLowerCase().includes(common[i])) commonInclude = true;
    }
    let commonElem = document.querySelector('ul').querySelector('.common');
    if (commonPwd) {
      passwordComplexity = complexity[0];
      crackTime = timeToCrack[0];
      commonElem.innerHTML = 'You have one of the 25 most common passwords in the world.';
    } else if (commonInclude) {
      // passwordComplexity = complexity[1];
      // crackTime = timeToCrack[1];
      commonElem.innerHTML = 'Your password includes one of the 25 most common passwords in the world.';
    }
    else commonElem.innerHTML = 'Not common';
    if (pwd.length == 0) commonElem.innerHTML = '';
    if (commonPwd || commonInclude) styleList('Common', 'red');
    else {
      styleList('Common', null);
      if (pwd.length) score += scorePart;
      passwordComplexity = complexity[score / scorePart - 1];
    }
    
    if (pwd.length == 0) {
      passwordComplexity = complexity[0];
      crackTime = timeToCrack[0];
    }
    
    document.querySelector('.score').innerHTML = score.toFixed() + '%';
    document.querySelector('.complexity').innerHTML = passwordComplexity;
    document.querySelector('.crackTime').innerHTML = crackTime;
  }
};

function styleList(content, color) {
  let list = document.querySelector('ul').querySelectorAll('li');
  for (let i = 0; i < list.length; i++) {
    if (list[i].innerHTML.includes(content)) {
      list[i].style.color = color;
      break;
    }
  }
}

// generate a strong password
var pwdLength = 18, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789`!@#$%^&*()_+-=[]{};':\"\\|,.<>/?~";
document.querySelector('button').addEventListener('click', function() {
  let password = '';
  for (let i = 0, n = charset.length; i < pwdLength; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  document.querySelector('input').value = password;
  checkPassword();
});