import { Request, Response } from "express";
import { creating_temperatures } from "../utilities/input_validation";
import Temperatures from "../model/temperatures.model";
import Cities from "../model/cities.model";

//---------------------------------CREATE A TEMPERATURE------------------------------------//
export const create_temperatures = async (req: Request, res: Response) => {
  try {
    const schema = creating_temperatures;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { id, city_id, max, min } = req.body;

    const city_validation: any = await Cities.findOne({
      where: { id: city_id },
    });

    if (city_validation) {
      const city_name = city_validation.name;

      if (max === 0 || min === 0) {
        return res.status(400).json({
          message: `Temperature values must be higher or lower than 0ºC`,
        });
      } else {
        if (max > min && min < max) {
          const timestamp = new Date().getTime();

          const create_temperature = await Temperatures.create({
            id,
            city_id,
            max,
            min,
            timestamp,
          });

          if (create_temperature) {
            const data_check: any = await Temperatures.findOne({
              where: { timestamp },
            });

            const Id = data_check.id;
            const City_Id = data_check.city_id;
            const max_temp = data_check.max;
            const min_temp = data_check.min;
            const city_timestap = data_check.timestamp;

            const data = {
              id: Id,
              city_id: City_Id,
              max: max_temp,
              min: min_temp,
              timestamp: city_timestap,
            };

            return res.status(200).json({
              message: `${city_name} temperature measurements has been APPENDED.`,
              data,
            });
          } else {
            return res.status(500).json({
              message: `FAILED! Temperature measurements wasn't CREATED.`,
            });
          }
        } else {
          return res.status(400).json({
            message: `Max Temperatures should be higher than Min Temperatures. Please CORRECT.`,
          });
        }
      }
    } else {
      return res.status(404).json({
        message: `Record NOT FOUND`,
      });
    }
  } catch (error) {
    console.error("Error creating temperatures:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
