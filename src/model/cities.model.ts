import {DataTypes, Model} from 'sequelize'
import { db } from '../database_connect/db_connect'

export type CITY = {
    id:number,
    name:string,
    latitude:number,
    longitude:number,
}

class Cities extends Model<CITY>{}

Cities.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    latitude:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    longitude:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
}, {
    sequelize:db,
    tableName: "Cities",
    modelName: "Cities"
})

export default Cities















