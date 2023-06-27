import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Table } from "antd";
import moment from "moment/moment";

import { ColumnsType } from "antd/es/table";
import { IBook, IUser } from "../interface";
import { getBookStatistic, getUserStatistic } from "../Service/BookService";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export function StatisticsAdminTableView() {
  interface IStatisticsUser {
    user: IUser;
    totalConsumption: number;
  }

  interface IStatisticsBook {
    book: IBook;
    amount: number;
    price: number;
  }

  const [statisticsBooks, setStatisticsBooks] = useState<IStatisticsBook[]>([]);
  const [statisticsUsers, setStatisticsUsers] = useState<IStatisticsUser[]>([]);

  const now = moment().add(8, "hours").toDate(); // Convert to Date object
  const lastMonth = moment().add(8, "hours").subtract(1, "months").toDate();

  const getBookData = (beginTime: Date, endTime: Date) => {
    getBookStatistic(beginTime, endTime).then((res: IStatisticsBook[]) => {
      const newBookData = res.sort((b, a) => {
        return a.amount - b.amount;
      });
      setStatisticsBooks(newBookData);
    });
  };

  const getUserData = (beginTime: Date, endTime: Date) => {
    getUserStatistic(beginTime, endTime).then((res: IStatisticsUser[]) => {
      const newUserData = res.sort((b, a) => {
        return a.totalConsumption - b.totalConsumption;
      });
      setStatisticsUsers(newUserData);
    });
  };

  useEffect(() => {
    console.log("now", now);
    getUserData(lastMonth, now);
    getBookData(lastMonth, now);
  }, []);

  const handleBookTimeChange = (dates: any) => {
    if (dates[0] !== null && dates[1] !== null) {
      getBookData(dates[0].toDate(), dates[1].toDate());
    }
  };

  const handleUserTimeChange = (dates: any) => {
    if (dates[0] !== null && dates[1] !== null) {
      getUserData(dates[0].toDate(), dates[1].toDate());
    }
  };

  const bookColumns: ColumnsType<IStatisticsBook> = [
    {
      title: "Title",
      sorter: (b, a) => a.book.name.length - b.book.name.length,
      render: (record) => <>{record.book.name}</>,
    },
    {
      title: "Amount",
      sorter: (b, a) => a.amount - b.amount,
      render: (record) => <>{record.amount}</>,
    },
    {
      title: "Price",
      sorter: (b, a) => a.price - b.price,
      render: (record) => <>{record.price}</>,
    },
  ];

  const userColumns: ColumnsType<IStatisticsUser> = [
    {
      title: "Name",
      sorter: (b, a) => a.user.username.length - b.user.username.length,
      render: (record) => <>{record.user.username}</>,
    },
    {
      title: "Total Consumption",
      sorter: (b, a) => a.totalConsumption - b.totalConsumption,
      render: (record) => <>{record.totalConsumption}</>,
    },
  ];

  return (
    <div>
      <h1>Statistic</h1>
      <h2>Books</h2>
      <RangePicker
        defaultValue={[dayjs(now), dayjs(lastMonth)]}
        format={dateFormat}
        style={{ width: "500px" }}
        onChange={handleBookTimeChange}
      />
      <Table
        columns={bookColumns}
        dataSource={statisticsBooks}
        style={{ marginRight: "30px" }}
      />

      <h2>Users</h2>
      <RangePicker
        defaultValue={[dayjs(now), dayjs(lastMonth)]}
        format={dateFormat}
        style={{ width: "500px" }}
        onChange={handleUserTimeChange}
      />
      <Table
        columns={userColumns}
        dataSource={statisticsUsers}
        style={{ marginRight: "30px" }}
      />
    </div>
  );
}
