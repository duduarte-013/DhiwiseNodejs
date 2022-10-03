/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let ProductImg = require('../model/ProductImg');
let ProductCategory = require('../model/ProductCategory');
let Category = require('../model/category');
let Product = require('../model/product');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteProductImg = async (filter) =>{
  try {
    let response  = await dbService.destroy(ProductImg,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProductCategory = async (filter) =>{
  try {
    let response  = await dbService.destroy(ProductCategory,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findAll(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const ProductCategoryFilter = { $or: [{ categoryId : { $in : category } }] };
      const ProductCategoryCnt = await dbService.destroy(ProductCategory,ProductCategoryFilter);

      let deleted  = await dbService.destroy(Category,filter);
      let response = { ProductCategory :ProductCategoryCnt.length, };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProduct = async (filter) =>{
  try {
    let product = await dbService.findAll(Product,filter);
    if (product && product.length){
      product = product.map((obj) => obj.id);

      const ProductCategoryFilter = { $or: [{ productId : { $in : product } }] };
      const ProductCategoryCnt = await dbService.destroy(ProductCategory,ProductCategoryFilter);

      let deleted  = await dbService.destroy(Product,filter);
      let response = { ProductCategory :ProductCategoryCnt.length, };
      return response; 
    } else {
      return {  product : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const ProductImgFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ProductImgCnt = await dbService.destroy(ProductImg,ProductImgFilter);

      const ProductCategoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ProductCategoryCnt = await dbService.destroy(ProductCategory,ProductCategoryFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt = await dbService.destroy(Category,categoryFilter);

      const productFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt = await dbService.destroy(Product,productFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        ProductImg :ProductImgCnt.length,
        ProductCategory :ProductCategoryCnt.length,
        category :categoryCnt.length,
        product :productCnt.length,
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countProductImg = async (filter) =>{
  try {
    const ProductImgCnt =  await dbService.count(ProductImg,filter);
    return { ProductImg : ProductImgCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countProductCategory = async (filter) =>{
  try {
    const ProductCategoryCnt =  await dbService.count(ProductCategory,filter);
    return { ProductCategory : ProductCategoryCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findAll(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const ProductCategoryFilter = { $or: [{ categoryId : { $in : category } }] };
      const ProductCategoryCnt =  await dbService.count(ProductCategory,ProductCategoryFilter);

      let response = { ProductCategory : ProductCategoryCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProduct = async (filter) =>{
  try {
    let product = await dbService.findAll(Product,filter);
    if (product && product.length){
      product = product.map((obj) => obj.id);

      const ProductCategoryFilter = { $or: [{ productId : { $in : product } }] };
      const ProductCategoryCnt =  await dbService.count(ProductCategory,ProductCategoryFilter);

      let response = { ProductCategory : ProductCategoryCnt, };
      return response; 
    } else {
      return {  product : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const ProductImgFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ProductImgCnt =  await dbService.count(ProductImg,ProductImgFilter);

      const ProductCategoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ProductCategoryCnt =  await dbService.count(ProductCategory,ProductCategoryFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const productFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt =  await dbService.count(Product,productFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        ProductImg : ProductImgCnt,
        ProductCategory : ProductCategoryCnt,
        category : categoryCnt,
        product : productCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProductImg = async (filter,updateBody) =>{  
  try {
    const ProductImgCnt =  await dbService.update(ProductImg,filter);
    return { ProductImg : ProductImgCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProductCategory = async (filter,updateBody) =>{  
  try {
    const ProductCategoryCnt =  await dbService.update(ProductCategory,filter);
    return { ProductCategory : ProductCategoryCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findAll(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const ProductCategoryFilter = { '$or': [{ categoryId : { '$in' : category } }] };
      const ProductCategoryCnt = await dbService.update(ProductCategory,ProductCategoryFilter,updateBody);
      let updated = await dbService.update(Category,filter,updateBody);

      let response = { ProductCategory :ProductCategoryCnt.length, };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProduct = async (filter,updateBody) =>{  
  try {
    let product = await dbService.findAll(Product,filter, { id:1 });
    if (product.length){
      product = product.map((obj) => obj.id);

      const ProductCategoryFilter = { '$or': [{ productId : { '$in' : product } }] };
      const ProductCategoryCnt = await dbService.update(ProductCategory,ProductCategoryFilter,updateBody);
      let updated = await dbService.update(Product,filter,updateBody);

      let response = { ProductCategory :ProductCategoryCnt.length, };
      return response;
    } else {
      return {  product : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const ProductImgFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ProductImgCnt = await dbService.update(ProductImg,ProductImgFilter,updateBody);

      const ProductCategoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ProductCategoryCnt = await dbService.update(ProductCategory,ProductCategoryFilter,updateBody);

      const categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoryCnt = await dbService.update(Category,categoryFilter,updateBody);

      const productFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const productCnt = await dbService.update(Product,productFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        ProductImg :ProductImgCnt.length,
        ProductCategory :ProductCategoryCnt.length,
        category :categoryCnt.length,
        product :productCnt.length,
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteProductImg,
  deleteProductCategory,
  deleteCategory,
  deleteProduct,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countProductImg,
  countProductCategory,
  countCategory,
  countProduct,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteProductImg,
  softDeleteProductCategory,
  softDeleteCategory,
  softDeleteProduct,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
