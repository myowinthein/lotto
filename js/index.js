// prepare variables
const alphabets = ['က', 'ခ', 'ဂ', 'ဃ', 'င', 'စ', 'ဆ', 'ဇ', 'ဈ', 'ည', 'ဋ', 'ဌ', 'ဍ', 'ဎ', 'ဏ', 'တ', 'ထ', 'ဒ', 'ဓ', 'န', 'ပ', 'ဖ', 'ဗ', 'ဘ', 'မ', 'ယ', 'ရ', 'လ', 'ဝ', 'သ', 'ဟ', 'ဠ', 'အ']
const hiddenClass = 'hidden'
const errorClass = 'error'
const alphabetOptions = getAlphabetOptions()

let invalidInputs = []
let validInputs = []
let checkType, baseAlphabetInput, comboAlphabetInput, baseNumberInput, comboNumberInput, tickets, lotteryCheckResults

const lotteryResult = {"1":["ကက ၄၉၆","ဆ ၄၈၀","ခ ၃၆၇","ဏ ၆၃၆","မ ၃၀၁","န ၈၂၀","ဍ ၄၈၁","စ ၄၂၇"],"2":["ည ၄၁၀၄","က ၉၇၄၃","င ၄၉၄၃","ဎ ၁၅၅၁","က ၂၉၄၈","ကက ၄၃၂၆","ထ ၆၃၇၃","ရ ၄၀၀၇"],"3":["င ၂၆၇၈၇","ရ ၆၆၂၂၂","ခ ၃၃၃၅၇","ခ ၄၃၇၅၈","ဏ ၇၆၁၆၄","ဆ ၈၃၅၅၅","ဒ ၄၉၁၇၉","ဍ ၇၀၀၄၉"],"10":["ဎ ၉၈၄၁၉၈","ဈ ၄၈၂၉၆၃","ရ ၃၈၆၄၇၉","ဌ ၉၆၆၀၃၄","ကဃ ၁၈၇၃၇၂","ဓ ၇၀၁၃၃၄","သ ၃၀၁၅၀၅","ဇ ၇၄၄၄၅၀","ဒ ၄၅၂၈၂၃","န ၁၇၄၅၆၃","ဓ ၈၂၅၁၂၃","ကခ ၂၈၇၈၁၆","ဗ ၄၄၅၀၇၀","ဠ ၆၆၉၀၇၀","ဂ ၉၃၄၉၄၀","ဘ ၄၇၈၄၇၃","န ၅၆၇၉၄၆","ဋ ၂၈၇၈၅၉","ဓ ၉၀၃၃၇၅","ကဂ ၉၉၁၉၄၀"],"20":["ကခ ၅၃၈၀၃၉","န ၃၄၂၀၇၉","ကက ၈၂၇၉၈၃","သ ၃၃၅၅၀၆","ဟ ၅၃၃၉၇၀","ကဂ ၁၉၃၁၃၃","အ ၅၃၆၆၀၂","ဃ ၂၆၅၅၃၂","ထ ၄၆၆၃၀၅","မ ၇၆၇၈၃၄","ည ၈၀၉၅၅၄","ဒ ၄၈၆၅၇၁","ကင ၆၈၄၉၁၇","ဖ ၇၆၁၃၁၃","ရ ၅၂၉၀၁၃","ကခ ၁၅၈၉၁၁"],"50":["ထ ၃၇၂၃၅၁","စ ၉၆၀၅၇၅","စ ၉၃၈၈၀၈","ဏ ၇၇၂၃၁၅","စ ၈၃၄၈၄၀","ကခ ၅၆၂၁၂၃","ဇ ၇၀၀၅၂၂","ဇ ၃၂၆၅၂၇","ထ ၆၈၁၁၆၈","ဓ ၆၇၁၆၇၂","ပ ၈၈၀၇၆၅","ဎ ၈၀၃၅၇၆","ဏ ၉၁၀၃၂၃"],"100":["ဌ ၇၈၂၂၆၈","ဘ ၇၄၅၃၄၆","ယ ၆၅၆၁၃၄","စ ၇၆၆၅၃၁","ကဂ ၉၆၁၁၇၈","အ ၉၂၈၇၄၉","န ၁၁၃၈၇၀","ဒ ၁၅၄၂၀၃","ဇ ၉၁၉၇၇၁","ဌ ၉၉၇၄၀၃","ကခ ၃၁၁၇၀၁","ဌ ၆၉၂၇၈၁"],"200":["ဗ ၂၅၄၀၇၅","ကဂ ၄၂၉၉၀၂","င ၇၅၁၇၄၁","ဃ ၆၁၈၈၀၉","ဋ ၉၀၈၉၀၅","ဏ ၈၇၆၇၅၅","ခ ၅၂၃၇၂၃","လ ၂၄၀၉၀၅","ကဂ ၆၆၀၉၅၇","ဆ ၄၁၅၄၅၁","ဖ ၇၇၂၁၆၉"],"500":["ဟ ၁၁၈၅၅၆","ည ၆၆၃၇၆၇","ဆ ၄၇၇၆၈၆","ဠ ၅၅၄၂၇၅","ည ၅၃၂၆၂၀","ကင ၂၆၇၅၄၅","မ ၅၀၄၁၄၆","က ၇၄၁၁၆၃","ကဂ ၆၅၅၄၁၉","ဋ ၆၂၃၀၉၀","ဖ ၄၄၈၉၇၆","ဟ ၅၇၉၃၀၈","ဌ ၈၂၂၅၁၄","ကင ၄၁၄၂၁၇","ဠ ၄၅၁၉၆၂"],"1000":["ည ၂၃၁၁၄၅","ဝ ၉၈၄၀၂၀","ဇ ၅၄၀၉၉၁","ဋ ၅၀၀၁၆၆","ဍ ၄၉၁၃၂၆","ဆ ၃၇၀၆၉၇","ဠ ၂၁၇၃၃၉"],"2000":["ကဃ ၅၅၃၂၂၄","ဆ ၆၂၉၀၉၅","င ၂၅၆၀၆၅","ဋ ၈၅၀၅၁၇","သ ၆၆၀၁၅၉","ဋ ၆၂၀၃၂၈","ယ ၁၀၄၅၂၃"],"5000":"ဌ ၆၃၂၀၄၄","10000":"ည ၅၅၈၀၀၄","15000":"စ ၄၄၁၇၉၈","frequency":"၁၅","0.5":["အ ၃၁","ဓ ၉၉","ယ ၃၃","ဗ ၆၈","ဓ ၇၃"]}

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

function getAutocompleteOptions (obj) {
    return {
        input: obj,
        minLength: 1,
        emptyMsg: 'မတွေ့ပါ။',
        preventSubmit: true,
        showOnFocus: true,
        fetch: function(text, update) {
            const suggestions = alphabetOptions.filter(n => n.label.includes(text))
            update(suggestions)
        },
        onSelect: function(item) {
            obj.value = item.value
        }
    }
}

function toggleDisplay (inputs, type = 0) { // 0 - show, 1 - hide
    inputs.forEach((input) => {
        if (type == 1) {
            input.classList.add(hiddenClass)
        } else {
            input.classList.remove(hiddenClass)
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

function uniqueArray (array) {
    return array.filter((item, i, ar) => ar.indexOf(item) === i)
}

function showValidationResults () {
    let errorCount = 0

    uniqueArray(validInputs).forEach(input => {
        input.classList.remove(errorClass)
    })

    uniqueArray(invalidInputs).forEach(input => {
        errorCount++
        input.classList.add(errorClass)
    })

    return errorCount
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

function lengthRule (inputs, limit = 6) {
    inputs.forEach(input => {
        const value = input.value
        const isValid = (value.length == limit)

        validator(isValid, input)
    })
}

function lessThanEqualRule (inputs) {
    inputs.forEach(input => {
        const firstInput = input[0]
        const firstInputValue = firstInput.value

        const secondInput = input[1]
        const secondInputValue = secondInput.value

        const isValid = (firstInputValue <= secondInputValue)

        validator(isValid, secondInput)
    })
}

function indexLessThanEqualRule (inputs) {
    inputs.forEach(input => {
        const firstInput = input[0]
        const firstInputValue = firstInput.value
        const firstAlphabetIndex = alphabetIndexFinder(firstInputValue)

        const secondInput = input[1]
        const secondInputValue = secondInput.value
        const secondAlphabetIndex = alphabetIndexFinder(secondInputValue)

        const isValid = (firstAlphabetIndex <= secondAlphabetIndex)

        validator(isValid, secondInput)
    })
}

function validate () {
    // clear previous validation
    invalidInputs = []
    validInputs = []

    // link input with rule
    let requireRuleInputs = [baseAlphabetInput, baseNumberInput]
    let lengthRuleInputs = [baseNumberInput]
    let lessThanEqualRuleInputs = []
    let indexLessThanEqualRuleInputs = []

    if (checkType == 'bulk_alphabet') {
        requireRuleInputs.push(comboAlphabetInput)

        indexLessThanEqualRuleInputs.push([baseAlphabetInput, comboAlphabetInput])
    } else if (checkType == 'bulk_number') {
        requireRuleInputs.push(comboNumberInput)
        lengthRuleInputs.push(comboNumberInput)

        lessThanEqualRuleInputs.push([baseNumberInput, comboNumberInput])
    }

    // start validation
    requireRule(requireRuleInputs)
    lengthRule(lengthRuleInputs)
    lessThanEqualRule(lessThanEqualRuleInputs)
    indexLessThanEqualRule(indexLessThanEqualRuleInputs)

    // show or hide error
    return showValidationResults()
}

function getTickets () {  
    // prepare variables
    const baseAlphabetValue = baseAlphabetInput.value
    const comboAlphabetValue = comboAlphabetInput.value
    const baseNumberValue = baseNumberInput.value
    const comboNumberValue = comboNumberInput.value
    let tickets = []

    if (checkType == 'single') {
        tickets.push(lotteryFormat(baseAlphabetValue, baseNumberValue))
    }
    else if (checkType == 'bulk_alphabet') {
        const baseAlphabetIndex = alphabetIndexFinder(baseAlphabetValue)
        const comboAlphabetIndex = alphabetIndexFinder(comboAlphabetValue)

        for (let i = baseAlphabetIndex; i <= comboAlphabetIndex; i++) {
            tickets.push(lotteryFormat(alphabetOptions[i].value, baseNumberValue))
        }
    } else if (checkType == 'bulk_number') {
        const baseNumberValueEn = localizeNumber(baseNumberValue, 0)
        const comboNumberValueEn = localizeNumber(comboNumberValue, 0)

        for (let i = baseNumberValueEn; i <= comboNumberValueEn; i++) {
            tickets.push(lotteryFormat(baseAlphabetValue, localizeNumber(i)))
        }
    }

    return tickets
}

function alphabetIndexFinder (keyword) {
    return alphabetOptions.findIndex(function(option, i){
        return option.value === keyword
    })
}

function lotteryFormat (alphabet, number) {
    return `${alphabet} ${number}`
}

function lotteryChecker (results, message, limit = false) {
    const luckyNumbers = tickets.filter(ticket => {
        ticket = limit ? ticket.slice(0, -limit) : ticket

        if (Array.isArray(results)) {
            return results.includes(ticket)
        } else {
            return ticket == results
        }
    })

    luckyNumbers.forEach(number => {
        if (lotteryCheckResults[number] === undefined) {
            lotteryCheckResults[number] = []
        }

        lotteryCheckResults[number].push(message)
    })
}

function showLotteryCheckResults(notWinningDiv, winDiv) {
    const winCount = Object.keys(lotteryCheckResults).length

    if (winCount == 0) {
        winDiv.classList.add(hiddenClass)
        notWinningDiv.classList.remove(hiddenClass)
    } else {
        let messages = ''
        let prize = ''
        let lotteryCheckResult = ''

        for (let key in lotteryCheckResults) {
            lotteryCheckResult = lotteryCheckResults[key]
            prize = lotteryCheckResult.join('၊ ') +' ဆု ဆွတ်ခူးပါသည်။'
            messages += `<p><span>${key}</span><span>${prize}</span></p>`
        }

        notWinningDiv.classList.add(hiddenClass)
        winDiv.innerHTML = messages
        winDiv.classList.remove(hiddenClass)
    }
}

function resetResults(winDiv, notWinningDiv) {
    winDiv.classList.add(hiddenClass)
    notWinningDiv.classList.add(hiddenClass)
}

function resetValidations(allInputs) {
    allInputs.forEach((input) => {
        input.classList.remove(errorClass)
    })
}

// document ready
window.addEventListener('load', (event) => {
    // prepare objects
    const checkTypeInputs = document.getElementsByName('check_type')
    const singleInput = document.querySelector('[value=single]')

    const allInputs = document.querySelectorAll('.control')

    const alphabetInputs = document.querySelectorAll('.alphabet')
    baseAlphabetInput = document.getElementById('baseAlphabet')
    comboAlphabetInput = document.getElementById('comboAlphabet')
    const alphabetBridgeInput = document.getElementById('alphabetBridge')

    const numberInputs = document.querySelectorAll('.number')
    baseNumberInput = document.getElementById('baseNumber')
    comboNumberInput = document.getElementById('comboNumber')
    const numberBridgeInput = document.getElementById('numberBridge')

    const searchButton = document.getElementById('search')
    const resetButton = document.getElementById('reset')

    const notWinningDiv = document.querySelector('.not_winning')
    const winDiv = document.querySelector('.win')

    // init autocomplete
    const baseAlphabetAutocompleteOptions = getAutocompleteOptions(baseAlphabetInput)
    const comboAlphabetAutocompleteOptions = getAutocompleteOptions(comboAlphabetInput)

    autocomplete(baseAlphabetAutocompleteOptions)
    autocomplete(comboAlphabetAutocompleteOptions)

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
            this.value = optimizeValue(this.value, alphabetRegex)
        })
    })

    // number change
    numberInputs.forEach((numberInput) => {
        numberInput.addEventListener('change', function() {
            this.value = optimizeValue(this.value, numberRegex)
        })
    })

    // search click
    searchButton.addEventListener('click', function() {
        // get check type
        checkType = getCheckedRadioValue(checkTypeInputs)
        
        // reset results
        resetResults(winDiv, notWinningDiv)

        // validate inputs
        const errorCount = validate()

        // check tickets
        if (!errorCount) {
            tickets = getTickets()

            // clear previous results
            lotteryCheckResults = []

            // check in 15000 lakh
            lotteryChecker(lotteryResult['15000'], 'သိန်း ၁၅၀၀၀')

            // check in 10000 lakh
            lotteryChecker(lotteryResult['10000'], 'သိန်း ၁၀၀၀၀')

            // check in 5000 lakh
            lotteryChecker(lotteryResult['5000'], 'သိန်း ၅၀၀၀')

            // check in 2000 lakh
            lotteryChecker(lotteryResult['2000'], 'သိန်း ၂၀၀၀')

            // check in 1000 lakh
            lotteryChecker(lotteryResult['1000'], 'သိန်း ၁၀၀၀')

            // check in 500 lakh
            lotteryChecker(lotteryResult['500'], 'သိန်း ၅၀၀')

            // check in 200 lakh
            lotteryChecker(lotteryResult['200'], 'သိန်း ၂၀၀')

            // check in 100 lakh
            lotteryChecker(lotteryResult['100'], 'သိန်း ၁၀၀')

            // check in 50 lakh
            lotteryChecker(lotteryResult['50'], 'သိန်း ၅၀')

            // check in 20 lakh
            lotteryChecker(lotteryResult['20'], 'သိန်း ၂၀')

            // check in 10 lakh
            lotteryChecker(lotteryResult['10'], '၁၀ သိန်း')

            // check in 3 lakh
            lotteryChecker(lotteryResult['3'], '၃ သိန်း', 1)

            // check in 2 lakh
            lotteryChecker(lotteryResult['2'], '၂ သိန်း', 2)

            // check in 1 lakh
            lotteryChecker(lotteryResult['1'], '၁ သိန်း', 3)

            // check in 0.5 lakh
            lotteryChecker(lotteryResult['0.5'], 'ငါးသောင်း', 4)

            // output to user
            showLotteryCheckResults(notWinningDiv, winDiv)
        }
    })

    // reset click
    resetButton.addEventListener('click', function() {
        singleInput.click()

        resetResults(winDiv, notWinningDiv)
        resetValidations(allInputs)       
    })
})