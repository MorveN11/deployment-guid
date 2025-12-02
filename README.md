# 🚀 Deployment Guide - Docker Microservices Example

A comprehensive example of a microservices architecture using Docker, demonstrating best practices for containerization, orchestration, and CI/CD automation.

## 📋 Overview

This project showcases a complete microservices setup with:

- **Products API** (.NET 9 + PostgreSQL + Entity Framework Core)
- **Categories API** (Python 3.12 + FastAPI)
- **Frontend** (Vite + React + TypeScript)
- **Docker Orchestration** (docker-compose)
- **CI/CD Pipeline** (GitHub Actions)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│                    Port: 3000 (nginx)                    │
└────────────┬──────────────────────────┬─────────────────┘
             │                          │
             │                          │
    ┌────────▼────────┐        ┌────────▼────────┐
    │  Products API   │        │ Categories API  │
    │   (.NET 9)      │        │  (FastAPI)      │
    │   Port: 4001    │        │   Port: 4002    │
    └────────┬────────┘        └─────────────────┘
             │
             │
    ┌────────▼────────┐
    │   PostgreSQL    │
    │   Port: 5432    │
    └─────────────────┘
```

## ✨ Features

### .NET Products API

- ✅ ASP.NET Core 9.0 Web API
- ✅ Entity Framework Core with PostgreSQL
- ✅ Automatic migrations in development
- ✅ CORS configuration
- ✅ Health check endpoint
- ✅ Seed data for demo purposes

### Python Categories API

- ✅ FastAPI framework
- ✅ Static data endpoint
- ✅ CORS middleware
- ✅ Health check endpoint
- ✅ Async/await support

### React Frontend

- ✅ Vite + React + TypeScript
- ✅ Modern UI with glassmorphism
- ✅ Responsive design
- ✅ API integration with both microservices
- ✅ Environment-based configuration
- ✅ Nginx for production serving

### Docker & DevOps

- ✅ Multi-stage Docker builds
- ✅ Centralized docker-compose orchestration
- ✅ Development overrides for local development
- ✅ Volume persistence for database
- ✅ GitHub Actions CI/CD pipeline
- ✅ Automatic migrations on deployment

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development)
- .NET 9 SDK (for local .NET development)
- Python 3.12+ (for local Python development)

### Running with Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd deployment-guide
   ```

2. **Start all services**

   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: <http://localhost:3000>
   - Products API: <http://localhost:4001/api/products>
   - Categories API: <http://localhost:4002/api/categories>
   - Products API Health: <http://localhost:4001/health>
   - Categories API Health: <http://localhost:4002/health>

4. **View logs**

   ```bash
   # All services
   npm run logs

   # Specific service
   npm run logs:products
   npm run logs:categories
   npm run logs:frontend
   ```

5. **Stop all services**

   ```bash
   docker compose down

   # With volumes (clean database)
   npm run down:volumes
   ```

## 🛠️ Development

### Local Development (Without Docker)

#### Products API (.NET)

```bash
cd services/dotnet-products-api

# Restore dependencies
dotnet restore

# Run migrations (requires PostgreSQL running)
dotnet ef database update

# Run the API
dotnet run
```

#### Categories API (Python)

```bash
cd services/python-categories-api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the API
uvicorn main:app --reload --port 8080
```

#### Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Database Migrations

The .NET API automatically runs migrations on startup in development mode. For production:

```bash
# Install EF Core tools
npm run ef:install

# Create migration bundle
npm run ef:bundle

# Run migrations
npm run migrate
```

## 📦 Project Structure

```
deployment-guide/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions workflow
├── services/
│   ├── dotnet-products-api/       # .NET microservice
│   │   ├── Controllers/
│   │   ├── Data/
│   │   ├── Models/
│   │   ├── Dockerfile
│   │   └── Program.cs
│   └── python-categories-api/     # Python microservice
│       ├── main.py
│       ├── requirements.txt
│       └── Dockerfile
├── frontend/                      # React frontend
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vite.config.ts
├── docker-compose.yml             # Main compose file
├── docker-compose.override.yml    # Development overrides
└── package.json                   # NPM scripts
```

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. ✅ Builds all services (.NET, Python, React)
2. ✅ Runs tests (if configured)
3. ✅ Creates EF Core migration bundle
4. ✅ Runs database migrations (if DB connection provided)
5. ✅ Builds Docker images
6. ✅ Pushes images to Docker Hub (if credentials provided)
7. ✅ Creates GitHub release

### Required Secrets

Configure these in your GitHub repository settings:

- `DB_CONNECTION_STRING` - PostgreSQL connection string for production
- `DOCKER_USERNAME` - Docker Hub username (optional)
- `DOCKER_PASSWORD` - Docker Hub password/token (optional)

## 🌐 API Endpoints

### Products API (.NET)

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /health` - Health check

### Categories API (Python)

- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `GET /health` - Health check

## 🎨 Frontend Features

- Modern glassmorphism UI design
- Responsive layout (mobile-friendly)
- Real-time data fetching from both APIs
- Loading and error states
- Smooth animations
- Environment-based API configuration

## 🔧 Configuration

### Environment Variables

#### Products API

- `ASPNETCORE_ENVIRONMENT` - Environment (Development/Production)
- `ConnectionStrings__DefaultConnection` - PostgreSQL connection string

#### Frontend

- `VITE_PRODUCTS_API_URL` - Products API base URL
- `VITE_CATEGORIES_API_URL` - Categories API base URL

## 📝 NPM Scripts

```bash
npm run compose              # Start all services with build
npm run compose:detached     # Start in detached mode
npm run down                 # Stop all services
npm run down:volumes         # Stop and remove volumes
npm run logs                 # View all logs
npm run logs:products        # View products API logs
npm run logs:categories      # View categories API logs
npm run logs:frontend        # View frontend logs
npm run ef:install           # Install EF Core tools
npm run ef:bundle            # Create migration bundle
npm run migrate              # Run migrations
```

## 🐛 Troubleshooting

### Database connection issues

If the Products API can't connect to the database:

1. Ensure PostgreSQL container is running: `docker compose ps`
2. Check database logs: `docker compose logs products-db`
3. Verify connection string in `docker-compose.override.yml`

### Frontend can't reach APIs

1. Check that all services are running: `docker compose ps`
2. Verify API URLs in frontend `.env` file
3. Check CORS configuration in API services

### Migration issues

If migrations fail:

1. Ensure database is accessible
2. Check connection string
3. Manually run migrations: `npm run migrate`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

This project was inspired by modern microservices architectures and follows best practices from:

- ASP.NET Core documentation
- FastAPI documentation
- Docker best practices
- React and Vite guidelines

---

**Built with ❤️ using Docker, .NET, Python FastAPI, and React**
