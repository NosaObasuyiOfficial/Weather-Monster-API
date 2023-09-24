import { Request, Response } from "express";
import Webhooks from "../model/webhooks.model";
import Cities from "../model/cities.model";

//---------------------------------CREATE WEBHOOKS------------------------------------//

export const create_webhook = async (req: Request, res: Response) => {
  try {
    const { id, city_id, callback_url } = req.body;

    const city_validation: any = await Cities.findOne({
      where: {
        id: city_id,
      },
    });
    if (city_validation) {
      const webhook_exists: any = await Webhooks.findOne({
        where: {
          callback_url,
        },
      });

      if (webhook_exists) {
        return res.status(400).json({
          message: `${callback_url} for ${city_validation.name} has already been created.`,
        });
      } else {
        const creating_webhook = await Webhooks.create({
          id,
          city_id,
          callback_url,
        });
        if (creating_webhook) {
          return res.status(200).json({
            message: `Webhook; ${callback_url} created SUCCESFULLY`,
          });
        } else {
          return res.status(500).json({
            message: `Webhook; ${callback_url} creation FAILED.`,
          });
        }
      }
    } else {
      return res.status(400).json({
        message: `City record NOT FOUND.`,
      });
    }
  } catch (error) {
    console.error("Error creating webhooks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


//---------------------------------DELETE WEBHOOKS------------------------------------//
export const delete_webhook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const webhook_validation: any = await Webhooks.findOne({
      where: { id },
    });
    if (webhook_validation) {
      const webhook_city = webhook_validation.city_id;
      const webhook_callback = webhook_validation.callback_url;

      const data = {
        id: +id,
        city_id: webhook_city,
        callback_url: webhook_callback,
      };

      const delete_webhook = await Webhooks.destroy({
        where: { id },
      });

      if (delete_webhook) {
        return res.status(200).json({
          message: `Webhook has been DELETED SUCCESSFULLY.`,
          data,
        });
      } else {
        return res.status(400).json({
          message: `Webhook; ${webhook_callback} deletion FAILED!!!!`,
        });
      }
    } else {
      return res.status(400).json({
        message: `Webhook record NOT FOUND.`,
      });
    }
  } catch (error) {
    console.error("Error deleting webhooks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
