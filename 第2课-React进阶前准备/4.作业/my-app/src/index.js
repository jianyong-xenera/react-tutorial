import React from "react";
import ReactDOM from "react-dom";
import './index.css';

class ProductRow extends React.Component{
    render(){
        let {name,price,stocked} = this.props.product;
        const style = {
            color:'red'
        }
        name = stocked?name:<span style={style}>{name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{price}</td>
            </tr>
        )
    }
}
class ProductCategoryRow extends React.Component{
    render(){
        const category = this.props.category;
        return (
            <tr>
                <th colSpan='2'>{category}</th>
            </tr>
        )
    }
}

class ProductTable extends React.Component{
    render(){
        const {filterText,isStockOnly} = this.props;
        const map = new Map();
        this.props.products.forEach(product => {
            const {category,name,stocked} = product;
            if(name.toLowerCase().indexOf(filterText.toLowerCase())===-1){
                return;
            }
            if(isStockOnly && !stocked){
                return;
            }
            let rows = map.get(category);
            if(!rows){
                rows = [<ProductCategoryRow key={category}
                                            category={category}/>];
                map.set(category,rows)
            }
            rows.push(
                <ProductRow key={name}
                            product={product} />
            );
            
        });
        const allRows = [...map.values()].reduce((accum,item)=>[...accum,...item],[]);
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {allRows}
                </tbody>
            </table>
        )
    }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleStockChange = this.handleStockChange.bind(this);
    }
    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }
    handleStockChange(e){
        this.props.onStockChange(e.target.checked);
    }
    render(){
        const {filterText,isStockOnly} = this.props;
        return (
            <form>
                <input type='text' 
                        placeholder="Search..."
                        value={filterText}
                        onChange={this.handleFilterTextChange}/>
                <p>
                    <input type='checkbox'  
                            checked={isStockOnly}
                            onChange={this.handleStockChange}
                    /> Only show products in stock?
                </p>
            </form>
        )
    }
}

// 搜索头
class FilterProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText:'',
            isStockOnly:false
        }
        this.onFilterTextChange = this.onFilterTextChange.bind(this);
        this.onStockChange = this.onStockChange.bind(this);
    }
    onFilterTextChange(filterText){
        this.setState({
            filterText
        });
    }
    onStockChange(isStockOnly){
        this.setState({
            isStockOnly
        });
    }
    render(){
        const {filterText,isStockOnly} = this.state;
        return (
            <div>
                <SearchBar
                    filterText={filterText}
                    isStockOnly={isStockOnly}
                    onFilterTextChange={this.onFilterTextChange}
                    onStockChange={this.onStockChange}
                />
                <ProductTable 
                    filterText={filterText}
                    isStockOnly={isStockOnly}
                    products={this.props.products}/>
            </div>
        )
    }
}
// 自定义数据
const PRODUCTS = [
    {category: 'Game Machine', price: '$149.99', stocked: true, name: 'PS5'},
    {category: 'Cellphone', price: '$299.99', stocked: true, name: 'xiaomi30'},
    {category: 'Cellphone', price: '$1399.99', stocked: false, name: 'meizu'},
    {category: 'Game Machine', price: '$29.99', stocked: true, name: 'computer'},
    {category: 'Game Machine', price: '$229.99', stocked: false, name: 'switch'},
    {category: 'Cellphone', price: '$1299.99', stocked: true, name: 'huawei30'}
  ];
ReactDOM.render(
    <FilterProductTable products={PRODUCTS}/>,
    document.getElementById('root')
);