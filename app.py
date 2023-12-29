from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Replace 'YOUR_WEATHER_API_KEY' with the provided OpenWeatherMap API key
WEATHER_API_KEY = '9d35edb9b54410062b4fd180631a2ec6'

def get_weather_data(city):
    try:
        api_url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}'
        response = requests.get(api_url)
        response.raise_for_status()
        weather_data = response.json()
        return weather_data
    except requests.exceptions.RequestException as e:
        raise Exception(f'Error fetching weather data: {str(e)}')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_outfit', methods=['POST'])
def get_outfit():
    try:
        weather_data = request.get_json()
        temperature = weather_data.get('temperature', 0)

        # Replace this with your outfit recommendation logic
        if temperature < 10:
            outfit_recommendation = "Wear a heavy coat and warm layers."
        elif 10 <= temperature <= 20:
            outfit_recommendation = "A light jacket and jeans should be fine."
        else:
            outfit_recommendation = "Enjoy the weather with comfortable clothes."

        return jsonify({'outfit': outfit_recommendation})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
