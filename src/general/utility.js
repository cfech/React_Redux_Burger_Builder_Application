export const updateObject = (oldObj, updatedProperties) => {
    return {
        ...oldObj,
        ...updatedProperties
    }
}

   //checks validity of each specific field 
// export  const checkValidity = (value, rules) =>{
//     let isValid = true
//     if (!rules) {
//         return true
//     }
//     if (rules.required) {
//         isValid = value.trim() !== "" && isValid
//     }
//     //chain && is valid to pass it through the if statement, to make sure it satisfies every condition
//     if (rules.minLength) {
//         isValid = value.length >= rules.minLength && isValid
//     }

//     if (rules.maxLength) {
//         isValid = value.length <= rules.maxLength && isValid
//     }
//     return isValid

// }

// to check if each form element is valid
export const checkValidity = (value, rules) =>  {
    let isValid = true
    if (!rules) {
        return true
    }
    if (rules.required) {
        isValid = value.trim() !== "" && isValid
    }

    //chain && is valid to pass it through the if statement, to make sure it satisfies every condition
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid

}