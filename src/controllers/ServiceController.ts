import { Request, Response } from 'express';
import { Service } from '../models/Service';

export const createService = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;
    const service = await Service.create({ categoryId, name, type });
    
    if (priceOptions && priceOptions.length > 0) {
      await service.$add('priceOptions', priceOptions);
    }
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Other CRUD operations for Service

export const getServicesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const services = await Service.findAll({ where: { categoryId } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const removeService = async (req: Request, res: Response) => {
  try {
    const { categoryId, serviceId } = req.params;
    const service = await Service.findOne({ where: { id: serviceId, categoryId } });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    await service.destroy();
    res.json({ message: 'Service removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;
    const service = await Service.findOne({ where: { id: serviceId, categoryId } });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    service.name = name || service.name;
    service.type = type || service.type;
    await service.save();
    
    if (priceOptions && priceOptions.length > 0) {
      await service.$add('priceOptions', priceOptions);
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
