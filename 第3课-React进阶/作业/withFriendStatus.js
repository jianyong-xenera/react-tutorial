// 此函数接收一个组件...
function withFriendStatus(WrappedComponent, friendID) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleStatusChange = this.handleStatusChange.bind(this);
      this.state = {
        isOnline: null,
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    }

    componentWillUnmount() {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    }

    handleStatusChange(status) {
      this.setState({
        isOnline: status.isOnline,
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent isOnline={this.state.isOnline} {...this.props} />;
    }
  };
}