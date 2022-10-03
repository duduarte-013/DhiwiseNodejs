/**
 * ProductCategoryRoutes.js
 * @description :: CRUD API routes for ProductCategory
 */

const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../../controller/admin/ProductCategoryController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/productcategory/create').post(ProductCategoryController.addProductCategory);
router.route('/admin/productcategory/addBulk').post(ProductCategoryController.bulkInsertProductCategory);
router.route('/admin/productcategory/list').post(ProductCategoryController.findAllProductCategory);
router.route('/admin/productcategory/count').post(ProductCategoryController.getProductCategoryCount);
router.route('/admin/productcategory/:id').get(ProductCategoryController.getProductCategory);
router.route('/admin/productcategory/update/:id').put(ProductCategoryController.updateProductCategory);    
router.route('/admin/productcategory/partial-update/:id').put(ProductCategoryController.partialUpdateProductCategory);
router.route('/admin/productcategory/updateBulk').put(ProductCategoryController.bulkUpdateProductCategory);
router.route('/admin/productcategory/softDelete/:id').put(ProductCategoryController.softDeleteProductCategory);
router.route('/admin/productcategory/softDeleteMany').put(ProductCategoryController.softDeleteManyProductCategory);
router.route('/admin/productcategory/delete/:id').delete(ProductCategoryController.deleteProductCategory);
router.route('/admin/productcategory/deleteMany').post(ProductCategoryController.deleteManyProductCategory);

module.exports = router;
