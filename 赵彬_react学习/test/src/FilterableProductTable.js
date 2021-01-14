import React from 'react';
import './index.css';


class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">{category}</th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? (
            product.name
        ) : (
            <span style={{ color: "red" }}>{product.name}</span>
        );
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const {filterText,inStockOnly} = this.props;
        const map = new Map();
        this.props.products.forEach(product => {
            const {category,name,stocked} = product;
            if(name.toLowerCase().indexOf(filterText.toLowerCase())===-1){
                return;
            }
            if(inStockOnly && !stocked){
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
                <tbody>{allRows}</tbody>
            </table>
        );


    }
}

class SearchBar extends React.Component {

    handleChange = event => {
        this.props.handleChange(event)
    }
    handleCheckbox = event => {
        this.props.handleCheckbox(event)
    }
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return (
            <form>
                <input type="text" placeholder="Search..." onChange={this.handleChange} />
                <p>
                    <input type="checkbox" onChange={this.handleCheckbox} checked={inStockOnly} /> Only show
                    product in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            inStockOnly: false,
        };
    }

    handleChange = e => {
        const value = e.target.value
        console.log(value)
        this.setState({
            filterText: value
        });
    }
    handleCheckbox = e => {
        const checked  = e.target.checked
        this.setState({
            inStockOnly: checked
        });
    }

    render() {
        return (
            <div>
                <SearchBar 
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                  handleChange={this.handleChange}
                  handleCheckbox={this.handleCheckbox}
                />
                <ProductTable 
                  products={this.props.products}
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}


export default FilterableProductTable