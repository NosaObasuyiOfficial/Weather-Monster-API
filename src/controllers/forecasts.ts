import { Request, Response } from "express";
import Cities from "../model/cities.model";
import Temperatures from "../model/temperatures.model";

//---------------------------------FORECASTS------------------------------------//
export const forecasts = async (req: Request, res: Response) => {
  try {
    const { city_id } = req.params;

    const city_validation: any = await Cities.findOne({
      where: { id: city_id },
    });

    if (city_validation) {
      const city_temperature_value: any = await Temperatures.findAll({
        where: { city_id },
      });

      let max_temp: any = [];
      let min_temp: any = [];

      const city_temp_data = city_temperature_value.filter((temp: any) => {
        if (temp.dataValues.city_id === +city_id) {
          return temp.dataValues;
        }
      });

      if (city_temp_data.length === 0) {
        return res.status(400).json({
          message: `There is no temperature record for this City. Hence, Forecast cannot be made.`,
        });
      } else {
        city_temp_data.map((temperatures: any) => {
          const current_time = new Date().getTime();
          if ((+current_time - +temperatures.timestamp) / 3600000 <= 24) {
            max_temp.push(temperatures.max);
            min_temp.push(temperatures.min);
          }
        });

        const total_max_temp = max_temp.reduce(
          (val: number, curr: number) => val + curr
        );
        const avg_max_temp = total_max_temp / max_temp.length;

        const total_min_temp = min_temp.reduce(
          (val: number, curr: number) => val + curr
        );
        const avg_min_temp = total_min_temp / min_temp.length;

        const sample = city_temp_data.length;

        const data = {
          city_id: +city_id,
          max: +avg_max_temp.toFixed(2),
          min: +avg_min_temp.toFixed(2),
          sample,
        };
        return res.status(200).json({ data });
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
