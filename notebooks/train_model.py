import pandas as pd

# Load dataset
df = pd.read_csv("../data/diabetes.csv")

print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nColumn Names:")
print(df.columns)

print("\nData Types:")
print(df.dtypes)
