import React, { useEffect, useRef } from "react";
import "./MediaSlider.css";
// mui
import { Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const MediaSlider = ({ mediaFiles, isBgFixed, isCarousel, style }) => {
    const cardsInterval = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        clearInterval(cardsInterval.current);
        if (isCarousel)
            cardsInterval.current = setInterval(nextFile, 7000);
    }, [isCarousel]);

    const prevFile = () => {
        const current = containerRef.current?.querySelector(".mediaSlider__current");
        if (current) {
            current.classList.remove("mediaSlider__current");
            if (current.previousElementSibling.classList.contains("mediaSlider__card"))
                current.previousElementSibling.classList.add("mediaSlider__current");
            else
                containerRef.current.lastElementChild.classList.add("mediaSlider__current");
        };
    };

    const nextFile = () => {
        const current = containerRef.current?.querySelector(".mediaSlider__current");
        if (current) {
            current.classList.remove("mediaSlider__current");
            if (current.nextElementSibling)
                current.nextElementSibling.classList.add("mediaSlider__current");
            else
                containerRef.current.querySelector(".mediaSlider__card").classList.add("mediaSlider__current");
        };
    };

    return mediaFiles.length ?
        <div className="mediaSlider" ref={containerRef} style={style}>
            {!isCarousel && mediaFiles.length > 1 ? <Button onClick={() => prevFile()}><ArrowBackIosRoundedIcon /></Button> : null}
            {!isCarousel && mediaFiles.length > 1 ? <Button onClick={() => nextFile()}><ArrowForwardIosRoundedIcon /></Button> : null}
            {mediaFiles.map((mediaFile, index) => {
                return (<div key={index} className={`mediaSlider__card ${index === 0 ? "mediaSlider__current" : ""}`} style={{ background: `url("${mediaFile}") ${isBgFixed ? "fixed" : ""} no-repeat center center/cover` }}></div>)
            })}
        </div> : null;
};

export default MediaSlider;
