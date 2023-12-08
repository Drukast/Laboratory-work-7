function LoadImages() {
    let images = [];
    for (let i = 0; i < 16; i++) {
        let img = new Image();
        img.src = `images/${i + 1}.png`;
        images.push(img);
    }
    return images;
}

function Shuffle(matrix) {  //Функция перемешивает массив matrix в случайном порядке значениями из массива numbers
    let matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let elem = Math.floor(Math.random() * numbers.length);
            matrix[i][j] = numbers[elem];
            numbers.splice(elem, 1);
        }
    }
    return matrix;
}

function Render() { //Функция рисует квадраты с числами внутри в соответствии с массивом matrix
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 824, 824);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            ctx.drawImage(images[matrix[i][j] - 1], 12 + (200 * i), 12 + (200 * j));
        }
    }
}

function Get16() {  //Функция ищет индекс элемента массива matrix со значением 16 и возвращает массив с его индексом
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == 16) {
                return [i, j];
            }
        }
    }
}

function Move(x, y) {  //Функция сравнивает значения аргументов с индексом элемента 16,
    let elem16 = Get16();   //так чтобы элемент массива matrix с индексом x,y был по соседству с элементом 16
    if (((x - 1 == elem16[0] || x + 1 == elem16[0]) && y == elem16[1]) ||
        ((y - 1 == elem16[1] || y + 1 == elem16[1]) && x == elem16[0])) {
        matrix[elem16[0]][elem16[1]] = matrix[x][y];
        matrix[x][y] = 16;
    }
}

function win_check() {  //Функция сравнивает массив matrix с массивом win_matrix и возвращает true в случае сходства/false в случае различия
    let win_matrix = [[1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [4, 8, 12, 16]];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] != win_matrix[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function Turn(x, y) {   //Функция вызывает функцию move для перемещения квадратов, затем рисует поле заново, и проверяет массив matrix на победу
    if (phase == 1) {
        Move(x, y);
    } else {
        phase = 1;
    }
    Render();
    if (WinCheck()) {
        let img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
        img.src = 'images/win.png';
        window.matrix = Shuffle();
        phase = 0;
    }
}

field.onclick = function (e) { //Event происходящий в случае нажатия на canvas, 
    //который получает положение мыши и рассчитывающий индекс элемента массива matrix на который нажали
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((event.pageX - rect.left - 12) / 200), y = Math.floor((event.pageY - rect.top - 12) / 200);
    Turn(x, y);
}

window.onload = function () {
    window.canvas = document.getElementById('field');
    window.ctx = canvas.getContext("2d");
    canvas.height = 824;
    canvas.width = 824;
    window.matrix = Shuffle();
    window.images = LoadImages();
    matrix = [[1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 16], [4, 8, 12, 15]]
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
    img.src = 'images/start.png';
    window.phase = 0;
}