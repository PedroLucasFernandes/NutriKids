const validationUtils = {
    isValidString(value, maxLength) {
        return typeof value === 'string' && value.trim() !== '' && value.length <= maxLength;
        //return typeof retorna se o valor é uma string, value.trim() !== '' verifica se a string não está vazia e value.length <= maxLength verifica se a string não ultrapassa o tamanho máximo. se satisfazer todas as condições, retorna true, ou seja, é uma string válida.
    },

    isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value);
        //return typeof retorna se o valor é um número, !isNaN(value) verifica se o valor não é NaN. se satisfazer todas as condições, retorna true, ou seja, é um número válido. a combinação dessas duas condições é necessária porque queremos assegurar que o valor é um número e também que é um número válido (não NaN - afinal NaN é considerado um number).
    },

    required(value) {
        return value !== undefined && value !== null;
        //return verifica se o valor é diferente de undefined e de null. se satisfazer todas as condições, retorna true, ou seja, é um valor requerido.
    }
}

module.exports = validationUtils;