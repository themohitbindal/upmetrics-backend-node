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
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated user ID',
                            example: '507f1f77bcf86cd799439099'
                        },
                        email: {
                            type: 'string',
                            description: 'User email (unique, immutable)',
                            example: 'john.doe@example.com'
                        },
                        name: {
                            type: 'string',
                            description: 'User name',
                            example: 'John Doe'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 28
                        },
                        profileImage: {
                            type: 'string',
                            description: 'URL of the user profile image (returned as /uploads/filename.jpg)',
                            example: '/uploads/image-1234567890.jpg'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'User last update timestamp'
                        }
                    }
                },
                UserInput: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        email: {
                            type: 'string',
                            description: 'User email (unique, immutable)',
                            example: 'john.doe@example.com'
                        },
                        name: {
                            type: 'string',
                            description: 'User name',
                            example: 'John Doe'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 28
                        },
                        profileImage: {
                            type: 'string',
                            description: 'URL of the user profile image (or file upload via multipart/form-data, max 1MB)',
                            example: 'https://example.com/avatar.jpg'
                        }
                    }
                },
                UserUpdateInput: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User name',
                            example: 'Updated Name'
                        },
                        age: {
                            type: 'number',
                            description: 'User age',
                            example: 30
                        },
                        profileImage: {
                            type: 'string',
                            description: 'URL of the user profile image (or file upload via multipart/form-data, max 1MB)',
                            example: 'https://example.com/new-avatar.jpg'
                        }
                    }
                },
                Category: {
                    type: 'object',
                    required: ['name', 'slug'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Auto-generated category ID',
                            example: '692a7d745c007b92ffde6b92'
                        },
                        name: {
                            type: 'string',
                            description: 'Category display name',
                            example: 'Daily tasks'
                        },
                        slug: {
                            type: 'string',
                            description: 'Category slug (unique, lowercase)',
                            example: 'daily-tasks'
                        },
                        isSystem: {
                            type: 'boolean',
                            description: 'Whether this is a predefined system category',
                            example: true
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Category creation timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Category last update timestamp'
                        }
                    }
                },
                Task: {
                    type: 'object',
                    required: ['title', 'category'],
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
                        category: {
                            oneOf: [
                                { type: 'string', description: 'Category ID', example: '692a7d745c007b92ffde6b92' },
                                { $ref: '#/components/schemas/Category' }
                            ],
                            description: 'Task category (populated object when reading, ID when writing)'
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
                    required: ['title', 'category'],
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
                        },
                        category: {
                            type: 'string',
                            description: 'Category ID to which this task belongs',
                            example: '692a7d745c007b92ffde6b92'
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

