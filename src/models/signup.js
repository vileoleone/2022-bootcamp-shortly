import joi from "joi"

export const signUpSchemaModel = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.number().required(),
    confirmPassword: joi.any().valid(joi.ref('password')).required()
})