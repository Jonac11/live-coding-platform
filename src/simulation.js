import React, { useState, useEffect } from 'react';

const Simulation = () => {
    const [showCamera, setShowCamera] = useState(false);  // controls whether camera is visible
    const [isCameraConnected, setIsCameraConnected] = useState(true);  // checks if camera is connected
    const [key, setKey] = useState(0);  // forces iframe to refresh

    const camUrl = "http://172.20.10.3:9000/mjpg";  // camera feed URL

    // check if the camera feed is available
    const pingCameraFeed = async () => {
        try {
            const response = await fetch(camUrl, { method: "HEAD" });  // checks if the feed is available
            setIsCameraConnected(response.ok);  // updates connection status
        } catch (error) {
            setIsCameraConnected(false);  // if there's an error, set to not connected
        }
    };

    // check camera connection periodically when feed is visible
    useEffect(() => {
        let interval;

        if (showCamera) {
            interval = setInterval(() => {
                pingCameraFeed();  // check connection
            }, 5000);
        }

        return () => clearInterval(interval);  // cleanup when feed is hidden
    }, [showCamera]);

    // show the camera feed and refresh it
    const toggleCameraFeed = () => {
        setShowCamera(true);
        setKey(prevKey => prevKey + 1);  // refresh iframe
        pingCameraFeed();  // initial check when feed is shown
    };

    // close the camera feed
    const closeCameraFeed = () => {
        setShowCamera(false);  // hide feed
        setIsCameraConnected(true);  // reset connection status
    };

    return (
        <div id="simulation">
            <h3>Simulation Area</h3>

            <div id="sim-view">
                {showCamera ? (
                    isCameraConnected ? (
                        <>
                            <iframe
                                key={key}  // refresh iframe when key changes
                                src={camUrl}
                                width="640"
                                height="480"
                                onError={() => setIsCameraConnected(false)}  // handle error if feed fails
                            ></iframe>
                            <button onClick={closeCameraFeed}>Close Camera</button>
                        </>
                    ) : (
                        <>
                            <p>Camera not connected</p>
                            <button onClick={closeCameraFeed}>Close Camera</button>
                        </>
                    )
                ) : (
                    <button onClick={toggleCameraFeed}>Open Camera Feed</button>
                )}
            </div>
        </div>
    );
};

export default Simulation;
