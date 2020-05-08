// prepare variables
const alphabets = ['က', 'ခ', 'ဂ', 'ဃ', 'င', 'စ', 'ဆ', 'ဇ', 'ဈ', 'ည', 'ဋ', 'ဌ', 'ဍ', 'ဎ', 'ဏ', 'တ', 'ထ', 'ဒ', 'ဓ', 'န', 'ပ', 'ဖ', 'ဗ', 'ဘ', 'မ', 'ယ', 'ရ', 'လ', 'ဝ', 'သ', 'ဟ', 'ဠ', 'အ']

// prepare functions
function getAlphabetOptions () {
    let comboWord
    let baseAlphabets = []
    let comboAlphabets = []

    alphabets.forEach(alphabet => {
        baseAlphabets.push({label: alphabet, value: alphabet})

        comboWord = 'က' + alphabet
        comboAlphabets.push({label: comboWord, value: comboWord})
    })

    const options = baseAlphabets.concat(comboAlphabets)

    return options
}

function getAutocompleteOptions (obj, options) {
    return {
        input: obj,
        minLength: 1,
        emptyMsg: 'မတွေ့ပါ။',
        preventSubmit: true,
        showOnFocus: true,
        fetch: function(text, update) {
            const suggestions = options.filter(n => n.label.includes(text))
            update(suggestions)
        },
        onSelect: function(item) {
            obj.value = item.value
        }
    }
}

function toggleDisplay (inputs, type = 0) { // 0 - show, 1 - hide
    const className = 'hidden'

    inputs.forEach((input) => {
        if (type == 1) {
            input.classList.add(className)
        } else {
            input.classList.remove(className)
        }
    })
}

function getCheckedRadioValue (inputs) {
    let selectedValue

    for (const input of inputs) {
        if (input.checked) {
            selectedValue = input.value
            break
        }
    }

    return selectedValue
}

function validate (inputs, type = 0) { // 0 - alphabet, 1 - number
    // prepare variables
    const className = 'error'
    let value, isValid
    let errorCount = 0

    for (const input of inputs) {
        value = input.value

        if (type == 0) {
            isValid = (value)
        } else {
            isValid = (value && value.length == 6)
        }

        if (isValid) {
            input.classList.remove(className)
        } else {
            errorCount++
            input.classList.add(className)
        }
    }

    return errorCount
}

// document ready
window.addEventListener('load', (event) => {
    // prepare objects
    const checkTypeInputs = document.getElementsByName('check_type')
    const singleInput = document.querySelector('[value=single]')

    const alphabetInputs = document.querySelectorAll('.alphabet')
    const baseAlphabetInput = document.getElementById('baseAlphabet')
    const comboAlphabetInput = document.getElementById('comboAlphabet')
    const alphabetBridgeInput = document.getElementById('alphabetBridge')

    const numberInputs = document.querySelectorAll('.number')
    const baseNumberInput = document.getElementById('baseNumber')
    const comboNumberInput = document.getElementById('comboNumber')
    const numberBridgeInput = document.getElementById('numberBridge')

    const searchButton = document.getElementById('search')
    const resetButton = document.getElementById('reset')

    // check type change
    checkTypeInputs.forEach((checkTypeInput) => {
        checkTypeInput.addEventListener('change', function() {
            // prepare variables
            const checkType = this.value
            let showList = []
            let hideList = [comboAlphabetInput, alphabetBridgeInput, comboNumberInput, numberBridgeInput]

            // classified inputs to show or hide
            if (checkType == 'bulk_alphabet') {
                showList = [comboAlphabetInput, alphabetBridgeInput]
                hideList = [comboNumberInput, numberBridgeInput]
            } else if (checkType == 'bulk_number') {
                showList = [comboNumberInput, numberBridgeInput]
                hideList = [comboAlphabetInput, alphabetBridgeInput]
            }

            // show or hide inputs
            toggleDisplay(showList)
            toggleDisplay(hideList, 1)
        })
    })

    // alphabet change
    alphabetInputs.forEach((alphabetInput) => {
        alphabetInput.addEventListener('change', function() {
            this.value = this.value.replace(/[^က-အ]/g,'')
        })
    })

    // number change
    numberInputs.forEach((numberInput) => {
        numberInput.addEventListener('change', function() {
            this.value = this.value.replace(/[^0-9၀-၉]/g,'')
        })
    })

    // search click
    searchButton.addEventListener('click', function() {
        // prepare variables
        const checkType = getCheckedRadioValue(checkTypeInputs)
        let alphabetsToCheck = [baseAlphabetInput]
        let numbersToCheck = [baseNumberInput]

        // classified inputs to include in validation
        if (checkType == 'bulk_alphabet') {
            alphabetsToCheck.push(comboAlphabetInput)
        } else if (checkType == 'bulk_number') {
            numbersToCheck.push(comboNumberInput)
        }

        // validate inputs
        alphabetErrorCount = validate(alphabetsToCheck)
        numberErrorCount = validate(numbersToCheck, 1)

        // continue if valid
        if (!alphabetErrorCount && !numberErrorCount) {
        }
    })

    // reset click
    resetButton.addEventListener('click', function() {
        singleInput.click()
    })

    // init autocomplete
    const alphabetOptions = getAlphabetOptions()
    const baseAlphabetAutocompleteOptions = getAutocompleteOptions(baseAlphabetInput, alphabetOptions)
    const comboAlphabetAutocompleteOptions = getAutocompleteOptions(comboAlphabetInput, alphabetOptions)

    autocomplete(baseAlphabetAutocompleteOptions)
    autocomplete(comboAlphabetAutocompleteOptions)
})