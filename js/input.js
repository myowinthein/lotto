// prepare variables

// prepare functions

// document ready
window.addEventListener('load', (event) => {
    // prepare objects   
    const saveButton = document.getElementById('save')
    const backButton = document.getElementById('back')   

    // back click
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html'
        })
    }

    // save click
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            let values = document.getElementById('mwt').value.split('\n')
            // console.log(values)
            // validation
            // loop
                // trim, clear dots
            // generate json ifle
        })
    }
})