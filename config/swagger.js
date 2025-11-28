import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description: 'A simple REST API for managing tasks with CRUD operations',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Task: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated task ID',
                            example: '507f1f77bcf86cd799439011'
                        },
                        title: {
                            type: 'string',
                            description: 'Task title',
                            maxLength: 200,
                            example: 'Complete project documentation'
                        },
                        description: {
                            type: 'string',
                            description: 'Task description',
                            maxLength: 1000,
                            example: 'Write comprehensive documentation for the project'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            default: 'pending',
                            description: 'Task status',
                            example: 'pending'
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            default: 'medium',
                            description: 'Task priority',
                            example: 'medium'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Task creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Task last update timestamp'
                        }
                    }
                },
                TaskInput: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Task title',
                            maxLength: 200,
                            example: 'Complete project documentation'
                        },
                        description: {
                            type: 'string',
                            description: 'Task description',
                            maxLength: 1000,
                            example: 'Write comprehensive documentation for the project'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            default: 'pending',
                            description: 'Task status',
                            example: 'pending'
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            default: 'medium',
                            description: 'Task priority',
                            example: 'medium'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        },
                        error: {
                            type: 'string',
                            example: 'Detailed error description'
                        }
                    }
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        count: {
                            type: 'number',
                            description: 'Number of tasks (for GET all)',
                            example: 5
                        },
                        data: {
                            type: 'object',
                            description: 'Task or array of tasks'
                        },
                        message: {
                            type: 'string',
                            description: 'Success message (for DELETE)',
                            example: 'Task deleted successfully'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

