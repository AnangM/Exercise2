const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-buttons');
const display = document.querySelector('.calculator-display');

const calculate = (num1, op, num2) => {
    let result = '';
    if (op === 'add'){
        result = parseFloat(num1) + parseFloat(num2);
    }else if(op === 'sub'){
        result = parseFloat(num1) - parseFloat(num2);
    }else if(op==='mult'){
        result = parseFloat(num1) * parseFloat(num2);
    }else if(op==='div'){
        result = parseFloat(num1) / parseFloat(num2);
    }

    return result;
}

const del = (number) => {
    let result = number.slice(0,-1);
    return result;
}


keys.addEventListener('click',e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if(!action){
            console.log("Numpad");
            if(displayedNum ==='0' || calculator.dataset.previousKeyType === 'operator'){
                console.log("previous key type : " + calculator.dataset.previousKeyType);
                display.textContent = keyContent;
                calculator.dataset.previousKeyType = 'number';
            }
            else if(displayedNum != '0'){
                display.textContent = displayedNum + keyContent;
                calculator.dataset.previousKeyType = 'number';
            }

        }
        if(action === 'dec'){
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.';
            }else if(previousKeyType === 'operator'){
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if(action === 'add' ||
            action === 'sub' ||
            action === 'mult' ||
            action === 'div' || 
            action === 'pow' ||
            action === 'percent'
        ){
            calculator.dataset.firstVal = display.textContent;
            calculator.dataset.operator = action;
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            console.log("Operator");
        }
        if(action === 'backspace'){
            if(display.textContent.length == 1){
                display.textContent = '0';
            }else{
                calculator.dataset.firstVal = display.textContent;
                display.textContent = del(calculator.dataset.firstVal);
            }
        }        
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
        
        if (action=='equal'){
            const firstVal = calculator.dataset.firstVal;
            const secondVal = displayedNum;
            const operator = calculator.dataset.operator;
            
            console.log('[WARNING] ' + firstVal + operator + secondVal);
            display.textContent = calculate(firstVal,operator, secondVal);

            calculator.dataset.previousKeyType = 'calculate';
            console.log('sama dengan');
        }
        if(action=='clear'){
            calculator.dataset.previousKeyType = 'clear';
            display.textContent = '0';
            console.log('Clear');
        }
    }
})
