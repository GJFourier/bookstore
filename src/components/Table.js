import React from "react";
import {Search} from "./Search";

export class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state= this.props.state;
    }
    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.props.state.data.slice();
        let descending = this.props.state.sortby === column && !this.props.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.props.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };
    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.props.state.data.slice();
        data[this.props.state.edit.row][this.props.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
    };
    showEditor = (e) => {
        this.props.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };
    render = () => {
        return (
            <table>
                <thead onClick={this.sort}>
                <tr>{
                    this.props.headers.map(function (title, idx) {
                        if (this.props.state.sortby === idx) {
                            title += this.props.state.descending ? ' \u2191' : ' \u2193';
                        }
                        return <th key={idx}>{title}</th>;
                    }, this)
                }</tr>
                </thead>
                <tbody onDoubleClick={this.showEditor}>
                <Search state = {this.props.state} headers = {this.props.headers} setState={(data)=>this.props.setState(data)}></Search>
                {this.props.state.data.map(function (row, rowidx) {
                    return (
                        <tr key={rowidx}>{
                            row.map(function (cell, idx) {
                                let content = cell;
                                let edit = this.props.state.edit;
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = (
                                        <form onSubmit={this.save}>
                                            <input type="text" defaultValue={cell}/>
                                        </form>
                                    );
                                }
                                return <td key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                        </tr>
                    );
                }, this)}
                </tbody>
            </table>
        );
    }
}