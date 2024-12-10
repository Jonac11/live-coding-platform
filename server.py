from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_script():
    try:
        # Save the received script
        script = request.data.decode('utf-8')
        initial = 'from picarx import Picarx\nimport time\npx=Picarx()\n'
        with open('picar_script.py', 'w') as f:
            f.write(initial+script)
        # Run the script automatically
        subprocess.run(['python3', 'picar_script.py'], check=True)
        return 'Script uploaded and executed', 200
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

