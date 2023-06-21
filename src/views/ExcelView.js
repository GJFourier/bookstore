import React from "react";
import PropTypes from "prop-types";
import { Table } from "../components/Table";
import { Toolbar } from "../components/Toolbar";

export class ExcelView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // [row index, cell index],
      search: false,
      preSearchData: null,
    };
  }

  render() {
    return (
      <div>
        <Toolbar
          setState={(data) => this.setState(data)}
          state={this.state}
        ></Toolbar>
        <Table
          setState={(data) => this.setState(data)}
          state={this.state}
          headers={this.props.headers}
        ></Table>
      </div>
    );
  }
}

ExcelView.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
