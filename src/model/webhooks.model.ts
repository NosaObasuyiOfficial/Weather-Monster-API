import {DataTypes, Model} from 'sequelize'
import { db } from '../database_connect/db_connect'
import Temperatures from './temperatures.model'

export type WEBHOOKS = {
    id:number,
    city_id:number,
    callback_url: string,
}

class Webhooks extends Model<WEBHOOKS>{
    public static associate(models: { Temperatures: typeof Temperatures }): void {
        Webhooks.belongsTo(models.Temperatures, {foreignKey:'city_id', as:'city_id'} )
    }
}

Webhooks.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    city_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    callback_url:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize:db,
    tableName: "Webhooks",
    modelName: "Webhooks"
})

export default Webhooks











