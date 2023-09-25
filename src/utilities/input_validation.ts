import Joi from "joi";

export const create_city = Joi.object({
  name: Joi.string().required().trim().messages({
    "any.required": "City name is required",
  }),
  latitude: Joi.number().required().messages({
    "any.required": "Latitude is required",
  }),
  longitude: Joi.number().required().messages({
    "any.required": "Longitude is required",
  }),
});

export const update_city = Joi.object({
  name: Joi.string().allow("").trim(),
  latitude: Joi.number().allow(""),
  longitude: Joi.number().allow(""),
});

export const creating_temperatures = Joi.object({
  city_id: Joi.number().required(),
  max: Joi.number().required(),
  min: Joi.number().required(),
});

export const creating_webhooks = Joi.object({
  city_id: Joi.number().required(),
  callback_url: Joi.string().required().trim(),
});
