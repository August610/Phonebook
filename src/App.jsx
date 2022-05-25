import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import jsonData from "./data.json";
import { Menu } from "./components/Menu/Menu";
import { Search } from "./components/Search";
import { Contacts } from "./components/Contacts";
import { AppContext } from "./components/context/appContext";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataPhone, setDataPhone] = useState(jsonData);
  const [cards, setCards] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const contentPerPage = 20;
  const firstIndex = lastIndex - contentPerPage;
  const [lastIndex, setLastIndex] = useState(page * contentPerPage);
  const [sort, setSort] = useState(false);

  // console.log(dataPhone);
  function records(from, to) {
    if (!sort) {
      return dataPhone
        .slice(from, to)
      .sort((a, b) =>
        (a.name.last || a.name.first).localeCompare(
          b.name.last || b.name.first
        )
      );
    } else {
      return dataPhone
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
      setCards(dataPhone);
      setCards(records(firstIndex, lastIndex));
      setLastIndex((prevState) => prevState + 5);
      setTotalCount(cards.length);
      setFetching(false);
    }
  }, [searchQuery, fetching, totalCount, sort, cards, dataPhone]);

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
      100
      &&
      totalCount < dataPhone.length
    ) {
      setTotalCount((prevState) => prevState + 5);
      setFetching(true);
    }
  };

  const sortPhone = (item) => {
    if (!sort) {
      item.sort((a, b) =>
        (a.name.last || a.name.first).localeCompare(
          b.name.last || b.name.first
        )
      );
    } else {
      item.sort((a, b) =>
        (b.name.last || b.name.first).localeCompare(
          a.name.last || a.name.first
        )
      );
    }
  }


  const includesQuery = (item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase());

  const handleRequest = () => {
    if (searchQuery !== "") {
      const filterCards = dataPhone.filter(
        (item) =>
          includesQuery(item.name.last) ||
          (item.name.first && includesQuery(item.name.first)) ||
          (item.number && includesQuery(item.number)) ||
          (item.address && includesQuery(item.address)) ||
          (item.email && includesQuery(item.email))
      );
      setCards(filterCards);
    }

    if (searchQuery === "") {
      setCards(records(firstIndex, contentPerPage));
      setTotalCount(0);
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
    let [first, last] = data.name.split(" ");
    if (last == undefined) {
      last = "";
    }
    // console.log("last", last);
    dataPhone.unshift({ ...data, id: cards.length, image, name: { first, last } });
    console.log("image", image);
    setDataPhone([...dataPhone]);
    setCards([...dataPhone]);
  }

  function handleUpdateNewPhone(data, id, imageEdit) {
    let [first, last] = data.name.split(" ");
    if (last == undefined) {
      last = "";
    }
    data.name = {};
    data.name.first = first;
    data.name.last = last;
    dataPhone.image = imageEdit;

    console.log(data);
    const newCardsState = dataPhone.map((c) => {
      return c.id === id ? data : c;
    });
    // cards.splice(cards.indexOf(cards.find(e => e.id === id)), 1, data)
    setDataPhone(newCardsState);
    setCards(newCardsState)
  }

  function handleDeletePhone(id) {
    const newCards = dataPhone.filter((card) => card.id !== id);
    setCards(newCards);
  }

  function sortData(sort) {
    if (!sort) {
      setCards(
        [...dataPhone].sort((a, b) =>
          (a.name.last || a.name.first).localeCompare(
            b.name.last || b.name.first
          )
        )
      );
    } else {
      setCards(
        [...dataPhone].sort((a, b) =>
          (b.name.last || b.name.first).localeCompare(
            a.name.last || a.name.first
          )
        )
      );
    }
  }

  function changeMode(data) {
    setEditMode(data);
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
      <AppContext.Provider
        value={{
          sort,
          cards,
          editMode,
          changeMode,
          changeSort,
          handleUpdateNewPhone,
          handleCreateNewPhone,
          handleDeletePhone,
        }}
      >
        <Header>
          <Search
            searchText={searchQuery}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            clearSearch={clearSearch}
          />
        </Header>
        <Menu />
        <main className="content container">
          <div className="content__cards">
            <Contacts
              cards={cards}
            />
          </div>
        </main>
        <Footer></Footer>
      </AppContext.Provider>
    </>
  );
};
