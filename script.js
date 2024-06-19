function roundTo(num, places) {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
}

function saveExpression(expression) {
    let expressions = JSON.parse(localStorage.getItem("expressions")) || [];
    expressions.push(expression);
    localStorage.setItem("expressions", JSON.stringify(expressions));
}

function loadExpressions() {
    let expressions = JSON.parse(localStorage.getItem("expressions")) || [];
    return expressions;
}

document.addEventListener("DOMContentLoaded", () => {
    let keys = document.querySelectorAll(".key");
    let screen = document.querySelector(".calculator-screen");
    let values = document.querySelector(".calculator-values");

    let openParentheses = 0;
    let expression = "";

    // Carregar expressões salvas ao iniciar a aplicação
    let savedExpressions = loadExpressions();
    console.log("Expressões carregadas:", savedExpressions);

    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (key.innerHTML === "AC") {
                screen.innerHTML = "";
                values.innerHTML = "";
                expression = "";
                openParentheses = 0;
            } else if (key.innerHTML === "( )") {
                if (openParentheses == 0) {
                    values.innerHTML += "(";
                    expression += "(";
                    screen.innerHTML = "";
                    openParentheses++;
                } else if (openParentheses > 0) {
                    values.innerHTML += screen.innerHTML + ")";
                    expression += screen.innerHTML + ")";
                    screen.innerHTML = "";
                    openParentheses--;
                }
            } else if (key.innerHTML === "%") {
                let currentValue = Number(screen.innerHTML);
                screen.innerHTML = (currentValue / 100).toString();
                values.innerHTML += `${currentValue}%`;
                expression += (currentValue / 100).toString();
            } else if (key.querySelector("img")) {
                let newValue = screen.innerHTML;
                screen.innerHTML = newValue.slice(0, -1);
                values.innerHTML = values.innerHTML.slice(0, -1);
                expression = expression.slice(0, -1);
            } else if (key.innerHTML === "+" || key.innerHTML === "-" || key.innerHTML === "X" || key.innerHTML === "/") {
                if (/[+\-*/]$/.test(expression)) {
                    // Substitui o último operador pela nova operação
                    expression = expression.slice(0, -1) + (key.innerHTML === "X" ? "*" : key.innerHTML);
                    values.innerHTML = values.innerHTML.slice(0, -2) + ` ${key.innerHTML === "X" ? "*" : key.innerHTML} `;
                } else {
                    values.innerHTML += `${screen.innerHTML} ${key.innerHTML === "X" ? "*" : key.innerHTML} `;
                    expression += `${screen.innerHTML} ${key.innerHTML === "X" ? "*" : key.innerHTML} `;
                }
                screen.innerHTML = "";
            } else if (key.innerHTML === "=") {
                try {
                    values.innerHTML += screen.innerHTML;
                    expression += screen.innerHTML;
                    let sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, ''); // Sanitize input
                    let result = eval(sanitizedExpression);
                    screen.innerHTML = roundTo(result, 10).toString();
                    values.innerHTML = ""; // Clear the values screen after displaying result
                    saveExpression(expression); // Salvar a expressão
                    expression = screen.innerHTML; // Iniciar nova expressão com resultado
                    openParentheses = 0;
                } catch (error) {
                    alert("Operação inválida");
                    screen.innerHTML = "";
                    values.innerHTML = "";
                    expression = "";
                    openParentheses = 0;
                }
            } else {
                screen.innerHTML += key.innerHTML;
            }
        });
    });
});
