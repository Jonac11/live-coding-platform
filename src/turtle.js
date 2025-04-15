class Turtle {
    constructor(canvas) {
        if (!canvas) {
            console.error(" Turtle.js: Canvas element is not provided!");
            return;
        }

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angle = 90; // Initial angle set to 90 degrees (north)
        this.originalAngle = 90; // Store the original angle for centering

        this.image = new Image();
        if (this.image) {
            this.image.onload = () => {
                console.log(" Car image loaded successfully.");
                this.draw();
            };
            this.image.onerror = () => console.error(" Failed to load car image.");
            this.image.src = "/images/car.png";
        } else {
            console.error(" this.image is undefined.");
        }

        this.maxTurn = 45;
        this.turnAmount = 45;
        this.initialAngleBeforeTurn = this.angle;
        this.carWidth = 60;
        this.carHeight = 50;
        this.centerangle = 90;
        this.mf = false;
        this.mb = false;
        this.stopPresent = false;
        this.afterStop = false;
    }

    draw() {
        if (!this.ctx || !this.image.complete || this.image.naturalWidth === 0) {
            console.error(" Image is broken or not loaded yet.");
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate((Math.PI / 180) * this.angle);
        this.ctx.drawImage(this.image, -this.carWidth / 2, -this.carHeight / 2, this.carWidth, this.carHeight);
        this.ctx.restore();
    }

    forward(steps) {
        const rad = (Math.PI / 180) * this.angle;
        const newX = this.x + steps * Math.cos(rad);
        const newY = this.y + steps * Math.sin(rad);
        console.log("Moving forward to:", newX, newY, "steps:", steps);
        this.animateMove(newX, newY, 20);
    }

    backward(steps) {
        this.forward(-steps);
    }

    turnLeft() {
        this.angle += this.turnAmount;
        this.draw();
    }

    turnRight() {
        this.angle -= this.turnAmount;
        this.draw();
    }

    stop() {
        this.stopPresent = true;
        this.afterStop = false;
    }

    center() {
        this.angle = this.originalAngle; // Reset to original starting angle
        this.draw();
    }
    
    animateMove(newX, newY, steps) {
        let step = 0;
        const deltaX = (newX - this.x) / steps;
        const deltaY = (newY - this.y) / steps;

        console.log("Animating", steps, "steps", "Δx:", deltaX, "Δy:", deltaY);

        const moveInterval = setInterval(() => {
             if (step < steps) {
                this.x += deltaX;
                this.y += deltaY;
                this.draw();
                step++;
            } else {
                clearInterval(moveInterval);
                console.log("Finished animation to", this.x, this.y);
        }
    }, 20);
    }

    executeCommands(commandString) {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
        this.angle = 90;
        this.originalAngle = 90;

        this.draw();
        const commands = commandString.split("\n");
        let delay = 0;
    
        setTimeout(() => {
            this.center();
        }, delay);
        delay += 1000;
        
        commands.forEach((command) => {
            setTimeout(() => {
                console.log("Executing command:", command);
    
                if (command.startsWith("move_forward")) {
                    const match = command.match(/\d+/);
                    const steps = match ? parseInt(match[0]) * 50 : 50;
                    this.forward(steps);
                } else if (command.startsWith("move_backward")) {
                    const match = command.match(/\d+/);
                    const steps = match ? parseInt(match[0]) * 50 : 50;
                    this.backward(steps);
                } else if (command === "turn_left()") {
                    this.turnLeft();
                } else if (command === "stop()") {
                    this.stop();
                } else if (command === "turn_right()") {
                    this.turnRight();
                }
            }, delay);
            delay += 1000;
        });
    }
    
}

export default Turtle;
