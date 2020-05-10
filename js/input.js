// prepare functions
function validate (inputs) {
    const className = 'error'
    let value, isValid
    let errorCount = 0

    inputs.forEach((input) => {
        value = input.value
        isValid = (value)

        if (isValid) {
            input.classList.remove(className)
        } else {
            errorCount++
            input.classList.add(className)
        }
    })

    return errorCount
}

function prepareJSON (inputs) {
    const jsonObj = new Object()

    inputs.forEach((input) => {
        // trim & clean characters
        const id = input.id
        const tagName = input.tagName
        let value = input.value

        // generate json string
        value = value.split('\n')
        if (tagName == 'INPUT') {
            jsonObj[id] = value[0]
        } else {
            jsonObj[id] = value
        }
    })

    return jsonObj
}

function downloadJSON (jsonObj) {
    // prepare variables
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObj))
    const fileName = jsonObj.frequency

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
    const frequencyInput = document.getElementById('frequency')

    const saveButton = document.getElementById('save')
    const backButton = document.getElementById('back')

    // form controls change
    formControlsInputs.forEach((formControlsInput) => {
        formControlsInput.addEventListener('change', function() {
            const id = this.id
            const value = this.value
            const regex = (id == 'frequency') ? numberRegex : lotteryRegex

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
        const errorCount = validate(formControlsInputs)

        // continue if valid
        if (!errorCount) {
            // build json from input values
            const jsonObj = prepareJSON(formControlsInputs)

            // download json file
            downloadJSON(jsonObj)
        }
    })
})