// prepare variables
let latestEvent

// prepare functions
function nextEventRule (input) {
    const value = input.value
    const isValid = (value > lotteryResults.event)

    validator(isValid, input)
}

function validate (inputs, eventInput) {
    // clear previous validation
    clearValidationInputs()

    // link input with rule
    let requireRuleInputs = inputs
    let nextEventRuleInput = eventInput

    // start validation
    requireRule(requireRuleInputs)
    nextEventRule(nextEventRuleInput)

    // show or hide error
    return showValidationResults()
}

function prepareJSON (inputs) {
    const jsonString = new Object()

    inputs.forEach((input) => {
        // trim & clean characters
        const id = input.id
        const tagName = input.tagName
        let value = input.value

        // generate json string
        value = value.split('\n')
        if (tagName == 'INPUT') {
            jsonString[id] = value[0]
        } else {
            jsonString[id] = value
        }
    })

    return JSON.stringify(jsonString)
}

function updateJSON(jsonString) {
    fetch(fetchURL, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: jsonString,
        })
        .then(response => response.json())
        .then(data => {
            alert('အောင်မြင်ပါသည်။')
        })
        .catch((error) => {
            console.log('Something wrong in updating JSON!\n', error)
        })
}

function downloadJSON (jsonString) {
    // prepare variables
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString)
    const fileName = jsonString.event

    // create anchor link
    const anchorLink = document.createElement('a')
    anchorLink.setAttribute('href', data)
    anchorLink.setAttribute('download', `${fileName}.json`)
    document.body.appendChild(anchorLink)

    // click & remove after download
    anchorLink.click()
    anchorLink.remove()
}

// document ready
window.addEventListener('load', (event) => {
    // prepare objects
    const formControlsInputs = document.querySelectorAll('.form-control')
    const eventInput = document.getElementById('event')

    const saveButton = document.getElementById('save')
    const backButton = document.getElementById('back')

    // form controls change
    formControlsInputs.forEach((formControlsInput) => {
        // remove comment only for debugging process
        // if (formControlsInput.id == 'event') {
        //     formControlsInput.value = '၁၅'
        // } else {
        //     formControlsInput.value = 'ဆ ၂၉၃၈၄၀'
        // }

        formControlsInput.addEventListener('change', function() {
            const id = this.id
            const value = this.value
            const regex = (id == 'event') ? numberRegex : lotteryRegex

            this.value = optimizeValue(value, regex)
        })
    })

    // back click
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html'
    })

    // save click
    saveButton.addEventListener('click', function() {
        // validate inputs
        validate(formControlsInputs, eventInput)

        // continue if valid
        if (!errorCount) {
            // build json from input values
            const jsonString = prepareJSON(formControlsInputs)

            // update json to cloud
            updateJSON(jsonString)

            // download json file
            // downloadJSON(jsonString)
        }
    })
})