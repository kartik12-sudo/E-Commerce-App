import pandas as pd
import numpy as np
import json
from transformers import pipeline

# Load trained classifier
classifier = pipeline("sentiment-analysis", model="./sentiment_model", tokenizer="./sentiment_model")

# Load dataset
df = pd.read_excel("Product_Reviews_Dataset.xlsx")

# Function to calculate sentiment score
def get_sentiment_score(review_text):
    if not isinstance(review_text, str) or not review_text.strip():
        return 0.0

    # Split reviews by comma → each review separately
    reviews = [r.strip() for r in review_text.split(",") if r.strip()]

    if not reviews:
        return 0.0

    results = classifier(reviews)  # batch classify all reviews
    pos = sum(1 for r in results if r["label"].upper() in ["POSITIVE", "LABEL_1"])  # allow both formats
    return pos / len(reviews)  # proportion of positive reviews

# Build product scores
product_scores = []
for _, row in df.iterrows():
    rating = row["Rating"]
    reviews = row["Reviews"]

    sentiment_score = get_sentiment_score(reviews)
    final_score = (rating / 5) * 0.6 + sentiment_score * 0.4  # weighted score

    product_scores.append({
        "Category": row["Category"],
        "Product": row["Product"],
        "Score": round(final_score, 3)
    })

# Convert to DataFrame
score_df = pd.DataFrame(product_scores)

# Pick best products per category
best_products = {}
for cat, group in score_df.groupby("Category"):
    top_items = group.sort_values("Score", ascending=False).head(3)  # top 3 per category
    best_products[cat] = top_items[["Product", "Score"]].to_dict(orient="records")

# Save JSON
with open("best_products.json", "w") as f:
    json.dump(best_products, f, indent=4)

print("✅ Best products saved to best_products.json")
