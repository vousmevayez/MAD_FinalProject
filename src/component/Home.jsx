import React, { useState } from "react";
import ShowList from "./showList";
import { useSelector } from "react-redux";
import FeaturedShows from "./featuredShows";
import Pages from "./Pages";
import "../App.css";

function Home() {
  const {
    showList,
    Action,
    Crime,
    Drama,
    Fantasy,
    Legal,
    Medical,
    Romance,
    SciFi,
    Thriller
  } = useSelector((state) => state.show);

  // const { showList, Drama, Fantasy, Legal, Medical, Romance } = useSelector(
  //   (state) => state.show
  // );

  const [backgroundColor, setBackgroundColor] = useState("#f2f2f2");

  // Function to change the background color
  const changeBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  return (
    <>
      <button
        className="buttonstyle"
        onClick={() => changeBackgroundColor("#F2F2EF")}
      >
        White
      </button>
      <button
        className="buttonstyle"
        onClick={() => changeBackgroundColor("#cedf90")}
      >
        Green
      </button>
      <button
        className="buttonstyle"
        onClick={() => changeBackgroundColor("#DED3A6")}
      >
        Yellow
      </button>
      <button
        className="buttonstyle"
        onClick={() => changeBackgroundColor("#81BECE")}
      >
        Blue
      </button>
      <div style={{ backgroundColor }}>
        <FeaturedShows></FeaturedShows>
        <ShowList
          className="allShows"
          title="ALL"
          showList={showList}
        ></ShowList>
        <ShowList title="Action" showList={Action}></ShowList>
        <ShowList title="Crime" showList={Crime}></ShowList>
        <ShowList title="Drama" showList={Drama}></ShowList>
        <ShowList title="Fantasy" showList={Fantasy}></ShowList>
        <ShowList title="Legal" showList={Legal}></ShowList>
        <ShowList title="Medical" showList={Medical}></ShowList>
        <ShowList title="Romance" showList={Romance}></ShowList>
        <ShowList title="Science-Fiction" showList={SciFi}></ShowList>
        <ShowList title="Thriller" showList={Thriller}></ShowList>
        <Pages></Pages>
      </div>
    </>
  );
}
export default Home;
