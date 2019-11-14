import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMgmtService } from '../../services/user-mgmt.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  PLAYER_COMPUTER = { name: 'Computer', symbol: 'o' };
  PLAYER_HUMAN = { name: sessionStorage.getItem('name'), symbol: 'x' };
  DRAW = { name: 'Draw' };

  board: any[];
  currentPlayer = this.PLAYER_HUMAN;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;
  isResuming: boolean;
  
  constructor(public rest:UserMgmtService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	if (typeof(history.state.data) === "undefined")
  		this.isResuming = false; 
  	else
  		this.isResuming = true;
  	console.log(this.isResuming)
  	this.newGame();
  }

  square_click(square) {
    if(square.value === '' && !this.gameOver) {
      square.value = this.PLAYER_HUMAN.symbol;
      this.completeMove(this.PLAYER_HUMAN);
    }
  }

  computerMove(firstMove: boolean = false) {
    this.boardLocked = true;

    setTimeout(() => {
      let square = firstMove ? this.board[4] : this.getRandomAvailableSquare();
      square.value = this.PLAYER_COMPUTER.symbol;
      this.completeMove(this.PLAYER_COMPUTER);
      this.boardLocked = false;
    }, 600);
  }

  saveBoardState(){
  	// Saving board state in DB
  	var data = {"sessionId": parseInt(sessionStorage.getItem("currSessionId")), "boardState": JSON.stringify(this.board)};	
  	this.rest.saveBoardState(data).subscribe((res) => {
      console.log("Saved board to DB");
    }, (err) => {
      console.log("Saving board to DB FAILED!!", err);
    });
  }

  deleteFromMovesTable() {
  	var sessionId = sessionStorage.getItem("currSessionId");
    this.rest.deleteMoves(sessionId).subscribe((res) => {
      console.log("Deleted all moves from ttt_moves");
      this.deleteActiveSession();

    }, (err) => {
      console.log("Deleting moves FAILED!!", err);
    });
  }

  deleteActiveSession() {
  	var sessionId = sessionStorage.getItem("currSessionId");
    this.rest.deleteActiveSession(sessionId).subscribe((res) => {
      console.log("Deleted from active_sessions");
    }, (err) => {
      console.log("Deleting session FAILED!!", err);
    });
  }

  completeMove(player) {
    this.saveBoardState();

    if(this.isWinner(player.symbol))
      this.showGameOver(player);
    else if(!this.availableSquaresExist())
      this.showGameOver(this.DRAW);
    else {
      this.currentPlayer = (this.currentPlayer == this.PLAYER_COMPUTER ? this.PLAYER_HUMAN : this.PLAYER_COMPUTER);

      if(this.currentPlayer == this.PLAYER_COMPUTER)
        this.computerMove();
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value == '').length > 0;
  }

  getRandomAvailableSquare(): any {
    let availableSquares = this.board.filter(s => s.value === '');
    var squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if(winner !== this.DRAW)
      this.currentPlayer = winner;  

  	// Deleting from tables -- first from moves and then active_session
  	// coz foreign key relatn
  	this.deleteFromMovesTable();

  }

  get winningIndexes(): any[] {
    return [
      [0, 1, 2],  //top row
      [3, 4, 5],  //middle row
      [6, 7, 8],  //bottom row
      [0, 3, 6],  //first col
      [1, 4, 7],  //second col
      [2, 5, 8],  //third col
      [0, 4, 8],  //first diagonal
      [2, 4, 6]   //second diagonal
    ];
  }

  isWinner(symbol): boolean {
    for(let pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value == symbol
        && this.board[pattern[1]].value == symbol
        && this.board[pattern[2]].value == symbol;

      if(foundWinner) {
        for(let index of pattern) {
          this.board[index].winner = true;
        }

        return true;
      }
    }

    return false;
  }

  newGame() {

  	if(!this.isResuming)
  	{
	    this.board = [
	      { value: '' }, { value: '' }, { value: '' },
	      { value: '' }, { value: '' }, { value: '' },
	      { value: '' }, { value: '' }, { value: '' }
	    ];

	    var data = {"player1": sessionStorage.getItem("email"), "player2":"ai@ai.com", "gameId":1}

	    this.rest.startNewSession(data).subscribe((res) => {
	      sessionStorage.setItem("currSessionId", res);
	    }, (err) => {
	      console.log("Oops", err);
	      alert("ERR with starting New Session.. Try again!")
	    });
	}
	else{
		this.getCurrentBoardState().subscribe(data => {
			this.board = JSON.parse(data[0]["board_state"]);
			this.isResuming = false;
			console.log("Resuming game...board looks like-", this.board);
		});
		
	}//else
  	
    this.gameOver = false;
    this.boardLocked = false;

    if(this.currentPlayer == this.PLAYER_COMPUTER){
      this.boardLocked = true;
      this.computerMove(true);
    }
  }

  getCurrentBoardState() {
  	var sessionId = sessionStorage.getItem("currSessionId");
  	return this.rest.getLatestBoard(sessionId).pipe(map((res) => {
      return res;
    }));
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  public logout() {
  	sessionStorage.clear();
  	this.router.navigate(['/login']);
  }

}
