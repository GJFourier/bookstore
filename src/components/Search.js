import React from "react";

export class Searchs extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  search = (e) => {
    let needle = e.target.value.toLowerCase();
    if (!needle) {
      this.props.setState({ data: this.props.state.preSearchData });
      return;
    }
    let idx = e.target.dataset.idx;
    let searchdata = this.props.state.preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.props.setState({ data: searchdata });
  };
  render = () => {
    if (!this.props.state.search) {
      return null;
    }
    return (
      <tr onChange={(e) => this.search(e)}>
        {this.props.headers.map(function (ignore, idx) {
          return (
            <td key={idx}>
              <input type="text" data-idx={idx} />
            </td>
          );
        })}
      </tr>
    );
  };
}
