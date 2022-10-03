/**
 * ProductCategory.js
 * @description :: sequelize model of database table ProductCategory
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let ProductCategory = sequelize.define('ProductCategory',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  productId:{ type:DataTypes.INTEGER },
  categoryId:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (ProductCategory,options){
        ProductCategory.isActive = true;
        ProductCategory.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (ProductCategory,options){
        if (ProductCategory !== undefined && ProductCategory.length) { 
          for (let index = 0; index < ProductCategory.length; index++) { 
        
            const element = ProductCategory[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
ProductCategory.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(ProductCategory);
sequelizePaginate.paginate(ProductCategory);
module.exports = ProductCategory;
