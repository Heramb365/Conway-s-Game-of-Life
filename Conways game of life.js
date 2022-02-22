let display = document.getElementById("canvas");
let ctx = display.getContext("2d");

get_2d_array = (_rows, _cols) => {
    let res = new Array(_rows)
    for(let i = 0; i < _rows; i++) {
        res[i] = new Array(_cols);
    }
    return res;
}

let grid; 
let next;
let rows = 100;
let cols = 200;
let pixel_size = 4

function init() {
    grid = get_2d_array(rows, cols);
    next = get_2d_array(rows, cols);

    ctx.canvas.width = cols * pixel_size;
    ctx.canvas.height = rows * pixel_size;

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            grid[i][j] = Math.floor(Math.random() * 2);
        }
    }
    
    setInterval(function() {
        draw();
    }, 1000/10);
}

function draw() {
    let _cur = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            _cur += grid[i][j];
            let x = j * pixel_size;
            let y = i * pixel_size;
            if(grid[i][j] == 1) {
                ctx.fillRect(x, y, pixel_size, pixel_size);
            }
        }
    }

     console.log(_cur, rows * cols);

    // compute next
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            // if(i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
            //     next[i][j] = grid[i][j];
            //     continue;
            // }
            let s = get(i, j);
            if(grid[i][j] == 0 && s == 3) {
                next[i][j] = 1;
            }
            else if(grid[i][j] == 1 && (s < 2 || s > 3)) {
                next[i][j] = 0;
            }
            else {
                next[i][j] = grid[i][j];
            }
        }
    }

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            grid[i][j] = next[i][j];
        }
    }

    // requestAnimationFrame(draw);
}

function modulo(num, mod) {
    while(num < 0) {
        num += mod;
    }
    return num % mod;
}

function get(i, j) {
    let res = 0;
    for(let _i = i - 1; _i < i + 2; _i ++) {
        for(let _j = j - 1; _j < j + 2; _j ++) {
            res += grid[modulo(_i, rows)][modulo(_j, cols)];
        }
    }
    return res - grid[i][j];
}

init();