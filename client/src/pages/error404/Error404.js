import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error404.css";
// constants
import { ERROR_404_GIF } from "../../constants/images";
import { HOME_ROUTE } from "../../constants/routes";
// mui
import { Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="error404">
            <div className="error404__container">
                <img src={ERROR_404_GIF} alt="" />
                <p>You seem lost...<br />You may find your way back with one of the following buttons! Trust me!</p>
                <div className="error404__btns">
                    <Button onClick={() => navigate(-1)}><ArrowBackRoundedIcon />Back</Button>
                    <Button onClick={() => navigate(HOME_ROUTE)}><HomeRoundedIcon />Home</Button>
                </div>
            </div>
        </div>
    );
};

export default Error404;