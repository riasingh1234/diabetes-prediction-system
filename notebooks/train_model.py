from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)

import joblib
import json

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Create outputs folder
os.makedirs("../outputs", exist_ok=True)

# Load dataset
df = pd.read_csv("../data/diabetes.csv")

print("="*50)
print("Dataset Information")
print("="*50)

print(df.head())

print("\nShape:", df.shape)

print("\nData Types:")
print(df.dtypes)

print("\nMissing Values:")
print(df.isnull().sum())

print("\nSummary Statistics:")
print(df.describe())

# -----------------------------
# Class Distribution
# -----------------------------
plt.figure(figsize=(6,4))
sns.countplot(x="Outcome", data=df)
plt.title("Diabetes Class Distribution")
plt.savefig("../outputs/class_distribution.png")
plt.close()

# -----------------------------
# Correlation Heatmap
# -----------------------------
plt.figure(figsize=(10,8))
sns.heatmap(df.corr(), annot=True, cmap="coolwarm")
plt.title("Correlation Heatmap")
plt.savefig("../outputs/correlation_heatmap.png")
plt.close()

# -----------------------------
# Histograms
# -----------------------------
df.hist(figsize=(14,10))
plt.tight_layout()
plt.savefig("../outputs/histograms.png")
plt.close()

print("\nEDA completed successfully!")

# -----------------------------
# Data Cleaning
# -----------------------------

columns_with_zero = [
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI"
]

print("\nInvalid Zero Values Before Cleaning:")
for col in columns_with_zero:
    print(f"{col}: {(df[col] == 0).sum()}")

# Replace zeros with NaN
df[columns_with_zero] = df[columns_with_zero].replace(0, pd.NA)

# Fill missing values using median
for col in columns_with_zero:
    df[col] = df[col].fillna(df[col].median())

print("\nMissing Values After Cleaning:")
print(df.isnull().sum())

print("\nCleaning Completed Successfully!")

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X = df.drop("Outcome", axis=1)
y = df["Outcome"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\nTraining Samples:", X_train.shape[0])
print("Testing Samples:", X_test.shape[0])


# -----------------------------
# Model Training
# -----------------------------

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    ),
    "KNN": KNeighborsClassifier(n_neighbors=5)
}

results = []

best_model = None
best_accuracy = 0
best_model_name = ""

print("\n" + "="*60)
print("MODEL COMPARISON")
print("="*60)

for name, model in models.items():

    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)

    results.append([
        name,
        accuracy,
        precision,
        recall,
        f1
    ])

    print(f"\n{name}")
    print("-"*40)
    print(f"Accuracy : {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall   : {recall:.4f}")
    print(f"F1 Score : {f1:.4f}")

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model
        best_model_name = name

print("\n" + "="*60)
print(f"Best Model : {best_model_name}")
print(f"Accuracy   : {best_accuracy:.4f}")
print("="*60)

# -----------------------------
# Save Model
# -----------------------------

os.makedirs("../backend", exist_ok=True)

joblib.dump(best_model, "../backend/model.pkl")
joblib.dump(scaler, "../backend/scaler.pkl")

metadata = {
    "best_model": best_model_name,
    "accuracy": round(best_accuracy, 4),
    "features": list(X.columns),
    "target": "Outcome"
}

with open("../backend/model_metadata.json", "w") as f:
    json.dump(metadata, f, indent=4)

print("\nModel Saved Successfully!")
