const validationUtils = {
    isValidString(value, maxLength) {
        return typeof value === 'string' && value.trim() !== '' && value.length <= maxLength;
    },

    isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    },

    required(value) {
        return value !== undefined && value !== null;
    }
}

module.exports = validationUtils;