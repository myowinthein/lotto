function replaceArray (find, replace, str) {
    let regex

    for (let i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g")
      str = str.replace(regex, replace[i])
    }

    return str
}

function localizeNumber (str) {
    const enNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const mmNumbers = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉']

    return replaceArray(enNumbers, mmNumbers, str)
}