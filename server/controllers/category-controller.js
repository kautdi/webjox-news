const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const CategoryModel = require('../models/category-model');

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const {categoryId, name} = req.body;
            const category = await CategoryModel.create({name})
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new CategoryController();
