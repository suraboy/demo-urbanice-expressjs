'use strict';
import moment from 'moment'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define('Contacts', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            get() {
                return this.getDataValue('id');
            }
        },
        first_name: {
            type: DataTypes.STRING,
            field: 'first_name',
            get() {
                return this.getDataValue('first_name');
            }
        }, last_name: {
            type: DataTypes.STRING,
            field: 'last_name',
            get() {
                return this.getDataValue('last_name');
            }
        }, birth_date: {
            type: DataTypes.DATE,
            field: 'birth_date',
            get() {
                const dateText = this.getDataValue('birth_date');
                return moment(dateText).format("YYYY-MM-DD");
            }
        }, phone: {
            type: DataTypes.STRING,
            field: 'phone',
            get() {
                return this.getDataValue('phone');
            }
        }, email: {
            type: DataTypes.STRING,
            field: 'email',
            get() {
                return this.getDataValue('email');
            }
        }, url: {
            type: DataTypes.BIGINT(11),
            field: 'url',
            get() {
                return this.getDataValue('url');
            }
        }, group_id: {
            type: DataTypes.STRING,
            field: 'group_id',
            primaryKey: false,
            references: {
                model: 'groups',
                key: 'group_id'
            },
            get() {
                return this.getDataValue('group_id');
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
        }
    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: 'contacts'
    });
    Contacts.associate = function (models) {
        Contacts.belongsTo(models.Groups, {
            foreignKey: "group_id",
            as: "groups",
        });
    };

    sequelizePaginate.paginate(Contacts)
    return Contacts;
};