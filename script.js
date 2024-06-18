function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os elementos com a classe "key"
    let keys = document.querySelectorAll(".key");
    let screen = document.querySelector(".calculator-screen");
    let values = document.querySelector(".calculator-values");

    let operation;
    let firstValue;
    let secondValue;

    // Adiciona um listener de clique a cada elemento selecionado
    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (key.innerHTML === "AC") {
                screen.innerHTML = "";
                values.innerHTML = "";
                firstValue = null;
                secondValue = null;
                operation = null;
            }
            else if (key.innerHTML === "%") {
                firstValue = Number(screen.innerHTML);
                operation = "%";
                values.innerHTML = `${firstValue.toString()}${operation}`;
                screen.innerHTML = (Number(screen.innerHTML) / 100).toString();
            }
            else if (key.querySelector("img")) {
                let newValue = screen.innerHTML;
                screen.innerHTML = newValue.slice(0, -1);
            }
            else if (key.innerHTML === "+" || key.innerHTML === "-" || key.innerHTML === "X" || key.innerHTML === "/") {
                firstValue = Number(screen.innerHTML);
                operation = key.innerHTML;
                values.innerHTML = `${firstValue.toString()} ${operation}`;
                screen.innerHTML = "";
            }
            else if (key.innerHTML === "=") {
                if (firstValue === null || operation === null) {
                    alert("Operação inválida");
                } else {
                    secondValue = Number(screen.innerHTML);
                    switch (operation) {
                        case "+":
                            screen.innerHTML = add(firstValue, secondValue).toString();
                            values.innerHTML += ` ${secondValue}`;
                            break;
                        case "-":
                            screen.innerHTML = subtract(firstValue, secondValue).toString();
                            values.innerHTML += ` ${secondValue}`;
                            break;
                        case "X":
                            screen.innerHTML = multiply(firstValue, secondValue).toString();
                            values.innerHTML += ` ${secondValue}`;
                            break;
                        case "/":
                            screen.innerHTML = divide(firstValue, secondValue).toString();
                            values.innerHTML += ` ${secondValue}`;
                            break;
                    }
                    firstValue = null;
                    secondValue = null;
                    operation = null;
                }
            }
            else {
                screen.innerHTML += key.innerHTML;
            }
        });
    });
});
