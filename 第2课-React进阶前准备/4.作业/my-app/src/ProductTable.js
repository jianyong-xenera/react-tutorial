import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import React, {Component} from 'react';

class ProductTable extends Component {
    render() {
        const searchInput = this.props.filterText;
        const searchCheckBox = this.props.inStockOnly;
        const productList = this.props.productList;
        const rows = [];
        let lastCategory = null;
        productList.forEach(product => {
            if (product.name.indexOf(searchInput) === -1) {
                return;
            }
            if (searchCheckBox && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        })
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
export default ProductTable;