const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
let displaytext = "";
let total = 0;
let num1 = "";
let num2 = "";
let op = "";


function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return substract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

function clearDisplay() {
    displaytext = "";
    display.textContent = displaytext
    total = 0;
    num1 = "";
    num2 = "";
    op = "";
}

function isOperator(char) {
    if (char == "+"  || char == "-" || char == "/" || char == "*") {
        return true;
    }
    return false;
}

function evaluateDisplay() {
    for (let i = 0; i < displaytext.length + 1; i++) {
        let char = displaytext.charAt(i);
        console.log(num1, num2, op, char)
        if (isOperator(char) && num2 === "") {
            op = char;
        } else if (num2 === "" & op === "") {
            num1 += char;
        } else if (op !== "" & char.length !== 0 & !isOperator(char) ) {
            num2 += char;
        } else if (op !== "" & num2 !== "" & (char.length === 0 || isOperator(char))) {
            total = Math.round((operate(op, Number(num1), Number(num2)) + Number.EPSILON) * 100) / 100;
            num1 = String(total);
            num2 = "";
            op == "";
            if (isOperator(char)) {
                op = char;
            }
        }
    }
    console.log(total);
    displaytext = String(total);
    display.textContent = displaytext;
    num1 = "";
    num2 = "";
    op = "";
}


numbers.forEach((button) => {
    button.addEventListener("click", () => {
        displaytext += button.textContent;
        display.textContent = displaytext;
    });   
});

operators.forEach((button) => {
    button.addEventListener("click", () => {
        if (!isOperator(displaytext.charAt(displaytext.length - 1)) & displaytext != "" ) {
            displaytext += button.textContent;
            display.textContent = displaytext;
        }
    });   
});

clear.addEventListener("click", clearDisplay);

equals.addEventListener("click", evaluateDisplay);
