function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Divisão por zero não é permitida");
        return null;
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

document.addEventListener("DOMContentLoaded", () => {
    let keys = document.querySelectorAll(".key");
    let screen = document.querySelector(".calculator-screen");
    let values = document.querySelector(".calculator-values");
    let historyContainer = document.querySelector(".history-container");
    let history = document.querySelector(".history");
    let toggleHistoryButton = document.querySelector(".toggle-history");

    let operation;
    let firstValue;
    let secondValue;

    // Carregar histórico do localStorage
    loadHistory();

    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (key.innerHTML === "AC") {
                screen.innerHTML = "";
                values.innerHTML = "";
                firstValue = null;
                secondValue = null;
                operation = null;
            } else if (key.innerHTML === "%") {
                firstValue = Number(screen.innerHTML);
                operation = "%";
                values.innerHTML = `${firstValue.toString()}${operation}`;
                screen.innerHTML = (firstValue / 100).toString();
            } else if (key.querySelector("img")) {
                screen.innerHTML = screen.innerHTML.slice(0, -1);
            } else if (key.innerHTML === "+" || key.innerHTML === "-" || key.innerHTML === "X" || key.innerHTML === "/") {
                if (screen.innerHTML === "") return;
                firstValue = Number(screen.innerHTML);
                operation = key.innerHTML === "X" ? "*" : key.innerHTML;
                values.innerHTML = `${firstValue.toString()} ${key.innerHTML}`;
                screen.innerHTML = "";
            } else if (key.innerHTML === "=") {
                if (firstValue === null || operation === null) {
                    alert("Operação inválida");
                } else {
                    secondValue = Number(screen.innerHTML);
                    let result;
                    switch (operation) {
                        case "+":
                            result = add(firstValue, secondValue);
                            break;
                        case "-":
                            result = subtract(firstValue, secondValue);
                            break;
                        case "*":
                            result = multiply(firstValue, secondValue);
                            break;
                        case "/":
                            result = divide(firstValue, secondValue);
                            if (result === null) return;
                            break;
                    }
                    screen.innerHTML = result.toString();
                    values.innerHTML += ` ${secondValue} = ${result}`;

                    // Salvar no localStorage
                    saveHistory(`${values.innerHTML}`);

                    firstValue = null;
                    secondValue = null;
                    operation = null;
                }
            } else {
                if (screen.innerHTML.includes(".") && key.innerHTML === ".") return;
                if (screen.innerHTML === "0" && key.innerHTML === "0") return;
                screen.innerHTML += key.innerHTML;
            }
        });
    });

    // Toggle para mostrar/ocultar o histórico
    toggleHistoryButton.addEventListener("click", () => {
        historyContainer.classList.toggle("show-history");
    });

    function saveHistory(expression) {
        let historyArray = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
        historyArray.push(expression);
        localStorage.setItem("calculatorHistory", JSON.stringify(historyArray));
        addHistoryItem(expression);
    }

    function loadHistory() {
        let historyArray = JSON.parse(localStorage.getItem("calculatorHistory")) || [];
        historyArray.forEach(expression => {
            addHistoryItem(expression);
        });
    }

    function addHistoryItem(expression) {
        let li = document.createElement("li");
        li.textContent = expression;
        history.appendChild(li);
    }
});
