import {DataTypes, Model} from 'sequelize'
import { test_db } from '../database_connect/test_dbconnect'

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
    sequelize: test_db,
    tableName: "Cities",
    modelName: "Cities"
})

export default Cities















