import { Cookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { getUserBookForm } from "../Service/BookService";
import { DatePicker, Table } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { IBook, IBookAmountPriceForm } from "../interface";
import type { ColumnsType, TableProps } from "antd/es/table";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export function StatisticsCustomerView() {
  const cookies = new Cookies();
  const user = cookies.get("currentUser");

  //fix 8 hours difference
  const now = moment().add(8, "hours").toDate(); // Convert to Date object
  const lastMonth = moment().add(8, "hours").subtract(1, "months").toDate();
  const [bookAmountPriceData, setBookAmountPriceData] = useState<
    IBookAmountPriceForm[]
  >([]);
  const [totalConsumption, setTotalConsumption] = useState<number>(0);

  function getData(beginTime: Date, endTime: Date, userId: number) {
    getUserBookForm(beginTime, endTime, userId).then((res) => {
      console.log(res);
      setTotalConsumption(res.totalConsumption);
      const newData = res.bookAmountPrices.map((item: IBookAmountPriceForm) => {
        return item;
      });
      setBookAmountPriceData(newData);
    });
  }

  useEffect(() => {
    getData(lastMonth, now, user.id);
  }, []);

  const handleTimeChange = (dates: any) => {
    if (dates[0] !== null && dates[1] !== null) {
      // console.log(dates[0].subtract(8, "hours").toDate());
      // console.log(dates[1].subtract(8, "hours").toDate());
      getData(dates[0].toDate(), dates[1].toDate(), user.id);
    }
  };

  const columns: ColumnsType<IBookAmountPriceForm> = [
    {
      title: "Title",
      sorter: (a, b) => a.book.name.length - b.book.name.length,
      render: (record) => <>{record.book.name}</>,
    },
    {
      title: "Amount",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
      render: (record) => <>{record.amount}</>,
    },
    {
      title: "Price",
      sorter: (a, b) => a.price - b.price,
      render: (record) => <>{record.price}</>,
    },
  ];

  return (
    <div>
      <h1>Statistic</h1>
      <RangePicker
        defaultValue={[dayjs(now), dayjs(lastMonth)]}
        format={dateFormat}
        style={{ width: "500px" }}
        onChange={handleTimeChange}
      />
      <h2>Total consumption: {totalConsumption}</h2>
      <Table
        columns={columns}
        dataSource={bookAmountPriceData}
        style={{ marginRight: "30px" }}
      />
    </div>
  );
}
