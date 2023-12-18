from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__)

# Load your machine learning model
model = joblib.load('your_model_file.pkl')  # Update with your actual model file

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    try:
        if request.method == 'POST':
            data = request.json

            # Preprocess the input data as needed
            age = float(data['age'])
            sex = float(data['sex'])
            cp = float(data['cp'])
            trestbps = float(data['trestbps'])
            chol = float(data['chol'])
            fbs = float(data['fbs'])
            restecg = float(data['restecg'])
            thalach = float(data['thalach'])
            exang = float(data['exang'])
            oldpeak = float(data['oldpeak'])
            slope = float(data['slope'])
            ca = float(data['ca'])

            # Example preprocessing for each input variable
            # Note: Modify this section based on your model's requirements

            # Create a feature vector with the preprocessed data
            feature_vector = [[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca]]

            # Make a prediction using your model
            prediction = model.predict(feature_vector)

            # Return the prediction as JSON
            return jsonify({'prediction': int(prediction[0])})
        else:
            return 'Method Not Allowed', 405  # Method Not Allowed status code for non-POST requests
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
