let cols = 10;
let rows = 10;
let points = [];
let figures = [];

function setup() {
    createCanvas(600, 600).parent('canvas-container');

    coordenadaInput = select('#coordenada');
}

function draw(){
    drawGrid();
}

function drawGrid() {
    let cellWidth = width / cols;
    let cellHeight = height / rows;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            strokeWeight(1);
            stroke("gray")

            rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            text(cols-j, 5, j * cellHeight + cellHeight / 2);
        }
        text(i+1, i * cellWidth + cellWidth / 2, height - 5);
    }
}

function mouseClicked(){
    let cellWidth = width / cols;
    let cellHeight = height / rows;
    
    //considerar la posibilidad de redondear con Math.round().
    let i = mouseX / cellWidth;
    let j = mouseY / cellHeight;

    let x = i * cellWidth;
    let y = j * cellHeight;

    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        //console.log("Coordenadas del i y j:", i, cols-j);

        noFill();
        stroke(255, 0, 0);
        strokeWeight(10);

        point(x, y);
        if(points.length > 0){
            //console.log("Puntos de la figura: ", points[points.length - 1].x)
            stroke(0, 0, 255);
            strokeWeight(1);

            line(x, y, points[points.length - 1].x, points[points.length - 1].y);
        }
        points.push({x, y});
    }
}

function closeFigure(){
    console.log("HOLA")
    if(points.length >= 3){
        stroke(0, 0, 255);
        strokeWeight(1);

        x1 = points[points.length - 1].x;
        y1 = points[points.length - 1].y; 
        x2 = points[0].x;
        y2 = points[0].y; 

        line(x1, y1, x2, y2);

        figures.push(points);

        console.log("FIGURAS: ", figures);
    }else{
        alert("Tu figura tiene que tener 3 puntos o más para poder cerrarse");
    }
}

function traslation(){
    if(figures.length > 0 ){
        let coordenada = coordenadaInput.value();
        
        let partes = coordenada.split(',');
        let x = parseFloat(partes[0]);
        let y = parseFloat(partes[1]);

        if (!/^[\d]+,[\d]+$/.test(coordenada)) {
            alert("Por favor, ingresa una coordenada válida");
            return;
        }else{
            let cellWidth = width / cols;
            let cellHeight = height / rows;

            let x_move = x * cellWidth;
            let y_move = y * cellHeight;

            console.log("Movimiento en x e y: ", x_move, y_move);
        }
    }else{
        alert("No hay figuras a trasladar")
    }
}