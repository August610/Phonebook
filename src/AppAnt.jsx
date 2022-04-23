import React, { useState, useEffect } from "react";
import { Col, Layout, Row, Slider } from 'antd';
import Table from './components/Table/index';
import { Header } from "./components/Header";
// import jsonData from "./data.json";
import { pokemonData } from "./pokemon.js";
import { Footer } from "./components/Footer";
import { SearchInfo } from "./components/SearchInfo";
import jsonData from "./data.json";
import { Form } from "./components/Form/Form";
import { Search } from "./components/Search";
// const { Content } = Layout;


export const AppAnt = () => {
  const [rows, setRows] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState(jsonData);
  
  useEffect(() => {
    console.log('useEffect#1')
    handleRequest();
  }, [searchQuery]);
  
  const handleRequest = () => {
    if(searchQuery !== '') {
      const filterCards = jsonData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setCards(prevState => filterCards)
    }
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }
  return (
    <>
      <Header>
      <Search handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
      </Header>
      <Form />
      <main className="content container">
        <Row>
          <Col span={16} offset={4}>
            <Slider min={10} max={100} onChange={setRows} defaultValue={rows} />
            <Table rows={rows} />
          </Col>
        </Row>
      </main>
      <Footer>Footer</Footer>
    </>
  );
};
