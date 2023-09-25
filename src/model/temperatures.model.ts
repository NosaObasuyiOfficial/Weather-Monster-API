import {DataTypes, Model} from 'sequelize'
import { db } from '../database_connect/db_connect'
import Cities from './cities.model'

export type TEMPERATURE = {
    id:number,
    city_id:number,
    max:number,
    min:number,
    timestamp:number
}

class Temperatures extends Model<TEMPERATURE>{
    public static associate(models: { Cities: typeof Cities }): void {
        Temperatures.belongsTo(models.Cities, {foreignKey:'name', as:'Cities'} )
    }
}

Temperatures.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
   city_id:{
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    max:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    min:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    timestamp:{
        type: DataTypes.BIGINT,
        allowNull:false
    },
}, {
    sequelize:db,
    tableName: "Temperatures",
    modelName: "Temperatures"
})

export default Temperatures


