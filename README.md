# Product Catalog Service

## Description
A robust backend microservice for an e-commerce platform that manages a product catalog. This project demonstrates the usage of the Repository Pattern and Unit of Work pattern in Node.js with Express and Sequelize.

## Technologies
- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- Docker & Docker Compose

## Architecture
- **Layered Architecture**: Controller -> Service -> Repository -> Data Model
- **Repository Pattern**: Abstracts data access logic.
- **Unit of Work**: Manages transactions and ensures data consistency across multiple repositories.

## Setup and Run

### Prerequisites
- Docker and Docker Compose installed.

### Steps
1. Clone the repository.
2. Run the following command to start the application and database:
   ```bash
   docker-compose up --build
   ```
3. The application will be available at `http://localhost:3000`.
4. The database will be automatically seeded with sample data on first run.

## API Endpoints

### Products
- `POST /products`: Create a new product.
- `GET /products`: Get all products (paginated).
- `GET /products/search`: Advanced search (q, category_id, min_price, max_price).
- `GET /products/{id}`: Get a product by ID.
- `PUT /products/{id}`: Update a product.
- `DELETE /products/{id}`: Delete a product.

### Categories
- `POST /categories`: Create a new category.
- `GET /categories`: Get all categories.
- `GET /categories/{id}`: Get a category by ID.
- `PUT /categories/{id}`: Update a category.
- `DELETE /categories/{id}`: Delete a category.

## Testing
To run the unit tests:
```bash
npm test
```
(Note: You might need to install dependencies locally with `npm install` if running outside Docker).
