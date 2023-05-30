import React, { useState } from "react";
import "./App.css";
import Home from "./component/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowDetails from "./component/ShowDetails";
import NavigationBar from "./component/Navbar";
import ShowList from "./component/showList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading, setSortList } from "./redux/reducer";
import Loading from "./component/Loading";
import Register from "./component/register";

function App() {
  const dispatch = useDispatch();
  const [signedInUsername, setSignedInUsername] = useState("");
  const {
    loading,
    Action,
    Crime,
    Drama,
    Fantasy,
    Legal,
    Medical,
    Romance,
    SciFi,
    Thriller,
    searchedShow,
    showList,
    page
  } = useSelector((state) => state.show);
  useEffect(() => {
    dispatch(setLoading(true));
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setSortList(data));
        dispatch(setLoading(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  if (loading) return <Loading loading={loading}></Loading>;

  return (
    <BrowserRouter>
      <NavigationBar signedInUsername={signedInUsername}></NavigationBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register setSignedInUsername={setSignedInUsername} />}
        />
        <Route path="/" element={<Home username={signedInUsername} />} />
        <Route path="/showDetails" element={<ShowDetails />} />
        <Route
          path="/All"
          element={
            <ShowList
              display="element1"
              title="All"
              showList={showList}
            ></ShowList>
          }
        />
        <Route
          path="/Action"
          element={
            <ShowList
              display="element1"
              title="Action"
              showList={Action}
            ></ShowList>
          }
        />
        <Route
          path="/Crime"
          element={
            <ShowList
              display="element1"
              title="Crime"
              showList={Crime}
            ></ShowList>
          }
        />
        <Route
          path="/Drama"
          element={
            <ShowList
              display="element1"
              title="Drama"
              showList={Drama}
            ></ShowList>
          }
        />
        <Route
          path="/Fantasy"
          element={
            <ShowList
              display="element1"
              title="Fantasy"
              showList={Fantasy}
            ></ShowList>
          }
        />
        <Route
          path="/Legal"
          element={
            <ShowList
              display="element1"
              title="Legal"
              showList={Legal}
            ></ShowList>
          }
        />
        <Route
          path="/Medical"
          element={
            <ShowList
              display="element1"
              title="Medical"
              showList={Medical}
            ></ShowList>
          }
        />
        <Route
          path="/Romance"
          element={
            <ShowList
              display="element1"
              title="Romance"
              showList={Romance}
            ></ShowList>
          }
        />
        <Route
          path="/Science-Fiction"
          element={
            <ShowList
              display="element1"
              title="Science-Fiction"
              showList={SciFi}
            ></ShowList>
          }
        />
        <Route
          path="/Thriller"
          element={
            <ShowList
              display="element1"
              title="Thriller"
              showList={Thriller}
            ></ShowList>
          }
        />
        <Route
          path="/Search"
          element={
            <ShowList
              display="element1"
              title="Result"
              showList={searchedShow}
            ></ShowList>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
