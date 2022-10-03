/**
 * ProductCategoryValidation.js
 * @description :: validate each post and put request as per ProductCategory model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of ProductCategory */
exports.schemaKeys = joi.object({
  productId: joi.number().integer().allow(0),
  categoryId: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of ProductCategory for updation */
exports.updateSchemaKeys = joi.object({
  productId: joi.number().integer().allow(0),
  categoryId: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of ProductCategory for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      productId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      categoryId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
