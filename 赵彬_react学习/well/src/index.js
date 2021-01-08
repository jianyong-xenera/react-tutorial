import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// DOM 元素 <button> 是一个内置组件，
// 因此其 onClick 属性在 React 中有特殊的含义。而对于用户自定义的组件来说，
// 命名就可以由用户自己来定义了。我们给 Square 的 onClick 和 Board 的 handleClick 
// 赋予任意的名称，代码依旧有效。在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，
// 将处理事件的监听方法命名为 handle[Event] 这样的格式。

// 组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单
  function Square(props) {
    return (
      <button className={ props.winner ? 'square gold' : 'square' } onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
//   点击 Square 来填充那些方格，
//   效果与之前相同。但是，当前 state 没有保存在单个的 Square 组件中，
//   而是保存在了 Board 组件中。每当 Board 的 state 发生变化的时候，这些 Square 组件都会重新渲染一次。
//   把所有 Square 的 state 保存在 Board 组件中可以让我们在将来判断出游戏的胜者

class Board extends React.Component {


    isWinnerSquare(i) {
        if(this.props.winner && this.props.winner.line.findIndex(el => el === i) !== -1) {
            return true;
        }
        return null;
    }

    renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      winner={this.isWinnerSquare(i)}
      key={i}
      />;
    }
  
    render() {
      return (
        <div>
            {Array(3).fill(null).map((item1,i) => {
                return (<div className="board-row" key={i}>
                    {Array(3).fill(null).map((item2,j) => {
                        return this.renderSquare(3 * i + j)
                    })}
                </div>)
            })}
        </div>
      );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
            x: 0, // 行号
            y: 0, // 列号
          }],
          xIsNext: true,
          stepNumber: 0,
          historyReverse: false
        };
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
            x: Math.floor(i / 3),
            y: i % 3
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }

    historyReverse() {
        this.setState({
            historyReverse: !this.state.historyReverse,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            const bold = this.state.stepNumber === move ? 'bold' : '';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)} className={bold}>{desc},坐标({step.x + 1}:{step.y + 1})</button>
              </li>
            );
          });
        
        let movesView = this.state.historyReverse ? moves.reverse() : moves;
        let status;
        if (winner) {
            status = 'Winner: ' + winner.name;
        } else if(this.state.stepNumber === 9) {
            status = 'it ends in a draw'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares={current.squares}
                winner = {winner}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>
                <button onClick={() => this.historyReverse()}>Reverse</button>
            </div>
            <ol>{movesView}</ol>
          </div>
        </div>
      );
    }
}
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
            name: squares[a],
            line: lines[i],
        };
      }
    }
    return null;
  }
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
