class Panel {
    constructor(game) {
        this.game = game;
        this.el = document.createElement('li');
        this.el.classList.add('pressed');
        this.el.addEventListener('click', () => {
            this.check();
        })
    }
    getEl() {
        return this.el;
    }
    activate(num) {
        this.el.classList.remove('pressed');
        this.el.textContent = num;
    }
    check() {
        if (parseInt(this.el.textContent, 10) === this.game.currentNum) {
            this.el.classList.add('pressed');
            this.game.currentNum++;

            if (this.game.currentNum === this.game.level ** 2) {
                clearTimeout(this.game.timeoutId);
            }
        }


    }
}

class Board {
    constructor(game) {
        this.game = game;
        this.panels = [];
        for (let i = 0; i < this.game.level ** 2; i++) {
            this.panels.push(new Panel(this.game));
        }
        this.setup();
    }
    setup() {
        const board = document.querySelector('#board');
        this.panels.forEach((panel) => {
            board.appendChild(panel.getEl());
        })
    }
    start() {
        this.nums = [];
        for(let i = 0; i < this.game.level ** 2; i++) {
            this.nums.push(i);
        }
        this.panels.forEach((panel) => {
            this.num = this.nums.splice(Math.floor(Math.random() * this.nums.length), 1)[0]
            panel.activate(this.num);
        })
    }
    runTimer() {
        this.game.timer.textContent = ((Date.now() - this.game.startTime) / 1000).toFixed(2);
        this.game.timeoutId = setTimeout(() => {
            this.runTimer()
        }, 10);
    }
}

class Game {
    constructor(level) {
        this.level = level;
        this.board = new Board(this);
        this.currentNum = undefined;
        this.startTime = undefined;
        this.timeoutId = undefined;
        this.timer = document.querySelector('#timer');
        this.btn = document.querySelector('#btn');
        this.btn.addEventListener('click', () => {
            this.start();
        })
        this.setWidth();
    }
    start() {
        if (typeof this.timeoutId !== 'undefined') {
            clearTimeout(this.timeoutId);
        }
        this.currentNum = 0;
        this.startTime = Date.now();
        this.board.runTimer();
        this.board.start();
    }
    setWidth() {
        this.WIDTH = 10 * 2 + 50 * this.level + 'px';
        const container = document.querySelector('#container');
        container.style.width = this.WIDTH;
    }
}

new Game(2);
