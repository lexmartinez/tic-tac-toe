import {ChangeDetectorRef, Component} from '@angular/core';
import {AppService} from './app.service';

declare const Pusher: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  board: string [][] = [['', '', ''], ['', '', ''], ['', '', '']];
  turn = false;
  user = '';
  winner = '';

  constructor(private cdr: ChangeDetectorRef, private service: AppService) {
    this.getUser();
  }

  public play(col, row) {
    if (this.board[col][row] === '' && this.turn) {
      this.turn = false;
      this.service.send(col, row, this.user);
    }
  }

  public reset() {
      this.service.reset().then(() => {
        this.turn = false;
        this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        this.winner = '';
        this.cdr.detectChanges();
      })
  }

  public getUser() {
    this.service.user().then((data) => {
      this.user = data['user'];
      if (this.user === 'X') {
        this.turn = true;
      }

      const pusher = new Pusher(data['key'], {
        cluster: data['cluster'],
        encrypted: true
      });
      const channel = pusher.subscribe('tic-tac-toe');

      channel.bind('reset-event', (resetData) => {
        this.turn = false;
        this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        this.winner = '';
        this.getUser();
        this.cdr.detectChanges();
      });

      channel.bind('move-event', (eventData) => {
        this.board[eventData.col][eventData.row] = eventData.user;
        if (eventData.user !== this.user) {
          this.turn = true;
        }
        this.validateWinner();
        this.cdr.detectChanges();
      });

      this.cdr.detectChanges();
    }).catch((error) => {
      console.log(error);
    });
  }

  public validateWinner() {
    const op = [];
    op[0] = `${this.board[0][0]}${this.board[1][0]}${this.board[2][0]}`;
    op[1] = `${this.board[0][1]}${this.board[1][1]}${this.board[2][1]}`;
    op[2] = `${this.board[0][2]}${this.board[1][2]}${this.board[2][2]}`;
    op[3] = `${this.board[0][0]}${this.board[0][1]}${this.board[0][2]}`;
    op[4] = `${this.board[1][0]}${this.board[1][1]}${this.board[1][2]}`;
    op[5] = `${this.board[2][0]}${this.board[2][1]}${this.board[2][2]}`;
    op[6] = `${this.board[0][0]}${this.board[1][1]}${this.board[2][2]}`;
    op[7] = `${this.board[2][0]}${this.board[1][1]}${this.board[0][2]}`;

    for (let i = 0; i < op.length; i++) {
      if (op[i] === 'XXX' || op[i] === 'OOO') {
        this.turn = false;
        this.winner = op[i].charAt(0);
        this.cdr.detectChanges();
        return;
      }
    }
    for (let i = 0; i < 3 ; i++ ) {
      for (let j = 0; j < 3 ; j++ ) {
        if (this.board[i][j] === '') {
          return;
        }
      }
    }
    this.turn = false;
    this.winner = 'tie';
    this.cdr.detectChanges();
  }

}
