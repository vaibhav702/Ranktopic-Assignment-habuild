const mongoose = require('mongoose')



const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false 
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
};
const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0; 
};
const isValidTitle = function(title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}
const validString = function(value) {
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
}
const validAddress = function(address) {
    if (typeof address === 'undefined' || address === null) return false 
    if (Object.keys(address).length === 0) return false
    return true;
}
const validRating = function isInteger(value) {
    return value % 1 == 0;
}

const validatingInvalidObjectId = function(objectId) {
    if (objectId.length == 24) return true 
    return false
}

module.exports = {
    isValid,
    isValidRequestBody,
    isValidObjectId,
    validString,
    validAddress,
    validRating,
    validatingInvalidObjectId,
    isValidTitle
}