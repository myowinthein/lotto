const lotteryRegex = /[^က-အ0-9၀-၉ \n]/g
const alphabetRegex = /[^က-အ]/g
const numberRegex = /[^0-9၀-၉]/g
const enNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const mmNumbers = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉']

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