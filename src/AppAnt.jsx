import React, { useState, useEffect } from "react";
import { Col, Layout, Row, Slider } from 'antd';
import Table from './components/Table';
import { Header } from "./components/Header";
// import jsonData from "./data.json";
import { data } from "./data.js";
import { Footer } from "./components/Footer";
import { SearchInfo } from "./components/SearchInfo";
import jsonData from "./data.json";
import { Form } from "./components/Form/Form";
import { Search } from "./components/Search";
import { Cards } from "./components/Cards";
// import EditableTable from "./components/Table";
// const { Content } = Layout;


export const AppAnt = () => {
  // const [rows, setRows] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(jsonData);
  }, [searchQuery])

  const handleRequest = () => {
    if (searchQuery !== '') {
      const filterCards = cards.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()))
      setCards(filterCards)
    }
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  function handleCreateNewPhone(data) {
    cards.push({ ...data, id: cards.length });
    setCards([...cards]);
    // setCards([...cards, dataPhone])
  }

  const onSortData = (currentSort) => {
    switch (currentSort) {
      case "name":
        setCards([...cards].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      default:
        setCards([...cards].sort());
    }
  };

  return (
    <>
      <Header>
        <Search handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
      </Header>
      <Form handleCreateNewPhone={handleCreateNewPhone} cards={cards} onSortData={onSortData}/>
      <main className="content container">
        {/* <Row>
          <Col span={16} offset={4}>
            <EditableTable cards={cards}/>
          </Col>
        </Row> */}
        <div className="content__cards">
          <Cards goods={cards} />
        </div>
      </main>
      <Footer>Footer</Footer>
    </>
  );
};
