const canvas = document.getElementById('field');
const ctx = canvas.getContext("2d");
var matrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

function shuffle(matrix) {
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

function draw_field() {
    canvas.height = 800;
    canvas.width = 800;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 800, 800);
    ctx.fillStyle = 'white';
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