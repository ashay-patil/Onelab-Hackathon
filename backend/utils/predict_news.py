import os
import joblib
import sys


def predict_news(news_text):
    """
    Predicts whether the given news text is Fake or Real.
    :param news_text: str, The news article text.
    :return: str, "Fake News" or "Real News".
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_folder = os.path.join(base_dir, '../model')
    model_file = os.path.join(model_folder, 'FakeNewsModel.pkl')
    vectorizer_file = os.path.join(model_folder, 'vectorizer.pkl')
    
    model = joblib.load(model_file)
    vectorizer = joblib.load(vectorizer_file)
    
    input_vectorized = vectorizer.transform([news_text])
    
    prediction = model.predict(input_vectorized)
    
    return "Fake News" if prediction[0] == 0 else "Real News"

# Example usage
if __name__ == "__main__":
    if len(sys.argv) > 1:
        news_text = sys.argv[1]
        print(predict_news(news_text))
