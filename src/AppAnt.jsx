import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import jsonData from "./data.json";
import { Form } from "./components/Form/Form";
import { Search } from "./components/Search";
import { Cards } from "./components/Cards";


export const AppAnt = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const contentPerPage = 20
  const firstIndex = lastIndex - contentPerPage
  const [lastIndex, setLastIndex] = useState(page * contentPerPage);

  function records(from, to) {
    return jsonData.slice(from, to);
  }

  useEffect(() => {
    handleRequest();
  }, [searchQuery]);

  useEffect(() => {
    if (fetching) {
      console.log("fetching");
      setCards(records(firstIndex, lastIndex));
      setLastIndex(prevState => prevState + 5)
      setTotalCount(cards.length);
      setFetching(false)
    }
  }, [searchQuery, fetching, totalCount])

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    };
  }, [totalCount])

  const scrollHandler = (e) => {
    if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && totalCount < jsonData.length) {
      setTotalCount(prevState => prevState + 5);
      setFetching(true)
    }
  }

  const handleRequest = () => {
    if (searchQuery !== '') {
      const filterCards = jsonData.filter(item =>
        item.name.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Object.values(item).filter(item => typeof item == 'string').map(e => e.toLowerCase().includes(searchQuery.toLowerCase()))) 
        item.name.first && item.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number && item.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase()))
      setCards(filterCards)
    }

    if (searchQuery === '') {
      setCards(records(firstIndex, contentPerPage));
    }
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  const handleFormSubmit = () => {
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
        setCards([...cards].sort((a, b) => (a.name.first || a.name.last).localeCompare((b.name.first || b.name.last))));
        break;
    }
  };

  function changeToggle(data) {
    setToggle(data);
  }

  function clearSearch() {
    setSearchQuery("");
  }

  return (
    <>
      <Header>
        <Search
          searchText={searchQuery}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          clearSearch={clearSearch}
        />
      </Header>
      <Form handleCreateNewPhone={handleCreateNewPhone} cards={cards} onSortData={onSortData} toggle={toggle} changeToggle={changeToggle} />
      <main className="content container">
        <div className="content__cards">
          <Cards cards={cards} handleUpdateNewPhone={handleUpdateNewPhone} toggle={toggle} handleDeletePhone={handleDeletePhone} />
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
