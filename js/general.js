// prepare variables
const lotteryRegex = /[^က-အ0-9၀-၉ \n]/g
const alphabetRegex = /[^က-အ]/g
const numberRegex = /[^0-9၀-၉]/g
const enNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const mmNumbers = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉']
const fetchURL = 'https://extendsclass.com/api/json-storage/bin/ffebddf'
const errorClass = 'error'

let errorCount = 0
let invalidInputs = []
let validInputs = []
let lotteryResults = []

// prepare functions
function clearValidationInputs () {
    errorCount = 0

    invalidInputs = []
    validInputs = []
}

function uniqueArray (array) {
    return array.filter((item, i, ar) => ar.indexOf(item) === i)
}

function validator (isValid, input) {
    if (isValid) {
        validInputs.push(input)
    } else {
        invalidInputs.push(input)
    }
}

function requireRule (inputs) {
    inputs.forEach(input => {
        const value = input.value
        const isValid = (value)

        validator(isValid, input)
    })
}

function showValidationResults () {
    uniqueArray(validInputs).forEach(input => {
        input.classList.remove(errorClass)
    })

    uniqueArray(invalidInputs).forEach(input => {
        errorCount++
        input.classList.add(errorClass)
    })

    return errorCount
}

function replaceArray (find, replace, str) {
    let regex

    for (let i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g")
        str = str.toString().replace(regex, replace[i])
    }

    return str
}

function localizeNumber (str, type = 1) { // 0 - to en, 1 - to mm
    let find = mmNumbers
    let replace = enNumbers
    if (type == 1) {
        find = enNumbers
        replace = mmNumbers
    }

    return replaceArray(find, replace, str)
}

function optimizeValue (str, regex) {
    return localizeNumber(str.replace(regex, '').trim())
}

function getLatestEvent () {
    return fetch(fetchURL)
            .then(response => response.json())
            .then(data => {
                lotteryResults = data
            })
            .catch((error) => {
                console.log('Something wrong in getting JSON!\n', error)
            })
}