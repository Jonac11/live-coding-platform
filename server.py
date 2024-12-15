from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)

# Endpoint to handle Python script upload and execution
@app.route('/upload', methods=['POST'])
def upload_script():
    try:
        # Retrieve Python code from the request body
        script = request.data.decode('utf-8')
        script_file = 'uploaded_script.py'

        # Save the uploaded Python script to a file
        with open(script_file, 'w') as file:
            file.write(script)

        # Execute the Python script and capture output
        result = subprocess.run(
            ['python3', script_file],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # Return the script's output
        return jsonify({'output': result.stdout}), 200

    except subprocess.CalledProcessError as e:
        # Handle errors in script execution
        return jsonify({'error': e.stderr}), 500
    except Exception as e:
        # Handle other errors
        return jsonify({'error': str(e)}), 500

# Health check endpoint (optional for testing server status)
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Server is running'}), 200

if __name__ == '__main__':
    # Run the Flask server
    app.run(host='0.0.0.0', port=5000)
