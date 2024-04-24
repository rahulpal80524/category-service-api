import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { where } from 'sequelize';


export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await Category.create(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Other CRUD operations for Category

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const categoryId = parseInt(req.params.categoryId);
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    category.name = name;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeEmptyCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const servicesCount = await category.countServices();
    
    if (servicesCount === 0) {
      await category.destroy();
      res.json({ message: 'Category removed successfully' });
    } else {
      res.status(400).json({ error: 'Category has services, cannot remove' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
