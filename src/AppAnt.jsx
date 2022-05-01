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

  const contentPerPage = 20;
  const firstIndex = lastIndex - contentPerPage;
  const [lastIndex, setLastIndex] = useState(page * contentPerPage);
  const [sort, setSort] = useState(false);

  function records(from, to) {
    if (!sort) {
      return jsonData
        .slice(from, to)
        .sort((a, b) =>
          (a.name.last || a.name.first).localeCompare(
            b.name.last || b.name.first
          )
        );
    } else {
      return jsonData
        .slice(from, to)
        .sort((a, b) =>
          (b.name.last || b.name.first).localeCompare(
            a.name.last || a.name.first
          )
        );
    }
  }

  useEffect(() => {
    handleRequest();
  }, [searchQuery]);

  useEffect(() => {
    if (fetching) {
      setCards(records(firstIndex, lastIndex));
      setLastIndex((prevState) => prevState + 5);
      setTotalCount(cards.length);
      setFetching(false);
    }
  }, [searchQuery, fetching, totalCount, sort, cards]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [totalCount]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      totalCount < jsonData.length
    ) {
      setTotalCount((prevState) => prevState + 5);
      setFetching(true);
    }
  };

  const includesQuery = (item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase());

  const handleRequest = () => {
    if (searchQuery !== "") {
      const filterCards = jsonData.filter(
        (item) =>
          includesQuery(item.name.last) ||
          // Object.values(item).filter(item => typeof item == 'string').map(e => e.toLowerCase().includes(searchQuery.toLowerCase())))
          (item.name.first && includesQuery(item.name.first)) ||
          (item.number && includesQuery(item.number)) ||
          (item.address && includesQuery(item.address)) ||
          (item.email && includesQuery(item.email))
      );
      setCards(filterCards);
    }

    if (searchQuery === "") {
      setCards(records(firstIndex, contentPerPage));
    }
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleFormSubmit = () => {
    handleRequest();
  };

  function handleCreateNewPhone(data, image) {
    data.name.split(" ").map((e) => console.log(e));
    const [first, last] = data.name.split(" ");
    cards.unshift({ ...data, id: cards.length, image, name: { first, last } });
    setCards([...cards]);
  }

  function handleUpdateNewPhone(data, id) {
    const [first, last] = data.name.split(" ");
    data.name = {};
    data.name.first = first;
    data.name.last = last;
    console.log(data);
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

  function sortData(sort) {
    if (sort) {
      setCards(
        [...cards].sort((a, b) =>
          (a.name.last || a.name.first).localeCompare(
            b.name.last || b.name.first
          )
        )
      );
    } else {
      setCards(
        [...cards].sort((a, b) =>
          (b.name.last || b.name.first).localeCompare(
            a.name.last || a.name.first
          )
        )
      );
    }
  }

  function changeToggle(data) {
    setToggle(data);
  }

  function changeSort(data) {
    sortData(data);
    setSort(data);
  }

  function clearSearch() {
    setSearchQuery("");
    setTotalCount(0);
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
      <Form
        handleCreateNewPhone={handleCreateNewPhone}
        cards={cards}
        sort={sort}
        changeSort={changeSort}
        toggle={toggle}
        changeToggle={changeToggle}
      />
      <main className="content container">
        <div className="content__cards">
          <Cards
            cards={cards}
            handleUpdateNewPhone={handleUpdateNewPhone}
            toggle={toggle}
            handleDeletePhone={handleDeletePhone}
            sort={sort}
          />
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
