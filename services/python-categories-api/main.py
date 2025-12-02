from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Categories API",
    description="Simple FastAPI service that returns a list of categories",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static categories data
categories = [
    {"id": 1, "name": "Electronics", "description": "Electronic devices and accessories"},
    {"id": 2, "name": "Computers", "description": "Laptops, desktops, and computer parts"},
    {"id": 3, "name": "Peripherals", "description": "Keyboards, mice, and other peripherals"},
    {"id": 4, "name": "Audio", "description": "Headphones, speakers, and audio equipment"},
    {"id": 5, "name": "Displays", "description": "Monitors and display devices"},
]

@app.get("/")
async def root():
    return {"message": "Categories API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "categories-api"}

@app.get("/api/categories")
async def get_categories():
    logger.info(f"Retrieved {len(categories)} categories")
    return categories

@app.get("/api/categories/{category_id}")
async def get_category(category_id: int):
    category = next((cat for cat in categories if cat["id"] == category_id), None)
    if category:
        return category
    return {"error": "Category not found"}, 404
