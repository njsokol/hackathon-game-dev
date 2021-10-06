import "./main.scss";

(() => {
    const gameHeight = window.innerHeight;
    const gameWidth = window.innerWidth;

    const gameCanvas = document.getElementById("game");
    const gameCtx = gameCanvas.getContext("2d");

    gameCanvas.width = gameWidth;
    gameCanvas.height = gameHeight;

    class Scene {
        static canvas;
        static ctx;

        constructor() {
            this.canvas = document.getElementById("scene");
            this.ctx = this.canvas.getContext("2d");

            this.canvas.width = gameWidth;
            this.canvas.height = gameHeight;

            this.buildStars();
        }

        buildStars = () => {
            for (var i = 0; i <= 50; i++) {
                const size = Math.floor(Math.random() * 5);
                const x = Math.floor(Math.random() * this.canvas.width);
                const y = Math.floor(Math.random() * this.canvas.height);

                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, 2 * Math.PI);
                this.ctx.closePath();
                this.ctx.fillStyle = "white";
                this.ctx.globalAlpha = 0.5;
                this.ctx.fill();
            }
        };
    }


    class Asteroid {
        constructor(x, y) {
            this.speed = 5;
            this.x = x;
            this.y = y;
            this.width = 20;
            this.height = 20;
            this.color = "blue";
            this.speed = 10;

            this.draw();
        }

        draw = () => {
            if (this.y > gameCanvas.height) this.remove();

            
            gameCtx.beginPath();
            gameCtx.rect(this.x, this.y += this.speed, this.width, this.height);
            gameCtx.closePath();
            gameCtx.fillStyle = this.color;
            gameCtx.fill();
        }

        remove = () => {
            for (let i = 0; i < asteroids.length; i++) {
                if (asteroids[i].id === this.id) {
                    asteroids.splice(i, 1);
                    return;
                }
            }
        }
    }

    class Player {
        constructor() {
            this.id = Date.now();
            this.height = 10;
            this.width = 10;
            this.x = gameWidth / 2;
            this.y = gameHeight / 2;
            this.color = "red";
            this.speed = 10;
        }

        move = (dir) => {
            if (dir === "left") this.x -= this.speed;
            else if (dir === "right") this.x += this.speed;
            else if (dir === "up") this.y -= this.speed;
            else if (dir === "down") this.y += this.speed;
        };

        draw = () => {
            gameCtx.beginPath();
            gameCtx.rect(this.x, this.y, this.width, this.height);
            gameCtx.closePath();
            gameCtx.fillStyle = this.color;
            gameCtx.fill();
        };

       
    }

    // Create our player
    const p1 = new Player();
    const scene = new Scene();
    let keyState = {};
    let asteroids = [];

    let gameloop;

    setInterval(() => {
        asteroids.push(new Asteroid(Math.random() * gameCanvas.width, 0));
    }, 100);

    // Run the gameloop
    const run = () => {

        gameloop = requestAnimationFrame(run);
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        move();
        p1.draw();
        for (var i = 0; i < asteroids.length; i++) {
            asteroids[i].draw();
        }
    };

    requestAnimationFrame(run);

    // Handle user inputs to move the player.
    const move = () => {
        if (keyState.a || keyState[65]) p1.move("left");
        if (keyState.w || keyState[87]) p1.move("up");
        if (keyState.d || keyState[68]) p1.move("right");
        if (keyState.s || keyState[83]) p1.move("down");
    };

    window.addEventListener("keydown", (e) => (keyState[e.key] = true), true);
    window.addEventListener("keyup", (e) => (keyState[e.key] = false), true);
    window.addEventListener("blur", () => keyState = {});

})();