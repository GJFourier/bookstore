import { Input } from "antd";

const { Search } = Input;
const onSearch = (value) => console.log(value);

export function Searchbar(props) {
  return <Search placeholder={props.message} onSearch={onSearch} enterButton />;
}
