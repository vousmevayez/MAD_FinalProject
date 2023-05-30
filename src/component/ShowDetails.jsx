import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Home from "./Home";
import YoutubePortal from "./YoutubePortal";
import "../App.css";
// import Tooltip from "tooltip";

export default function ShowDetails() {
  const parse = require("html-react-parser");
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { currentShow, api, crewData } = useSelector((state) => state.show);
  const {
    name,
    status,
    image,
    language,
    network,
    genres,
    rating
  } = currentShow;
  const [showData, setShowData] = useState("");
  console.log("showDetails");
  useEffect(() => {
    if (api) {
      fetch(api)
        .then((resp) => resp.json())
        .then((data) => setShowData(data));
    }
  }, [api]);
  useEffect(() => {
    if (videoId) {
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${currentShow.name}OfficialTrailer&key=AIzaSyAep8dUL0_fqu1WCrSO8R-rYif0w1Jb-A8`
        // `https://www.youtube.com/results?search_query=${currentShow.name}OfficialTrailer`
        // `https://youtube.com/embed/${videoId}?autoplay=0`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setVideoId(data?.items[0]?.id?.videoId);
        });
    }
  }, [videoId]);
  if (currentShow) {
    return (
      <Container>
        <div className="row">
          <h2>{name}</h2>
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <img className="card-img-top" src={image.original} alt=""></img>
                <button
                  className="btn btn-secondary mt-3"
                  href="#"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Watch Trailer on YouTube
                </button>
                <YoutubePortal
                  isOpen={isOpen}
                  setOpen={setOpen}
                  videoId={videoId}
                ></YoutubePortal>
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="card-body">
              <h5>Summary</h5>
              <div className="card-text">
                {currentShow.summary ? parse(currentShow.summary) : ""}
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-primary">
                  <h6>Information</h6>
                </li>
                <li className="list-group-item">
                  Genre: {genres[0]} {genres[1]} {genres[2]}
                </li>
                <li className="list-group-item">Status: {status}</li>
                <li className="list-group-item">Language: {language}</li>
                <li className="list-group-item">
                  Country: {network ? network.country.name : ""}
                </li>
                <li className="list-group-item">
                  Rating: {rating.average} / 10
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-3">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ">
                  <h5>Previous Episode: {showData.name}</h5>
                </li>
                <li className="list-group-item">
                  Original release: {showData.airdate}
                </li>
                <li className="list-group-item">Seasons: {showData.season}</li>
                <li className="list-group-item">Episodes: {showData.number}</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-5">
            <h6>Episode Summary</h6>
            <>{showData.summary ? parse(showData.summary) : ""}</>
          </div>
          <div className="col-sm-3">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ">
                  <img
                    alt="img"
                    id={!showData.image ? "img-not-found" : ""}
                    src={
                      showData.image ? showData.image.medium : "notfound.png"
                    }
                  ></img>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <h4>Cast</h4>
          {crewData.map((crew, index) => {
            return (
              // <a title="Search this person on google">
              <div
                // class="hovertext"
                // data-hover="Search this person on google"
                key={index}
                className="col-sm-2 p-0 col-2"
                onClick={() => {
                  //search cast on google
                  const url = `https://www.bing.com/search?q=${crew.person.name}`;
                  window.open(url);
                  // const query = encodeURIComponent(crew.person.name);
                  // const url = `https://www.bing.com/search?q=${query}`;
                  // window.open(url, "_blank");
                }}
              >
                <div className="card">
                  <div className="card-body">
                    <>
                      <span title="Click to google this person">
                        <img
                          className="card-img-top"
                          src={
                            crew.character.image
                              ? crew.character.image.medium
                              : "notfound.png"
                          }
                          alt=""
                        ></img>
                      </span>
                      <div className="divstyle">{crew.person.name}</div>
                    </>
                  </div>
                </div>
              </div>
              // </a>
            );
          })}
        </div>
      </Container>
    );
  }
  return <Home></Home>;
}
