import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {/* 在此高亮显示棋子 */}
      <font color={props.color}>{props.value}</font>
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let color;
    if (this.props.line && this.props.line.includes(i)) {
      color = "red";
    } else {
      color = "black";
    }
    return <Square
      key={i}
      color={color}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  }
  //用两个for循环将表格渲染在页面上
  render() {
    let outerDiv = [];
    for (var i = 0; i < 9; i += 3) {
      var squares = [];
      for (var j = i; j < i + 3; j = j + 1) {
        var square = this.renderSquare(j)
        squares.push(square)
      }
      outerDiv.push(<div key={i} className="board-row">{squares}</div>)
    }
    return (
      <div>
        {outerDiv}
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
        codeNum: null,
      }],
      xIsNext: true,
      stepNumber: 0,
      desc: true,//排序
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const column = 3;
    const raw = 3;
    var nowColumn = (i + 1) % column === 0 ? raw : (i + 1) % column;
    var nowRaw = parseInt(i / raw) + 1;
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        codeNum: [nowColumn, nowRaw],
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
  // 排序
  sort(){
    this.setState({
      desc:! this.state.desc,
    })
  }
  render() {
    console.log(this.state.stepNumber)
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // const winner = calculateWinner(current.squares);
    //取到结果后，赋值给lines和原本的winner
    const result = calculateWinner(current.squares);
    const winner = result.winner;
    const lines = result.lines;
    //历史记录
    const moves = history.map((step, move) => {
      const desc = move ?
        '第 ' + move + ' 步,坐标（' + step.codeNum + ')' :
        'Go to game start';
      return (
        
        <li key={move}>
          <button className={move === this.state.stepNumber ? 'button' : 'currentButton'} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
let orderableMoves;
if(this.state.desc) {
  orderableMoves = moves;
} else {
  orderableMoves = moves.reverse();
}
    let status;
    if (winner) {
      status = 'Winner' + winner;
    } else if (this.state.history.length > 9) {
      status ='游戏平局'
    }
    else {
      status = 'Next player' + (this.state.xIsNext ? 'X' : 'O');
    }
    console.log(winner)
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            line={lines}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button onClick={()=>{this.sort()}}>排序</button>
          <ol>{orderableMoves}</ol>
        </div>
      </div>
    )

  }
}
ReactDOM.render(
  <Game />,
  // element,
  document.getElementById('root')
);
function calculateWinner(squares) { //这个将squares传入这里验证是否存在
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
      //返回一个对象，包含原本的获胜者winner，以及连成一线的3颗棋子的编号
      return { winner: squares[a], lines: lines[i] };
    }
  }
  return { winner: null, lines: null };
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
