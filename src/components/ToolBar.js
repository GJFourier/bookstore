import React from "react";
import download from "../Services/Download";

export class Toolbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.props.state;
    }
    toggleSearch = () => {
        if (this.props.state.search) {
            this.props.setState({
                data: this.props.state.preSearchData,
                search: false,
                preSearchData: null,
            });
        } else {
            this.props.setState({
                search: true,
                preSearchData: this.props.state.data,
            });
        }
    };
    render = () => {
        return (
            <div className="toolbar">
                <button onClick={this.toggleSearch}>Search</button>
                <a onClick={(e)=>{download( 'json', e, this.props.state.data)}}
                   href="data.json">Export JSON</a>
                <a onClick={(e)=>{download('csv', e, this.props.state.data)}}
                   href="data.csv">Export CSV</a>
            </div>
        );
    };
}