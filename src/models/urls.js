import joi from "joi"

export const UrlSchemaValidation = joi.object({
    url: joi.string().uri().required()
})