'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        group_name: {
            type: DataTypes.STRING,
            field: 'group_name',
            get() {
                return this.getDataValue('group_name');
            }
        },
        created_at: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                const dateText = this.getDataValue('created_at');
                return moment(dateText).toISOString(true);
            }
        },
        updated_at: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                const dateText = this.getDataValue('updated_at');
                return moment(dateText).toISOString(true);
            }
        },
    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: 'groups'
    });

    Groups.associate = function (models) {
        Groups.hasMany(models.Contacts, { as: "contacts" });
    };

    sequelizePaginate.paginate(Groups)
    return Groups;
};