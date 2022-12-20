import joi from "joi"

export const signInSchemaValidation = joi.object({
    email: joi.string().required(),
    password: joi.number().required()
})