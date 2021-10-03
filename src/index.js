import "./main.scss";

(() => {
    const canvas = document.getElementById("game");
    const gameHeight = 300;
    const gameWidth = 500;
    const ctx = canvas.getContext("2d");

    canvas.width = gameWidth;
    canvas.height = gameHeight;

    class Player {
        constructor() {
            this.height = 10;
            this.width = 10;
            this.x = gameWidth / 2;
            this.y = gameHeight / 2;
            this.color = "red";
            this.speed = 5;
        }

        move = (dir) => {
            if (dir === "left") this.x -= this.speed;
            else if (dir === "right") this.x += this.speed;
            else if (dir === "up") this.y -= this.speed;
            else if (dir === "down") this.y += this.speed;
        };

        draw = () => {
            // clear canvas
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        };
    }

    
    // Create our player
    const p1 = new Player();
    
    let gameloop;
    
    // Run the gameloop
    const run = () => {
        gameloop = requestAnimationFrame(run);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        p1.draw();
    };

    requestAnimationFrame(run);

    // Handle user inputs to move the player.
    const move = ({ keyCode }) => {
        switch (keyCode) {
            case 37:
                p1.move("left");
                break;
            case 38:
                p1.move("up");
                break;
            case 39:
                p1.move("right");
                break;
            case 40:
                p1.move("down");
                break;
            default:
                break;
        }
    };
    window.addEventListener("keydown", move);

})();
