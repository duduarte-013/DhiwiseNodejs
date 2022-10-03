/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/admin/categoryController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
router.route('/admin/category/create').post(categoryController.addCategory);
router.route('/admin/category/addBulk').post(categoryController.bulkInsertCategory);
router.route('/admin/category/list').post(categoryController.findAllCategory);
router.route('/admin/category/count').post(categoryController.getCategoryCount);
router.route('/admin/category/:id').get(categoryController.getCategory);
router.route('/admin/category/update/:id').put(categoryController.updateCategory);    
router.route('/admin/category/partial-update/:id').put(categoryController.partialUpdateCategory);
router.route('/admin/category/updateBulk').put(categoryController.bulkUpdateCategory);
router.route('/admin/category/softDelete/:id').put(categoryController.softDeleteCategory);
router.route('/admin/category/softDeleteMany').put(categoryController.softDeleteManyCategory);
router.route('/admin/category/delete/:id').delete(categoryController.deleteCategory);
router.route('/admin/category/deleteMany').post(categoryController.deleteManyCategory);

module.exports = router;
