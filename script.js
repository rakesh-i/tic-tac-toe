
function flip(){
    let cur = true;
    return function(){
        cur = !cur;
        return cur;
    };
}

function game(){
    const winner = document.getElementById('winner');
    winner.textContent = '';
    let array = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    createGrid();
    const turn = flip();

    let count = 0;

    function updateCells(){
        count++;
        let cell = document.getElementById(this.id);
        let play = turn();
        let currentPlayer = play===true?'Red':'Blue';
        if(play === true){
            cell.style.backgroundColor = 'red';
        }
        else{
            cell.style.backgroundColor = 'blue';
        }
        
        let [x, i, j] = this.id.split('-');
        array[i][j] = currentPlayer;
        if(checkWin(array, currentPlayer)==1){
            setTimeout(()=>{
                winner.textContent = `${currentPlayer} Wins`;
                winner.style.color = `${currentPlayer}`;
            }, 50);
            
        }
        else if(count==9){
            setTimeout(()=>{
                winner.textContent = 'Draw';
            }, 50);
        }
        cell.disabled = true;
    }
    
    function createGrid(){
        const container = document.getElementById('container');
        container.textContent = '';
        for(let i=0; i<3; i++){
            const rowContainer = document.createElement('div');
            rowContainer.className ='row-container';
            for(let j=0; j<3; j++){
                const cell = document.createElement('button');
                cell.id = `cell-${i}-${j}`;
                cell.addEventListener('click', updateCells);
                rowContainer.append(cell);
            }
            container.append(rowContainer);
        }
    }
}   



function checkWin(array, value){
    for(let i=0; i<3; i++){
        if(array[i][0]==value&&array[i][1]==value&&array[i][2]==value){
            return 1;
        }
    }
    for(let i=0; i<3; i++){
        if(array[0][i]==value&&array[1][i]==value&&array[2][i]==value){
            return 1;
        }
    }
    if(array[0][0]==value&&array[1][1]==value&&array[2][2]==value){
        return 1;
    }
    if(array[2][0]==value&&array[1][1]==value&&array[0][2]==value){
        return 1;
    }

    return 0;
}

document.getElementById('new-game').addEventListener('click', game);



game();




