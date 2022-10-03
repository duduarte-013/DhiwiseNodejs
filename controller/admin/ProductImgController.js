/**
 * ProductImgController.js
 * @description :: exports action methods for ProductImg.
 */

const ProductImg = require('../../model/ProductImg');
const ProductImgSchemaKey = require('../../utils/validation/ProductImgValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of ProductImg in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created ProductImg. {status, message, data}
 */ 
const addProductImg = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ProductImgSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdProductImg = await dbService.createOne(ProductImg,dataToCreate);
    return  res.success({ data :createdProductImg });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of ProductImg in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created ProductImgs. {status, message, data}
 */
const bulkInsertProductImg = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdProductImg = await dbService.createMany(ProductImg,dataToCreate); 
      return  res.success({ data :{ count :createdProductImg.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of ProductImg from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found ProductImg(s). {status, message, data}
 */
const findAllProductImg = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundProductImg;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      ProductImgSchemaKey.findFilterKeys,
      ProductImg.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundProductImg = await dbService.count(ProductImg, query);
      if (!foundProductImg) {
        return res.recordNotFound();
      } 
      foundProductImg = { totalRecords: foundProductImg };
      return res.success({ data :foundProductImg });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundProductImg = await dbService.paginate( ProductImg,query,options);
    if (!foundProductImg){
      return res.recordNotFound();
    }
    return res.success({ data:foundProductImg }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of ProductImg from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found ProductImg. {status, message, data}
 */
const getProductImg = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundProductImg = await dbService.findOne(ProductImg,{ id :id });
    if (!foundProductImg){
      return res.recordNotFound();
    }
    return  res.success({ data :foundProductImg });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of ProductImg.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getProductImgCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      ProductImgSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedProductImg = await dbService.count(ProductImg,where);
    if (!countedProductImg){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedProductImg } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of ProductImg with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProductImg.
 * @return {Object} : updated ProductImg. {status, message, data}
 */
const updateProductImg = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ProductImgSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedProductImg = await dbService.update(ProductImg,query,dataToUpdate);
    return  res.success({ data :updatedProductImg }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of ProductImg with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProductImgs.
 * @return {Object} : updated ProductImgs. {status, message, data}
 */
const bulkUpdateProductImg = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedProductImg = await dbService.update(ProductImg,filter,dataToUpdate);
    if (!updatedProductImg){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedProductImg.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of ProductImg with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ProductImg.
 * @return {Object} : updated ProductImg. {status, message, data}
 */
const partialUpdateProductImg = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ProductImgSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedProductImg = await dbService.update(ProductImg, query, dataToUpdate);
    if (!updatedProductImg) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedProductImg });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of ProductImg from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of ProductImg.
 * @return {Object} : deactivated ProductImg. {status, message, data}
 */
const softDeleteProductImg = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(ProductImg, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of ProductImg from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted ProductImg. {status, message, data}
 */
const deleteProductImg = async (req, res) => {
  const result = await dbService.deleteByPk(ProductImg, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of ProductImg in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyProductImg = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedProductImg = await dbService.destroy(ProductImg,query);
    return res.success({ data :{ count :deletedProductImg.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of ProductImg from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of ProductImg.
 * @return {Object} : number of deactivated documents of ProductImg. {status, message, data}
 */
const softDeleteManyProductImg = async (req, res) => {
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
    let updatedProductImg = await dbService.update(ProductImg,query,updateBody, options);
    if (!updatedProductImg) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedProductImg.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addProductImg,
  bulkInsertProductImg,
  findAllProductImg,
  getProductImg,
  getProductImgCount,
  updateProductImg,
  bulkUpdateProductImg,
  partialUpdateProductImg,
  softDeleteProductImg,
  deleteProductImg,
  deleteManyProductImg,
  softDeleteManyProductImg,
};
