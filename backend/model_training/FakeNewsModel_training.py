import pandas as pd
import re
import string
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
import joblib

base_dir = os.path.dirname(os.path.abspath(__file__))
data_folder = os.path.join(base_dir, '../dataset/FakeNewsDataset')
model_folder = os.path.join(base_dir, '../model')

fake_file = os.path.join(data_folder, 'Fake.csv')
true_file = os.path.join(data_folder, 'True.csv')
model_file = os.path.join(model_folder, 'FakeNewsModel.pkl')
vectorizer_file = os.path.join(model_folder, 'vectorizer.pkl')

os.makedirs(model_folder, exist_ok=True)

data_fake = pd.read_csv(fake_file)
data_true = pd.read_csv(true_file)

data_fake['class'] = 0
data_true['class'] = 1

data_merge = pd.concat([data_fake, data_true], axis=0)
data = data_merge.drop(['title', 'subject', 'date'], axis=1).sample(frac=1).reset_index(drop=True)

def wordopt(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r"\W", ' ', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'\n', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text

data['text'] = data['text'].apply(wordopt)

x = data['text']
y = data['class']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=42)

vectorization = TfidfVectorizer()
xv_train = vectorization.fit_transform(x_train)
xv_test = vectorization.transform(x_test)

NB = MultinomialNB()
NB.fit(xv_train, y_train)

joblib.dump(NB, model_file)
joblib.dump(vectorization, vectorizer_file)

print("Model Training Completed Successfully. Model saved")
