from flask import Flask, Response, request
import subprocess

app = Flask(__name__)

# Stream CARLA video feed
@app.route('/video_feed')
def video_feed():
    def generate():
        with open('_out/000001.png', 'rb') as f:  # Update with correct CARLA output
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + f.read() + b'\r\n')
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

# Execute Python script
@app.route('/upload', methods=['POST'])
def upload_script():
    script = request.data.decode('utf-8')
    with open('picar_script.py', 'w') as file:
        file.write(script)
    subprocess.run(['python3', 'picar_script.py'], check=True)
    return 'Script executed successfully', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
