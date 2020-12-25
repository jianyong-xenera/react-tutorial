

function friendStatus(WrappedComponent,) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.state = { 
            isOnline: null 
        };
        
      }
  
      componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }
      componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
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

  
  