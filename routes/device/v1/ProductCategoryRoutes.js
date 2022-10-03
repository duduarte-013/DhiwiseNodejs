/**
 * ProductCategoryRoutes.js
 * @description :: CRUD API routes for ProductCategory
 */

const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../../../controller/device/v1/ProductCategoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/productcategory/create').post(auth(PLATFORM.DEVICE),ProductCategoryController.addProductCategory);
router.route('/device/api/v1/productcategory/addBulk').post(auth(PLATFORM.DEVICE),ProductCategoryController.bulkInsertProductCategory);
router.route('/device/api/v1/productcategory/list').post(auth(PLATFORM.DEVICE),ProductCategoryController.findAllProductCategory);
router.route('/device/api/v1/productcategory/count').post(auth(PLATFORM.DEVICE),ProductCategoryController.getProductCategoryCount);
router.route('/device/api/v1/productcategory/:id').get(auth(PLATFORM.DEVICE),ProductCategoryController.getProductCategory);
router.route('/device/api/v1/productcategory/update/:id').put(auth(PLATFORM.DEVICE),ProductCategoryController.updateProductCategory);    
router.route('/device/api/v1/productcategory/partial-update/:id').put(auth(PLATFORM.DEVICE),ProductCategoryController.partialUpdateProductCategory);
router.route('/device/api/v1/productcategory/updateBulk').put(auth(PLATFORM.DEVICE),ProductCategoryController.bulkUpdateProductCategory);
router.route('/device/api/v1/productcategory/softDelete/:id').put(auth(PLATFORM.DEVICE),ProductCategoryController.softDeleteProductCategory);
router.route('/device/api/v1/productcategory/softDeleteMany').put(auth(PLATFORM.DEVICE),ProductCategoryController.softDeleteManyProductCategory);
router.route('/device/api/v1/productcategory/delete/:id').delete(auth(PLATFORM.DEVICE),ProductCategoryController.deleteProductCategory);
router.route('/device/api/v1/productcategory/deleteMany').post(auth(PLATFORM.DEVICE),ProductCategoryController.deleteManyProductCategory);

module.exports = router;
