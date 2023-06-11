

    // global variables
    let board = [];
    let currHost = 0;
    let currCand = null;
    let selems = document.getElementsByClassName('selem');
    let sudoku = document.querySelector('.sudokubox');
    let prevElem = null;
    let currX = 0 , currY = 0;

    document.addEventListener('DOMContentLoaded', function () {
        sudokuGame();
    });
    
    // function to generate random numbers
    function r(a){
        return Math.floor(Math.random() * a) + 1;
    }

    // function to check the positional correctness
    function isSafe(board , row, col, val){
        for(let i=0;i<board.length;i++){
            if(board[i][col].val==val)return false;
        }
        for(let i=0;i<board[0].length;i++){
            if(board[row][i].val==val)return false;
        }
        for(let i=row-row%3;i<(row-row%3)+3;i++){
            for(let j=col-col%3;j<(col-col%3)+3;j++){
                if(board[i][j].val==val)return false;
            }
        }
        return true;
    }


    // backtracking function that solves the puzzle
    function Solve( board, row, col){
        if(row==board.length-1 && col==board[0].length)return true;
        if(col==board[0].length){row++;col=0;}
        if(board[row][col]!=0)return Solve(board,row,col+1);
        for(let i=1;i<=board.length;i++){
            let obj = new Object({
                val : i,
                fixed : true
            })  
            if(isSafe(board,row,col,i)){
                board[row][col] = obj;
                if(Solve(board,row,col+1))return true;
            }
            board[row][col] = 0;
        }
        return false;
    }


    // main function that does all the sub functions
    function sudokuGame(){
        let row = 9 , col = 9;
        for(let i=0;i<row;i++){
            board[i] = [];
            for(let j=0;j<col;j++){
                board[i][j]=0;
            }
        }
        board[0][0] ={val :  r(9) , fixed : true};
        board[board.length-1][board[0].length-1] = {val :  r(9) , fixed : true};
        // partially solve 
        
        Solve(board,0,0);
        
        // removes few elements
        for(let i=0;i<(board.length*board[0].length)/2;i++){
            let x = r(8);
            let y = r(8);
            if(board[x][y]==0)i--;
            else{
                board[x][y]={val:0,fixed:false};
            }
        }
        // print board
        // printBoard(board);
        addBoardToUser(board);
        let elems = document.getElementsByClassName('elem');
        Array.from(elems).forEach((elem, index) => {
          let i = Math.floor(index / 9);
          let j = index % 9;
      
          elem.addEventListener('click', () => {
            console.log(elem.innerHTML);
            // updateValue(elem, board, i, j);
            currCand = elem;
            currX = i;
            currY = j;
            updateCand();
          });
        });
    }

    Array.from(selems).forEach(selem => {
        selem.addEventListener('click', e => {
        console.log(e.target.innerHTML);
            currHost = e.target.innerHTML;
            updateValue();
        });
    });

    

    // Partially solved sudoku generated

    // updates the color of the element on click
    function updateCand(){
        if (board[currX][currY].fixed==true)return;
        currCand.style.backgroundColor = 'var(--hover-color)';

        if (prevElem != null) {
            prevElem.style.backgroundColor = 'var(--change-color)';
        }
        prevElem = currCand;
    }

    // updates the value of the element by user
    function updateValue() {
        if(board[currX][currY].fixed==false && currCand!=null && currHost!=0)currCand.innerHTML = currHost;
        currHost = 0;
        prevElem = currCand;
    }

    // adds the created board to the UI
    function addBoardToUser(board){
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[0].length;j++){
                // sudoku.innerHTML = `<div class="elem"> ${board[i][j]}
                // </div>`;
                let elem = document.createElement('div');
                elem.setAttribute('class','elem');
                elem.innerHTML = board[i][j].val;
                if(board[i][j].fixed==true){
                    elem.style.backgroundColor = 'rgba(66, 158, 243, 0.653)'
                }
                sudoku.append(elem);
            }
        }
    }



    // submit and reset buttons
    document.querySelector('.submitbtn').addEventListener('click',()=>{
        if(verifySudoku()==true){alert('Congratulations! You won the game'); sudoku.innerHTML=''   ;sudokuGame();}
        else alert('try again!');   
    })

    document.querySelector('.resetbtn').addEventListener('click',()=>{
       if( confirm("Are you sure!")==true){
        sudoku.innerHTML=''   ;
        sudokuGame();
       }else return;
    })

    
    
    // function that finally verifies the users gameplay
    function verifySudoku(){
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[0].length;j++){
                let val = board[i][j].val;
                if(isfinalSafe(board,i,j,val)==false)return false;
            }
        }
        return true;
    }

    function isfinalSafe(board , row, col, val){
        for(let i=0;i<board.length;i++){
            if( i!=row && board[i][col].val==val)return false;
        }
        for(let i=0;i<board[0].length;i++){
            if(i!=col && board[row][i].val==val)return false;
        }
        for(let i=row-row%3;i<(row-row%3)+3;i++){
            for(let j=col-col%3;j<(col-col%3)+3;j++){
                if(!(i==row && j==col) && board[i][j].val==val)return false;
            }
        }
        return true;
    }


    // function to print the sudoku
    // function printBoard( board){
    //     for(let i=0;i<board.length;i++){
    //         let str = "";
    //         for(let j=0;j<board[0].length;j++){
    //             str+=board[i][j] + " ";
    //         }
    //         console.log(str);
    //     }
    // }
    
