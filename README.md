# VRV-Security-Backend
## Project Overview

This project implements a sophisticated Role-Based Access Control (RBAC) system for VRV Security's backend infrastructure. The system provides secure authentication, granular authorization, and comprehensive audit logging capabilities, built using Node.js, Express, and MongoDB Atlas.

## Core Features

### 1. Authentication System
- Secure user registration and login using JWT (JSON Web Tokens)
- Password hashing using bcrypt with salt rounds
- Account status management (active/suspended/pending)
- Login attempt tracking to prevent brute force attacks
- Support for two-factor authentication
- Session management with configurable token expiry

### 2. Role-Based Access Control
- Hierarchical role system with configurable permission levels
- Granular permission control based on resources and actions
- Role inheritance and hierarchy enforcement
- Prevention of privilege escalation
- Dynamic permission checking middleware
- Flexible role assignment and management

### 3. Security Features
- Rate limiting to prevent DoS attacks
- CORS protection for API endpoints
- Helmet security headers
- Input validation using express-validator
- Secure password policies
- Protection against common web vulnerabilities

### 4. Audit Logging
- Comprehensive activity tracking
- User action logging with IP and user agent details
- Timestamp-based audit trails
- Structured logging format for easy analysis

## Technical Implementation

### Architecture
The system follows a modular architecture with clear separation of concerns:
```
src/
├── controllers/# Business logic
├── middleware/ # Custom middleware
├── models/     # Database schemas
├── routes/     # API routes
└── utils/      # Helper functions
```

### Database Schema Design

1. User Model:
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  roles: [RoleSchema],
  status: String,
  lastLogin: Date,
  loginAttempts: {
    count: Number,
    lastAttempt: Date
  }
}
```

2. Role Model:
```javascript
{
  name: String,
  permissions: [{
    resource: String,
    actions: [String]
  }],
  level: Number,
  description: String
}
```

3. Audit Log Model:
```javascript
{
  user: ObjectId,
  action: String,
  resource: String,
  details: Mixed,
  ip: String,
  userAgent: String,
  timestamp: Date
}
```
## To test the backend:
### Install dependencies
```
npm install
```
### Create .env file with your MongoDB Atlas URI
```
"MONGODB_URI=your_atlas_uri"
"JWT_SECRET=your_secret" 
"JWT_EXPIRY=24h"
"PORT=3000" 
```
## Start the server:
```
node src/server.js
```
## Role in Implementation

As the developer of this RBAC system, my responsibilities included:
1. Designing the system architecture
2. Implementing the core authentication and authorization logic
3. Creating the database schemas and models
4. Building the API endpoints and middleware
5. Implementing security features
6. Writing tests and documentation
7. Setting up the development environment
8. Creating deployment configurations

## Conclusion

This RBAC implementation provides a secure, scalable, and maintainable solution for managing user access and permissions. The system follows security best practices and industry standards while remaining flexible enough to accommodate future enhancements and integrations.
