import sys
import os

# Add parent directory to path so imports work seamlessly on Vercel
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import app

# Export ASGI app for Vercel Serverless Functions
__all__ = ["app"]
