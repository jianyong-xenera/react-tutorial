
import './App.css';
import React from 'react';
class ProductTableRow extends React.Component{
  render(){
    var border1={  color:"red",  backgroundColor: "lawngreen",textAlign:"center"}
    return(
      <tr>
        <td style={border1}>{this.props.name}</td>
        <td style={border1}> {this.props.price}</td>
      </tr>
    )
  }
}
class ProductTable extends React.Component{
  render(){
    const SearchText=this.props.SearchText;

    const rows=[];
    this.props.productdatas.forEach((product)=> { 
      if(product.name.indexOf(SearchText)===-1){
        return;
      }
      // console.log(product.name)
      rows.push(  
        <ProductTableRow productdatas={this.props.productdatas} name={product.name}  price={product.price} key={product.name} />
      )
    })
    var width={width:"50%"}
    var border={backgroundColor:"#61dafb" ,}
    return(
      <table style={width}>
        <thead style={border}>
        <tr>
           <th>名称</th>
           <th>价格</th>
         </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}
class Search extends React.Component{
  constructor(props){
    super(props);
    this.handleSearchTextChange=this.handleSearchTextChange.bind(this)
  }
  handleSearchTextChange(e){
    this.props.onSearchTextChange(e.target.value)
    // console.log(e.target.value)
  }
  render(){
    // const filterText=this.props.filterText
    return(
      <div>
        <input  type="text" placeholder="请按名称搜索..." value={this.props.SearchText} onChange={this.handleSearchTextChange}></input>
      </div>
    )
  }
}
class Product extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      SearchText:'',
    };
    this.handleSearchTextChange=this.handleSearchTextChange.bind(this);
  }
  handleSearchTextChange(SearchText){
    this.setState({
      SearchText:SearchText
    })
  }
render(){
  console.log(this.state.SearchText)
  return(
    <div>
      <Search SearchText={this.state.SearchText} onSearchTextChange={this.handleSearchTextChange} />
      <ProductTable SearchText={this.state.SearchText} productdatas={this.props.productdatas}/>
    </div>
  )
}
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Product productdatas={productdata} />
      </div>
    );
  }
}

const productdata=[
  {
    name:"华为",
    price:'4000',    
  },
  {
    name:"苹果",
    price:'4000',    
  },
  {
    name:"小米",
    price:'4000',    
  },
  {
    name:"魅族",
    price:'4000',    
  },
  {
    name:"oneplus",
    price:'4000',    
  }
]
export default App;
