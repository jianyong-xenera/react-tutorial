import React, {Component} from 'react';
class SearchBar extends Component {

      render() {
        return (
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              onChange={(e) =>this.props.onFilterTextChange(e.target.value)}
            />
            <p>
              <input
                type="checkbox"
                checked={this.props.inStockOnly}
                onChange={(e) =>this.props.onInStockChange(e.target.checked)}
              />{" "}
              Only show products in stock
            </p>
          </form>
        );
      }
}
export default SearchBar;
