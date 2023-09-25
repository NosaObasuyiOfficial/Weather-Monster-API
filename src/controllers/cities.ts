import { Request, Response } from "express";
import { create_city, update_city } from "../utilities/input_validation";
import Cities from "../model/cities.model";
import Tempeartures from "../model/temperatures.model";

//-------------------------------CREATE A CITY------------------------------------//
export const create_a_city = async (req: Request, res: Response) => {
  try {
    const schema = create_city;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id, name, latitude, longitude } = req.body;

    const city_validation: any = await Cities.findOne({
      where: { name },
    });

    if (!city_validation) {
      const create_user = await Cities.create({
        id,
        name,
        latitude,
        longitude,
      });

      const city_details: any = await Cities.findOne({
        where: { name },
      });

      const city_id = city_details.id;
      const city_name = city_details.name;
      const city_latitude = city_details.latitude;
      const city_longitude = city_details.longitude;

      const data = {
        id: city_id,
        name: city_name,
        latitude: city_latitude,
        longitude: city_longitude,
      };

      res.status(200).json({
        message: `${name} information has been created SUCCESSFULLY`,
        data,
      });
    } else {
      return res.status(400).json({
        message: `${name} information already exists.`,
      });
    }
  } catch (error) {
    console.error("Error creating a city:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//---------------------------------UPDATE A CITY------------------------------------//
export const update_a_city = async (req: Request, res: Response) => {
  try {
    const schema = update_city;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, latitude, longitude } = req.body;
    const { id } = req.params;

    const city_validation: any = await Cities.findOne({
      where: { id },
    });

    if (city_validation) {
      const city_update = await Cities.update(
        { name, latitude, longitude },
        {
          where: { id },
        }
      );

      if (city_update) {
        const updated_city: any = await Cities.findOne({
          where: {
            id,
          },
        });

        const city_name = updated_city.name;
        const city_latitude = updated_city.latitude;
        const city_longitude = updated_city.longitude;

        const data = {
          name: city_name,
          latitude: city_latitude,
          longitude: city_longitude,
        };

        return res.status(200).json({
          message: `City has been updated SUCCESSFULLY`,
          data,
        });
      } else {
        return res.status(400).json({
          message: `Unable to update city`,
        });
      }
    } else {
      return res.status(404).json({
        message: `City information NOT FOUND`,
      });
    }
  } catch (error) {
    console.error("Error updating a city:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//--------------------------------DELETE A CITY------------------------------------//
export const delete_a_city = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const find_city: any = await Cities.findOne({
      where: { id },
    });

    if (find_city) {
      const city_name = find_city.name;
      const city_id = find_city.id;
      const city_latitude = find_city.latitude;
      const city_longitude = find_city.longitude;

      const deleted_city = await Cities.destroy({ where: { id } });

      if (deleted_city) {
        const delete_temp_records = await Tempeartures.destroy({
          where: { city_id: id },
        });

        const data = {
          id: city_id,
          name: city_name,
          latitude: city_latitude,
          longitude: city_longitude,
        };
        return res.status(200).json({
          message: `You have DELETED all ${city_name} records SUCESSFULLY`,
          data,
        });
      } else {
        return res.status(500).json({
          message: `FAILED to DELETE ${city_name} records`,
        });
      }
    } else {
      return res.status(404).json({
        message: `City information NOT FOUND`,
      });
    }
  } catch (error) {
    console.error("Error deleting a city:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
