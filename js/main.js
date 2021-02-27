const calculator = document.querySelector('.calculator')

const keys = calculator.querySelector('.calculator_keys')

const display = calculator.querySelector('.calculator_display')

keys.addEventListener('click', event => {
    console.log(event.target)
    if(!event.target.closest('button')) return 
    
    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

    if (type == 'number') {
        if(displayValue == 0) {
            display.textContent = keyValue
        } else if (previousKeyType == 'operator') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }

    if (type == 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => {el.dataset.state = ''})
        key.dataset.state = 'selected'

        calculator.dataset.firstNo = displayValue
        calculator.dataset.operator = key.dataset.key
    }
    if (type == 'equal') {
        const firstNo = calculator.dataset.firstNo
        const operator = calculator.dataset.operator
        const secondNo = displayValue
        
        
        display.textContent = calculate(firstNo, operator, secondNo)
    }
    if (type == 'clear') {
        display.textContent = '0';
        delete calculator.dataset.firstNo
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNo, operator, secondNo) {
    firstNo = parseInt(firstNo)
    secondNo = parseInt(secondNo)

    let result = ''
    if(operator == 'plus') return firstNo + secondNo
    if(operator == 'multiply') return firstNo * secondNo
    if(operator == 'divide') return firstNo / secondNo
    if(operator == 'minus') return firstNo - secondNo
    return result
}