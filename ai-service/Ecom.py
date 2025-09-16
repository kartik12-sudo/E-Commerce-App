import pandas as pd
from datasets import Dataset
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments
from transformers import pipeline

df = pd.read_excel("Product_Reviews_Dataset.xlsx")

df = df.dropna(subset=["Reviews"])  

df["label"] = df["Rating"].apply(lambda x: 1 if x >= 4 else 0)

dataset = Dataset.from_pandas(df[["Reviews", "label"]])

dataset = dataset.train_test_split(test_size=0.2, seed=42)

tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")

def tokenize(batch):
    return tokenizer(batch["Reviews"], padding="max_length", truncation=True, max_length=128)

dataset = dataset.map(tokenize, batched=True)

model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=2)

training_args = TrainingArguments(
    output_dir="./results",
    eval_strategy="epoch",          
    save_strategy="epoch",          
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=2,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    save_total_limit=1
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer
)

trainer.train()

# 6. Save model
model.save_pretrained("./sentiment_model")
tokenizer.save_pretrained("./sentiment_model")

print("Model training complete. Saved at ./sentiment_model")


classifier = pipeline("sentiment-analysis", model="./sentiment_model", tokenizer="./sentiment_model")

print(classifier("This product is really good"))
print(classifier("Worst purchase ever. Totally waste of money"))
