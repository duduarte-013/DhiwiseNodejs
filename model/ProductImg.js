/**
 * ProductImg.js
 * @description :: sequelize model of database table ProductImg
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let ProductImg = sequelize.define('ProductImg',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  imageUrl:{ type:DataTypes.STRING },
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
      async function (ProductImg,options){
        ProductImg.isActive = true;
        ProductImg.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (ProductImg,options){
        if (ProductImg !== undefined && ProductImg.length) { 
          for (let index = 0; index < ProductImg.length; index++) { 
        
            const element = ProductImg[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
ProductImg.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(ProductImg);
sequelizePaginate.paginate(ProductImg);
module.exports = ProductImg;
