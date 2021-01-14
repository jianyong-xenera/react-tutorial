import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


// Context可以让我们无须明确的传遍每一个组件，就能将值深入传递进组件树
// 为当前的 theme创建一个context（“light”为默认值）
// const ThemeContext = React.createContext('light');
// class App extends React.Component {
//     render() {
//         // 使用一个Provider来将当前的theme传递给一下的组件树
//         // 无论多深，任何组件都能读取这个值
//         // 在这个例子中，我们将“dark”作为当前的值传递下去
//         return (
//             <ThemeContext.Provider value="dark">
//                 <Toolbar />
//             </ThemeContext.Provider>
//         );
//     }
// }

// // 中间的组件再也不必指明往下传递theme了
// function Toolbar() {
//     return (
//         <div>
//             <ThemedButton />
//         </div>
//     );
// }

// function Button(props) {
//     return (
//         <button>{props.theme}</button>
//     );
// }



// class ThemedButton extends React.Component {
//     // 指定contextType读取当前的 theme context
//     // React 会往上找到最近的theme Provider 然后使用它的值
//     static contextType = ThemeContext;
//     render() {
//         return <Button theme={this.context} />
//     }
// }


// 消费多个Context
// 用户登录context
// const UserContext = React.createContext({
//     name: 'Guest',
// });

// class App extends React.Component {
//     render() {
//         const {signedInUser, theme} = this.props;

//         // 提供初始 context值的App组件
//         return (
//             <ThemeContext.Provider value={theme}>
//                 <UserContext.Provider value={signedInUser}>
//                     <Layout />
//                 </UserContext.Provider>
//             </ThemeContext.Provider>
//         )
//     }
// }

// function Layout() {
//     return (
//         <div>
//             <Content />
//         </div>
//     );
// }
// function ProfilePage(props) {
//     return (
//         <div>
//             {props.user},{props.theme}
//         </div>
//     );
// }

// // 一个组件可能会消费多个 context
// function Content() {
//     return (
//         <ThemeContext.Consumer>
//             {theme => (
//                 <UserContext.Consumer>
//                     {user => (
//                         <ProfilePage user={user} theme={theme} />
//                     )}
//                 </UserContext.Consumer>
//             )}
//         </ThemeContext.Consumer>
//     )
// }

// ref 使用
// class CustomTextInput extends React.Component {
//     constructor(props) {
//         super(props);
//         // 创建一个ref来存储textInput的DOM元素
//         this.textInput = React.createRef();
//         this.focusTextInput = this.focusTextInput.bind(this);
//     }

//     focusTextInput() {
//         // 直接使用原生的API使text输入框获得焦点
//         // 注意：我们通过""current"来访问DOM节点
//         this.textInput.current.focus();
//     }
//     render() {
//         // 告诉React我们想把<input> ref关联到构造器里创建的textInput上
//         return (
//             <div>
//                 <input
//                   type="text"
//                   ref={this.textInput}
//                 />
//                 <input 
//                   type="button"
//                   value="Focus the text input"
//                   onClick={this.focusTextInput}
//                 />
//             </div>
//         )
//     }
// }


// class AutoFocusTextInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.textInput = React.createRef();
//     }

//     componentDidMount() {
//         this.textInput.current.focusTextInput();
//     }

//     render() {
//         return (
//             <CustomTextInput ref={this.textInput} />
//         )
//     }
// }


// 高阶组件

ReactDOM.render(<App />, document.getElementById('root'));