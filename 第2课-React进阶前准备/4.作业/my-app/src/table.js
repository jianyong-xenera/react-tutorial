import React ,{Component,useState} from 'react';
import './App.css'; 

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

function SearchBar(props){
  const searchProps=props;
  function  handleFilterTextChange(e) {
    searchProps.onFilterTextChange(e.target.value);
  }
  
  function handleInStockChange(e) {
    searchProps.onInStockChange(e.target.checked);
  }
    return (
      <div>
        <input placeholder="search" value={props.filterText} onChange={handleFilterTextChange} />
        <p>
          <input type="checkbox" checked={props.inStockOnly} onChange={handleInStockChange} />
          Only show products in stock
        </p>
      </div>
    );
}

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}
function Content(props){
  const contentProps=props;
    console.log(contentProps,"contentProps")
    const filterText = contentProps.filterText;
    const inStockOnly = contentProps.inStockOnly;
    const rows = [];
    let lastCategory = null;
    contentProps.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });
    return (
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
    );
}
function Table() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const handleFilterTextChange=(event)=> {
    setFilterText(event)
  };
  const handleInStockChange=(event)=> {
    setInStockOnly(event)
  };
  return (
    <div className="App">
     <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={handleFilterTextChange} onInStockChange={handleInStockChange}  />
     <Content products={PRODUCTS} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

export default Table;
