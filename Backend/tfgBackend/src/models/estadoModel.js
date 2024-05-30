import {sequelizeBd, Sequelize} from '../../db/db.js'


export const Estado = sequelizeBd.define("estado", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
    freezeTableName: true
});

