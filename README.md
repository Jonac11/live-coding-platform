# K-12 Live Coding Platform

## Project Description

**Brief project description, including its purpose and key feature:**

The Web-Based Live Coding Platform is an educational tool designed to teach K-12 students programming through real-time control of RC cars and simulations. It combines a drag-and-drop Blockly interface with Python scripting, offering an engaging and practical coding experience. Key features as of this point  include a front end platform integrated with code editor where you can control the RC car in realtime. 

**The progress we made was:**

- Created a web-based platform 
- Integrated Blockly API with the platform
- Created custom movement blocks 
- Connected the RC Car with Raspberry Pi OS
- Connected Raspberry Pi OS with the platform (sending information over Flask server).
- **Result:** Made a web-based platform that uses movement blocks to control the RC Car


## Installation
Steps to Install & Test
1. ### Clone the Repository
- Begin by downloading the project repository to your local machine or Raspberry Pi. This will provide the source code and all necessary files.
2. ### Install Node.js
- Ensure that Node.js is installed. It is required to manage and run the front-end application.
3. ### Install Python and Flask
- Install Python and Flask, as these are essential for running the backend server.
4. ### Install Front-End Dependencies
- Navigate to the front-end directory and install all the required dependencies for the React application to function properly.
5. ### Install Flask Backend Dependencies
- Navigate to the backend directory and set up the necessary Python packages to enable the Flask server to operate.
6. ### Set Up Raspberry Pi
- If deploying on a Raspberry Pi, ensure the device is updated, and configure the Flask server to run on the Pi's IP address for accessibility.
7. ### Run the Flask Backend Server
- Start the backend Flask server so it can handle requests and interact with the front-end.
8. ### Run the React Front-End Application
- Start the React application to load the user interface, which will communicate with the Flask backend.
9. ### Access the Application
- Open a browser and navigate to the front-end application running on the Raspberry Pi, ensuring it is correctly connected to the backend server.

## Technologies Used
**Front end**:
- React.js v19.0.0
- ⁠Blockly v11.1.1

**Backend**:
- Flask v3.1.0
- ⁠Python v3.12.6

**Hardware**:
- PiCar-X
- ⁠Raspberry Pi OS Legacy 32-bit

**Development Tools**:
- Node.js v14.15.0
- ⁠Webpack v5.97.1
- ⁠Express v4.21.2

## Usage

### How to Use
**Create Code:**
- Open the platform in your browser.
- Drag and drop blocks in the Blockly workspace to create Python code.
**The code editor includes categories like:**
**Logic:** If-else conditions.
**Loops:** Repeat actions.
**Math:** Perform arithmetic operations.
**Car Movement:** Move Forward, Backward, Turn Left, Turn Right, Stop.
**Run Code:**
- Click the "Run Code" button to send the generated Python code to the Flask server.
- The server processes the code and sends instructions to the RC car via the Raspberry Pi.
**Control the RC Car:**
- Watch the RC car execute the movements defined in your code in real-time.

## Features

**The main features or functionalities of our project.**

- **Visual Programming**: Create Python code using an intuitive drag-and-drop interface with Blockly.

- **Real-Time Control**: Execute Python scripts on the RC car instantly via a Flask API.

- **Custom Blocks**: Special blocks for controlling RC car movements.

- **Category-Based Organization**: Blocks for logic, loops, math, and car control.

- **Local Hosting**: Easily test and run the platform locally.


## Screenshot

![Platform Interface Screenshot](https://github.com/user-attachments/assets/eef22c7a-f143-4725-888a-1d7c60647107)

## Demo Video


https://github.com/user-attachments/assets/7e71a878-c321-4b40-830d-9d410a956f0e



## Documentation From Senior Design I

1. [SQA Plan](https://docs.google.com/document/d/10VSIBge3jp_1O6qlHli2nbiXznSrQyXXmpuoUh4KCGk/edit?usp=drive_link)

2. [K-12 Blocks List](https://docs.google.com/document/d/1lTXckXr_k3-9LYat7_OhP_rdyHS0geJ8/edit?usp=drive_link&ouid=117648668558653070027&rtpof=true&sd=true)

3. [Software Requirements Specification (SRS)](https://docs.google.com/document/d/13Q2qdWbrFOqqD4gFirgDqZQFQpCpz5o35lUNYgRbqWs/edit?usp=drive_link)

4. [Software Project Management Plan (SPMP)](https://docs.google.com/document/d/1uEOE-I0l9TacWmw7WhTMALpDqo2SxQW0epydKJARtX8/edit?usp=drive_link)

5. [Risk Mitigation, Monitoring, and Management (RMMM)](https://docs.google.com/document/d/17NF7K1Gata7I9L2Bv2pfiuCZM_FSyD7eNnVhHtbrzHo/edit?usp=drive_link)


## Changelog

**Version 0.2**

## Conclusion
Overall, first semester work was quite challenging but our team has set a base line for Senior Design II where we plan to complete the following as well as refine and revise what we have currently finished: 

1. Refine Application Structure
2. Implement Remaining Blocks (Sensors, Computer Vision, etc.)
3. Integrate RC Car with ROS
4. Create the Visualizer/Simulation
5. Integrate New Components
6. Further Testing
7. Finalize Platform
