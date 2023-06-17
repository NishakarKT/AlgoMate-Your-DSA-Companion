import React, { useContext } from "react";
import "./GridCard.css";
// contexts
import UserContext from "../../contexts/userContext";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// utils
import { truncateString } from "../../utils";
// mui
import { Rating, Button } from "@mui/material";

const GridCard = ({ data, delay }) => {
    const { setPost, dark } = useContext(UserContext);

    return (
        <div className={`gridCard ${dark ? "gridCard__dark" : ""}`} style={{ animationDelay: delay + "s" }}>
            <MediaSlider mediaFiles={data.fileURLs} isCarousel style={{ height: "250px" }} />
            <div className="gridCard__shapeDivider">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="gridCard__content" style={{ paddingBottom: data.certificate ? "50px" : "10px" }}>
                {data.date ? <p className="gridCard__date">{data.date}</p> : null}
                {data.title ? <p className="gridCard__title">{data.title}</p> : null}
                {data.category ? <p className="gridCard__category">{data.category}</p> : null}
                {data.rating ? <Rating name="size-large" precision={0.5} value={Number(data.rating)} max={5} size="medium" readOnly /> : null}
                {data.description ? <p className="gridCard__description">{truncateString(data.description, 150)} <span className="gridCard__link" onClick={() => setPost(data)}>Read more</span></p> : null}
                {data.host ? <p className="gridCard__host">~ {data.host}</p> : null}
            </div>
            {data.link ? <Button onClick={() => window.open(data.link)}>Explore</Button> : null}
        </div>
    );
};

export default GridCard;
