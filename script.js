let currentNum = num1 = num2 = oper = '';
let equalClicked = false;
const display = document.querySelector("#display");

/* Number buttons */
const valueButtons = document.querySelectorAll(".value");
valueButtons.forEach((item) => {
    item.addEventListener("click", () => {
        inputValue(item)
    });
});

/* Clear button */
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    currentNum = num1 = num2 = oper = '';
    equalClicked = false;
    display.textContent = 0;
});

/* Operator buttons */
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((item) => {
    item.addEventListener("click", () => {
        if (num1 !== '' && !equalClicked) evaluate();
        else if (num1 === '') num1 = currentNum;

        oper = item.textContent;
        currentNum = '';
        equalClicked = false;
    });
});

/* Equal button */
const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    if (num1 !== '') {
        evaluate();
        equalClicked = true;
    }
});

/* Decimal button */
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    if (!currentNum.includes('.')) {
        inputValue(decimal);
    };
});

/* Backspace button */
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => {
    if (currentNum !== '' && !equalClicked) {
        tempArr = currentNum.split('');
        tempArr.splice(-1);
        currentNum = tempArr.join('');

        if (currentNum === '') display.textContent = 0;
        else display.textContent = fitToDisplay(currentNum);
    }
});

/* Plus/minus button */
const plusMinus = document.querySelector(".plus-minus");
plusMinus.addEventListener("click", () => {
    if (equalClicked) {
        currentNum = num1 = num2 = oper = '';
        equalClicked = false;
    }
    if (currentNum[0] !== '-') {
        currentNum = '-' + currentNum;
    } else {
        currentNum = currentNum.slice(1);
    }
    display.textContent = fitToDisplay(currentNum);
});

/* Keyboard support */


/* Functions */
function inputValue(item) {
    if (equalClicked) {
        currentNum = num1 = num2 = oper = '';
        equalClicked = false;
    }
    currentNum += item.textContent;
    display.textContent = fitToDisplay(currentNum);
};

function evaluate() {
    num2 = currentNum;
    num1 = operate(Number(num1), Number(num2), oper);
    display.textContent = fitToDisplay(num1);
};

function fitToDisplay(num) {
    let tempStr = '';
    if (num.toString().includes('e')) {
        tempStr = num.toLocaleString('fullwide', {useGrouping:false});
    } else {
        tempStr = num.toString();
    }

    if ((tempStr.length <= 9) || (tempStr.split('.')[0].length < 8)) {
        return tempStr.slice(0, 9);
    } 
    else {
        tempStr = parseFloat(num).toExponential();
        return parseFloat(num).toExponential(5 - tempStr.split('+')[1].length);
    }
}

function displayError() {
    display.textContent = 'ERROR';
};

function operate(a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '%':
            return remainder(a, b);
    };
};

/* Basic math functions */
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function remainder(a, b) {
    return a % b;
};
