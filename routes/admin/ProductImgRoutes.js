/**
 * ProductImgRoutes.js
 * @description :: CRUD API routes for ProductImg
 */

const express = require('express');
const router = express.Router();
const ProductImgController = require('../../controller/admin/ProductImgController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/productimg/create').post(ProductImgController.addProductImg);
router.route('/admin/productimg/addBulk').post(ProductImgController.bulkInsertProductImg);
router.route('/admin/productimg/list').post(ProductImgController.findAllProductImg);
router.route('/admin/productimg/count').post(ProductImgController.getProductImgCount);
router.route('/admin/productimg/:id').get(ProductImgController.getProductImg);
router.route('/admin/productimg/update/:id').put(ProductImgController.updateProductImg);    
router.route('/admin/productimg/partial-update/:id').put(ProductImgController.partialUpdateProductImg);
router.route('/admin/productimg/updateBulk').put(ProductImgController.bulkUpdateProductImg);
router.route('/admin/productimg/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ProductImgController.softDeleteProductImg);
router.route('/admin/productimg/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ProductImgController.softDeleteManyProductImg);
router.route('/admin/productimg/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ProductImgController.deleteProductImg);
router.route('/admin/productimg/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ProductImgController.deleteManyProductImg);

module.exports = router;
