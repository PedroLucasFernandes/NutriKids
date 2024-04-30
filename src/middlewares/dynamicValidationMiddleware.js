const { isValidString, isValidNumber, required } = require('../utils/validationUtils.js');

function validateData(validationRules) {
    return (req, res, next) => {
        console.log(`validação de dados acionada para: ${req.originalUrl}, onde: ${req.method}`); 
        
        const data = { ...req.body, ...req.params };
        
        for (field of Object.keys(validationRules)) {
            const value = data[field];
            const rules = validationRules[field];

            if(rules.required && !required(value)) {
                return res.status(400).json({ error: `campo '${field}' é requerido` });
            }

            if(rules.type === 'string' && !isValidString(value, rules.maxLength)) {
                return res.status(400).json({ error: `campo '${field}' deve ser uma string com o máximo de ${rules.maxLength} caracteres` });
            }

            if (rules.type === 'number' && !isValidNumber(parseInt(value))) {
                return res.status(400).json({ error: `campo '${field}' deve ser um número` });
            }
        }

        next();
    };
}

module.exports = validateData;