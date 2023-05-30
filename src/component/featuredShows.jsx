import React from "react";
import { setCurrentShow, setCrewData } from "../redux/reducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";

export default function FeaturedShows() {
  const { showList } = useSelector((state) => state.show);
  const featuredShows = [0, 1, 2, 3, 4, 5, 6].map((e) => showList[e]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slideProperties = {
    duration: 1000,
    transitionDuration: 100,
    infinite: true,
    indicators: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    // scale: 0.4,
    arrows: false,
  };
  return (
    <>
      <div>
        <div className="slide-container">
          <Slide {...slideProperties}>
            {featuredShows.map((e, index, array) => (
              <div id="slide-container" key={index}>
                <div>
                  <img
                    style={{
                      width: "19vw",
                      height: "19vw",
                      objectFit: "fill ",
                    }}
                    alt="img"
                    src={e ? array[index].image.original : ""}
                    onClick={() => {
                      fetch(`https://api.tvmaze.com/shows/${e.id}/cast`)
                        .then((resp) => {
                          return resp.json();
                        })
                        .then((crewData) => {
                          dispatch(setCrewData(crewData));
                        })
                        .catch((err) => console.log(err));
                      dispatch(setCurrentShow(e));
                      navigate("/showDetails");
                    }}
                  />
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </>
  );
}
