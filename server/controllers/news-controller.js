const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const NewsModel = require('../models/news-model');
const CategoryModel = require('../models/category-model');
class NewsController {
    
    async createNews(req, res, next) {
        try {
            const { img, title, description, status, categoryName } = req.body;
    
            // Проверяем, что categoryName является строкой
            if (typeof categoryName !== 'string') {
                return res.status(400).json({ message: 'Имя категории должно быть строкой' });
            }
    
            // Ищем категорию по имени
            let category = await CategoryModel.findOne({ name: categoryName });
    
            // Если категория не найдена, добавляем новую
            if (!category) {
                category = await CategoryModel.create({ name: categoryName });
            }
    
            // Создаем новость с учетом найденной или созданной категории
            const newNews = await NewsModel.create({
                img,
                title,
                description,
                status,
                categoryId: category._id
            });
    
            return res.json(newNews);
        } catch (e) {
            // Обрабатываем возможные ошибки
            next(e);
        }
    }
    async deleteNews(req, res, next) {
        try {
            const {_id} = req.body;
            const deletedNews = await NewsModel.findByIdAndDelete(_id);
            return res.json(deletedNews);
        } catch (e) {
            next(e);
        }
    }
    async updateNews(req, res, next) {
        try {
            const { _id, img, title, description, status, categoryName } = req.body;
    
            // Проверяем, что categoryName является строкой
            if (typeof categoryName !== 'string') {
                return res.status(400).json({ message: 'Имя категории должно быть строкой' });
            }
    
            // Ищем категорию по имени
            let category = await CategoryModel.findOne({ name: categoryName });
    
            // Если категория не найдена, добавляем новую
            if (!category) {
                category = await CategoryModel.create({ name: categoryName });
            }
    
            // Обновляем данные новости
            let updatedNews;
            if (category) {
                updatedNews = await NewsModel.findByIdAndUpdate(
                    _id,
                    { img, title, description, status, categoryId: category._id },
                    { upsert: false, returnOriginal: false }
                );
            } else {
                // В случае ошибки или отсутствия категории возвращаем сообщение об ошибке
                return res.status(404).json({ message: 'Категория не найдена' });
            }
    
            return res.json(updatedNews);
        } catch (e) {
            // Обрабатываем возможные ошибки
            next(e);
        }
    }
    async  getAllNews(req, res, next) {
        try {
            // Получаем все новости
            const news = await NewsModel.find();
    
            const newsWithCategories = await Promise.all(news.map(async (item) => {
                const category = await CategoryModel.findById(item.categoryId);
                return { ...item._doc, category: category };
            }));
    
           
            res.json(newsWithCategories);
        } catch (error) {
            next(error);
        }
    }
    async getNewsById(req, res, next) {
        try {
            const { _id } = req.body;
            const news = await NewsModel.findById(_id);
    
            if (!news) {
                return res.status(404).json({ error: 'Новость не найдена' });
            }
    
            // Создаем массив из одной новости
            const newsArray = [news];
    
            // Получаем информацию о категории для каждой новости
            const newsWithCategory = await Promise.all(newsArray.map(async (item) => {
                const category = await CategoryModel.findById(item.categoryId);
                return { ...item._doc, category: category };
            }));
    
            res.json(newsWithCategory);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new NewsController();
