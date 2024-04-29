const { isValidString, isValidNumber, required } = require('../utils/validationUtils.js');

function validateData(validationRules) {
    return (req, res, next) => {
        console.log(`validação de dados acionada para: ${req.originalUrl}, onde: ${req.method}`); 
        //req.originalUrl retorna a URL da requisição e req.method retorna o método HTTP da requisição.

        const data = { ...req.body, ...req.params };
        //o operador spread (...) é usado para copiar todas as propriedades de req.body e req.params para o objeto data. por exemplo, se req.body for { title: 'receita', yield: '4 porções' } e req.params for { id: 1 }, data será { title: 'receita', yield: '4 porções', id: 1 }.

        console.log('data:', data);

        for (field of Object.keys(validationRules)) {
            // const createRecipeValidationRules = {
            //     title: { required: true, type: 'string', maxLength: 255 },
            //     yield: { required: true, type: 'string', maxLength: 100 },
            //     ingredients: { required: true },
            //     instructions: { required: true },
            //     created_by: { required: true, type: 'number' },
            //     updated_by: { required: true, type: 'number' }
            // };
            //no exemplo acima Object.keys(createRecipeValidationRules) retornará um array com os nomes das propriedades de um objeto, ou seja: ['title', 'yield', 'ingredients', 'instructions', 'created_by', 'updated_by'].
            //então, for percorrerá cada um desses campos (field): title, yield, ingredients, instructions, created_by e updated_by.
            
            const value = data[field];
            //levando em conta o exemplo acima, value será o valor do campo atual (field) no corpo da requisição. por exemplo, quando field for 'title', value será data.title, que no caso é 'receita' que será o valor do campo title no objeto data.
            const rules = validationRules[field];
            //levando em conta o exemplo acima, rules será o objeto de regras de validação para o campo atual (field). por exemplo, quando field for 'title', rules será createRecipeValidationRules.title, que no caso é { required: true, type: 'string', maxLength: 255 }.

            if(rules.required && !required(value)) {
                //rules.required assume que rules é um objeto que contém a propriedade required, que indica se o campo é obrigatório ou não. se required for true, o código passa para a validação seguinte.
                //!required(value) é uma função exportada de src/utils/validationUtils.js que verifica se o valor é diferente de undefined e de null. se o valor for diferente de undefined e de null, a função retorna true, mas como nesse caso há a negação (!), o resultado será false, ou seja, passou na primeira validação!
                return res.status(400).json({ error: `campo '${field}' é requerido` });
            }

            if(rules.type === 'string' && !isValidString(value, rules.maxLength)) {
                //rules.type === 'string' assume que rules é um objeto que contém a propriedade type, que indica o tipo de dado que o campo deve ser. se type for 'string', o código passa para a validação seguinte.
                //!isValidString(value, rules.maxLength) é uma função exportada que verifica se o valor é uma string válida. se o valor for uma string válida, a função retorna true, mas como nesse caso há a negação (!), o resultado será false, ou seja, passou na segunda validação!
                return res.status(400).json({ error: `campo '${field}' deve ser uma string com o máximo de ${rules.maxLength} caracteres` });
            }

            if (rules.type === 'number' && !isValidNumber(parseInt(value))) {
                //rules.type === 'number' assume que rules é um objeto que contém a propriedade type, que indica o tipo de dado que o campo deve ser. se type for 'number', o código passa para a validação seguinte.
                //!isValidNumber(parseInt(value)) é uma função exportada que verifica se o valor é um número válido. se o valor for um número válido, a função retorna true, mas como nesse caso há a negação (!), o resultado será false, ou seja, passou na terceira validação!
                return res.status(400).json({ error: `campo '${field}' deve ser um número` });
            }
        }

        next();
    };
}

module.exports = validateData;