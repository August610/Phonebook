import { Image, Table, Typography } from "antd";
import React from "react";

const columns = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: "Телефон",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Адрес",
    dataIndex: "the address",
    key: "the address",
  },
  {
    title: "Электронная почта",
    dataIndex: "email",
    key: "email",
  },
];



const _Table = ({rows = 20, cards}) => {
  const dataPhone = cards?.map((item) => ({ ...item, key: item.name }));
  console.log(dataPhone);
  return <Table
    dataSource={dataPhone}
    
    columns={columns} 
    pagination={{
        pageSize:rows,
        // defaultPageSize: "20",// колличество по умолчанию
        showSizeChanger: false, //включить выбор колличества
        // pageSizeOptions: [20, 50, 100] //варианты выбора
    }}
    />;
};

export default _Table;
