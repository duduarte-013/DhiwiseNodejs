/**
 * ProductCategoryController.js
 * @description :: exports action methods for ProductCategory.
 */

const ProductCategory = require('../../../model/ProductCategory');
const ProductCategorySchemaKey = require('../../../utils/validation/ProductCategoryValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of ProductCategory in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created ProductCategory. {status, message, data}
 */ 
const addProductCategory = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ProductCategorySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdProductCategory = await dbService.createOne(ProductCategory,dataToCreate);
    return  res.success({ data :createdProductCategory });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of ProductCategory in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created ProductCategorys. {status, message, data}
 */
const bulkInsertProductCategory = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdProductCategory = await dbService.createMany(ProductCategory,dataToCreate); 
      return  res.success({ data :{ count :createdProductCategory.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of ProductCategory from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found ProductCategory(s). {status, message, data}
 */
const findAllProductCategory = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundProductCategory;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      ProductCategorySchemaKey.findFilterKeys,
      ProductCategory.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundProductCategory = await dbService.count(ProductCategory, query);
      if (!foundProductCategory) {
        return res.recordNotFound();
      } 
      foundProductCategory = { totalRecords: foundProductCategory };
      return res.success({ data :foundProductCategory });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundProductCategory = await dbService.paginate( ProductCategory,query,options);
    if (!foundProductCategory){
      return res.recordNotFound();
    }
    return res.success({ data:foundProductCategory }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of ProductCategory from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found ProductCategory. {status, message, data}
 */
const getProductCategory = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundProductCategory = await dbService.findOne(ProductCategory,{ id :id });
    if (!foundProductCategory){
      return res.recordNotFound();
    }
    return  res.success({ data :foundProductCategory });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of ProductCategory.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getProductCategoryCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      ProductCategorySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedProductCategory = await dbService.count(ProductCategory,where);
    if (!countedProductCategory){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedProductCategory } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of ProductCategory with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProductCategory.
 * @return {Object} : updated ProductCategory. {status, message, data}
 */
const updateProductCategory = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ProductCategorySchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedProductCategory = await dbService.update(ProductCategory,query,dataToUpdate);
    return  res.success({ data :updatedProductCategory }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of ProductCategory with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProductCategorys.
 * @return {Object} : updated ProductCategorys. {status, message, data}
 */
const bulkUpdateProductCategory = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedProductCategory = await dbService.update(ProductCategory,filter,dataToUpdate);
    if (!updatedProductCategory){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedProductCategory.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of ProductCategory with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProductCategory.
 * @return {Object} : updated ProductCategory. {status, message, data}
 */
const partialUpdateProductCategory = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ProductCategorySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedProductCategory = await dbService.update(ProductCategory, query, dataToUpdate);
    if (!updatedProductCategory) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedProductCategory });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of ProductCategory from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of ProductCategory.
 * @return {Object} : deactivated ProductCategory. {status, message, data}
 */
const softDeleteProductCategory = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(ProductCategory, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of ProductCategory from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted ProductCategory. {status, message, data}
 */
const deleteProductCategory = async (req, res) => {
  const result = await dbService.deleteByPk(ProductCategory, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of ProductCategory in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyProductCategory = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedProductCategory = await dbService.destroy(ProductCategory,query);
    return res.success({ data :{ count :deletedProductCategory.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of ProductCategory from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of ProductCategory.
 * @return {Object} : number of deactivated documents of ProductCategory. {status, message, data}
 */
const softDeleteManyProductCategory = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedProductCategory = await dbService.update(ProductCategory,query,updateBody, options);
    if (!updatedProductCategory) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedProductCategory.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addProductCategory,
  bulkInsertProductCategory,
  findAllProductCategory,
  getProductCategory,
  getProductCategoryCount,
  updateProductCategory,
  bulkUpdateProductCategory,
  partialUpdateProductCategory,
  softDeleteProductCategory,
  deleteProductCategory,
  deleteManyProductCategory,
  softDeleteManyProductCategory,
};
