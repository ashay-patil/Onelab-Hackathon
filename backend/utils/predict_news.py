import os
import joblib
import sys


def predict_news(news_text):
    """
    Predicts whether the given news text is Fake or Real.
    :param news_text: str, The news article text.
    :return: str, "Fake News" or "Real News".
    """
    # Define file paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_folder = os.path.join(base_dir, '../model')
    model_file = os.path.join(model_folder, 'FakeNewsModel.pkl')
    vectorizer_file = os.path.join(model_folder, 'vectorizer.pkl')
    
    # Load model and vectorizer
    model = joblib.load(model_file)
    vectorizer = joblib.load(vectorizer_file)
    
    # Vectorizing the input
    input_vectorized = vectorizer.transform([news_text])
    
    # Prediction
    prediction = model.predict(input_vectorized)
    
    # Output result
    return "Fake News" if prediction[0] == 0 else "Real News"

# Example usage
if __name__ == "__main__":
    if len(sys.argv) > 1:
        news_text = sys.argv[1]
        print(predict_news(news_text))  # Print the result for Node.js to read
