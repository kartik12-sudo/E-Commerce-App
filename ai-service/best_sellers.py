import pandas as pd
import numpy as np
import json
from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="./sentiment_model", tokenizer="./sentiment_model")


df = pd.read_excel("products_dataset_with_reviews.xlsx")

def get_sentiment_score(reviews):
    if not isinstance(reviews, list):
        return 0.0
    results = classifier(reviews)
    pos = sum(1 for r in results if r["label"] == "POSITIVE")
    return pos / len(results) 

product_scores = []
for _, row in df.iterrows():
    rating = row["Rating"]
    reviews = row["Reviews"]
    sentiment_score = get_sentiment_score(eval(reviews))  
    final_score = (rating / 5) * 0.6 + sentiment_score * 0.4  
    product_scores.append({
        "Category": row["Category"],
        "Product": row["Product"],
        "Score": final_score
    })

score_df = pd.DataFrame(product_scores)

best_products = {}
for cat, group in score_df.groupby("Category"):
    top_items = group.sort_values("Score", ascending=False).head(np.random.randint(0, 4))
    best_products[cat] = top_items[["Product", "Score"]].to_dict(orient="records")

with open("best_products.json", "w") as f:
    json.dump(best_products, f, indent=4)

print("Best prod saved to best_products.json")
