import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilterableProductTable from "./FilterableProductTable";

function FancyBorder(props) {
    return (
        <div className={"FancyBorder FancyBorder-" + props.color}>
            {props.children}
        </div>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog-message">{props.message}</p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        // 在JSX中传递的事件不是一个字符串，
        // 而是一个函数（如:onClick={this.handleClick}），
        // 此时onClick即是中间变量，所以处理函数中的this指向会丢失。
        // 解决这个问题就是给调用函数时bind(this)，从而使得无论事件处理函数如何传递，this指向都是当前实例化对象。
        // 当然，如果不想使用bind(this)，我们可以在声明函数时使用箭头函数将函数内容返回给一个变量，并在调用时直接使用this.变量名即可
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = { login: "" };
    }

    render() {
        return (
            <Dialog
              title="Mars Exploration Program"
              message="How should we refer to you?"
            >
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>Sign Me Up</button>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({ login: e.target.value });
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}

const PRODUCTS = [
    {
      category: "Sporting Goods",
      price: "$49.99",
      stocked: true,
      name: "Football",
    },
    {
      category: "Sporting Goods",
      price: "$9.99",
      stocked: true,
      name: "Baseball",
    },
    {
      category: "Sporting Goods",
      price: "$29.99",
      stocked: true,
      name: "Basketball",
    },
    {
      category: "Electronics",
      price: "$99.99",
      stocked: true,
      name: "iPod Touch",
    },
    {
      category: "Electronics",
      price: "$399.99",
      stocked: false,
      name: "iPhone 5",
    },
    {
      category: "Electronics",
      price: "$199.99",
      stocked: true,
      name: "Nexus 7",
    },
  ];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
