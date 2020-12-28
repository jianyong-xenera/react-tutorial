import { func } from 'prop-types';
import React,{useState,useEffect} from 'react';
// 此函数接收一个组件...
function usewithSubscription(props) {
  const [data,setdata]=useState(null)
  // ...并返回另一个组件...
  useEffect(()=> {
    function handleChange(status){
      this.setState({
        setdata(DataSource,status)
      })
    }
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(props,this.handleChange);
      return () =>{
      DataSource.removeChangeListener(props,this.handleChange);
      }
  })
  return data
}
// 抽出逻辑共享