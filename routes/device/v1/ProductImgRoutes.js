/**
 * ProductImgRoutes.js
 * @description :: CRUD API routes for ProductImg
 */

const express = require('express');
const router = express.Router();
const ProductImgController = require('../../../controller/device/v1/ProductImgController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/productimg/create').post(ProductImgController.addProductImg);
router.route('/device/api/v1/productimg/addBulk').post(ProductImgController.bulkInsertProductImg);
router.route('/device/api/v1/productimg/list').post(auth(PLATFORM.DEVICE),ProductImgController.findAllProductImg);
router.route('/device/api/v1/productimg/count').post(auth(PLATFORM.DEVICE),ProductImgController.getProductImgCount);
router.route('/device/api/v1/productimg/:id').get(auth(PLATFORM.DEVICE),ProductImgController.getProductImg);
router.route('/device/api/v1/productimg/update/:id').put(ProductImgController.updateProductImg);    
router.route('/device/api/v1/productimg/partial-update/:id').put(ProductImgController.partialUpdateProductImg);
router.route('/device/api/v1/productimg/updateBulk').put(ProductImgController.bulkUpdateProductImg);
router.route('/device/api/v1/productimg/softDelete/:id').put(ProductImgController.softDeleteProductImg);
router.route('/device/api/v1/productimg/softDeleteMany').put(ProductImgController.softDeleteManyProductImg);
router.route('/device/api/v1/productimg/delete/:id').delete(ProductImgController.deleteProductImg);
router.route('/device/api/v1/productimg/deleteMany').post(ProductImgController.deleteManyProductImg);

module.exports = router;
