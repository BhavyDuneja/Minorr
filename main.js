async function predict() {
    try {
        // Collect input values
        const age = parseFloat(document.getElementById('age').value);
        const sex = parseFloat(document.getElementById('sex').value);
        const cp = parseFloat(document.getElementById('cp').value);
        const trestbps = parseFloat(document.getElementById('trestbps').value);
        const chol = parseFloat(document.getElementById('chol').value);
        const fbs = parseFloat(document.getElementById('fbs').value);
        const restecg = parseFloat(document.getElementById('restecg').value);
        const thalach = parseFloat(document.getElementById('thalach').value);
        const exang = parseFloat(document.getElementById('exang').value);
        const oldpeak = parseFloat(document.getElementById('oldpeak').value);
        const slope = parseFloat(document.getElementById('slope').value);
        const ca = parseFloat(document.getElementById('ca').value);

        // Send input values to the server for prediction
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca }),
        });

        if (!response.ok) {
            throw new Error(`Prediction failed: ${response.statusText}`);
        }

        // Parse the prediction result
        const result = await response.json();

        // Log the result to the console
        console.log(result);

        // Display the result on the page
        document.getElementById('result').innerHTML = `Prediction: ${result.prediction}`;
    } catch (error) {
        console.error(error);
        document.getElementById('result').innerHTML = 'Prediction failed. Please check the input and try again.';
    }
}
    