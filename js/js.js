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


keys.addEventListener('click',e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if(!action){
            console.log("Numpad");
            if(displayedNum==='0' || calculator.dataset.previousKeyType === 'operator'){
                display.textContent = keyContent;
            }
            if(displayedNum != '0'){
                display.textContent = displayedNum + keyContent;
            }

            calculator.dataset.previousKey = 'number';
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
            action === 'mod' ||
            action === 'pow' ||
            action === 'percent'
        ){
            const firstVal = displayedNum;
            calculator.dataset.operator = action;
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            console.log("Operator");
        }

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (action=='equal'){
            const firstVal = calculator.dataset.firstVal;
            const secondVal = displayedNum;
            const operator = calculator.dataset.operator;

            display.textContent = calculate(firstVal,operator, secondVal);

            calculator.dataset.previousKeyType = 'calculate';
            console.log('sama dengan');
        }
        if(action=='clear'){
            calculator.dataset.previousKeyType = 'clear';
            console.log('Clear');
        }
    }
})
