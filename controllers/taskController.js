import Task from '../models/Task.js';
import Category from '../models/Category.js';

// get all tasks
export const getTasks = async (req, res) => {
    try {
        const filter = {};
        if (req.query.categoryId) {
            filter.category = req.query.categoryId;
        }
        const tasks = await Task.find(filter)
            .populate('category')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            error: error.message
        });
    }
};

// get single task (although not needed now) ; todo: remove later if not used
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('category');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching task',
            error: error.message
        });
    }
};

// create new task
export const createTask = async (req, res) => {
    try {
        const { category: categoryId } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category',
            });
        }

        const task = await Task.create({
            ...req.body,
            category: categoryId,
        });
        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating task',
            error: error.message
        });
    }
};

// update task
export const updateTask = async (req, res) => {
    try {
        if (req.body.category) {
            const category = await Category.findById(req.body.category);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category',
                });
            }
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        const populatedTask = await Task.findById(task._id).populate('category');

        res.status(200).json({
            success: true,
            data: populatedTask
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating task',
            error: error.message
        });
    }
};

// delete task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            error: error.message
        });
    }
};

