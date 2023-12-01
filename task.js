function shuffle(matrix) {  //Функция перемешивает массив matrix в случайном порядке значениями из массива numbers
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let elem = Math.floor(Math.random() * numbers.length);
            matrix[i][j] = numbers[elem];
            numbers.splice(elem, 1);
        }
    }
    return matrix
}

function draw_field() { //Функция рисует квадраты с числами внутри в соответствии с массивом matrix
    canvas.height = 800;
    canvas.width = 800;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 800, 800);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            ctx.fillStyle = 'white';
            ctx.fillRect(1 + (200 * i), 1 + (200 * j), 198, 198)
            ctx.fillStyle = 'black';
            if (matrix[i][j] != 16) {
                ctx.fillText(matrix[i][j], 94 + (200 * i), 101 + (200 * j))
            }
        }
    }
}

function Get16() {  //Функция ищет индекс элемента массива matrix со значением 16 и возвращает массив с его индексом
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == 16) {
                return [i, j]
            }
        }
    }
}

function move(x, y) {  //Функция сравнивает значения аргументов с индексом элемента 16,
    let elem16 = Get16();   //так чтобы элемент массива matrix с индексом x,y был по соседству с элементом 16
    if (((x - 1 == elem16[0] || x + 1 == elem16[0]) && y == elem16[1]) ||
        ((y - 1 == elem16[1] || y + 1 == elem16[1]) && x == elem16[0])) {
        matrix[elem16[0]][elem16[1]] = matrix[x][y];
        matrix[x][y] = 16;
    }
}

function win_check() {  //Функция сравнивает массив matrix с массивом win_matrix и возвращает true в случае сходства/false в случае различия
    let win_matrix = [[1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [4, 8, 12, 16]]
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] != win_matrix[i][j]) {
                return false
            }
        }
    }
    return true
}

function Turn(x, y) {   //Функция вызывает функцию move для перемещения квадратов, затем рисует поле заново, и проверяет массив matrix на победу
    move(x, y)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw_field()
    if (win_check()) {
        alert('YOU WIN!!!')
    }
}

field.onclick = function (e) { //Event происходящий в случае нажатия на canvas, 
    //который получает положение мыши и рассчитывающий индекс элемента массива matrix на который нажали
    let x = Math.floor((e.pageX - e.target.offsetLeft) / 200), y = Math.floor((e.pageY - e.target.offsetTop) / 200);
    Turn(x, y);
}

const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
var matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
matrix = shuffle(matrix)
draw_field();