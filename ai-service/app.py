from fastapi import FastAPI
from fastapi.responses import JSONResponse
import json
import os

app = FastAPI()

@app.get("/best-sellers")
def best_sellers():
    if not os.path.exists("best_products.json"):
        return JSONResponse(content={"error": "best_products.json not found. Run best_sellers.py first."}, status_code=404)

    with open("best_products.json") as f:
        data = json.load(f)
    return JSONResponse(content=data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
