import { Image, Table, Typography } from "antd";
import React from "react";
import { pokemonData } from "../../pokemon.js";
import jsonData from "../../data.json";
// import jsonData from "./data.json";

const columns = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    sorter: (a, b) => a.name - b.name,
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
    // filters: [
    //   {
    //     text: "Seed Pokémon",
    //     value: "Seed Pokémon",
    //   },
    //   {
    //     text: "Flame Pokémon",
    //     value: "Flame Pokémon",
    //   },
    //   {
    //     text: "Turtle Pokémon",
    //     value: "Turtle Pokémon",
    //   },
    // ],
    // onFilter: (value, record) => record.classification.includes(value),
  },
  {
    title: "Электронная почта",
    dataIndex: "email",
    key: "email",
    
  },
  // {
  //   title: "Maximum CP",
  //   dataIndex: "maxCP",
  //   key: "maxCP",
  // },
  // {
  //   title: "Image",
  //   dataIndex: "image",
  //   key: "image",
  //   render: (link) => <Image src={link} width={150} />,
  // },
];

const dataPokemons = jsonData.map((item) => ({ ...item, key: item.id }));

const _Table = ({rows = 20}) => {
  return <Table
    dataSource={dataPokemons}
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
