import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import jsonData from "./data.json";
import { Form } from "./components/Form/Form";
import { Search } from "./components/Search";
import { Cards } from "./components/Cards";
import { Pagination, Slider } from "antd";


export const AppAnt = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [toggle, setToggle] = useState(false)

  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(20);
  const [fetching, setFetching] = useState(true);

  // console.log(jsonData);

  function records(from, to) {
    return jsonData.slice(from, to);
  }

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  useEffect(() => {
    if (fetching)
      setCards(records(page, currentPage));
      setCurrentPage(prevState => prevState + 1)
      setFetching(false)
  }, [searchQuery, fetching])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    };
  }, [])

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

  function handleCreateNewPhone(data, image) {
    cards.push({ ...data, id: cards.length, image: image });
    setCards([...cards]);
  }

  function handleUpdateNewPhone(data, id) {
    const newCardsState = cards.map((c) => {
      return c.id === id ? data : c;
    });
    // cards.splice(cards.indexOf(cards.find(e => e.id === id)), 1, data)
    setCards(newCardsState);
  }

  function handleDeletePhone(id) {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
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

  function changeToggle(data) {
    setToggle(data);
  }

  return (
    <>
      <Header>
        <Search handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
      </Header>
      <Form handleCreateNewPhone={handleCreateNewPhone} cards={cards} onSortData={onSortData} toggle={toggle} changeToggle={changeToggle} />
      <main className="content container">
        <div className="content__cards">
          <Cards goods={cards} handleUpdateNewPhone={handleUpdateNewPhone} toggle={toggle} handleDeletePhone={handleDeletePhone} />
          {/* <Slider min={10} max={100} onChange={page} defaultValue={pageLimit}/> */}
          {/* <Pagination current={page} onChange={setPageLimit} total={jsonData.length} /> */}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
