import React from "react";
import "./NewsMarquee.css";
// constants
import { MAIN_LOGO_PNG } from "../../constants/images";
// mui
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const NewsMarquee = ({ dataList, style }) => {
    return (
        dataList.length ?
            <marquee className="newsMarquee" style={style} >
                <div className="newsMarquee__text">
                    {dataList.map((data, index) => (
                        <React.Fragment key={index}>
                            <img className="newsMarquee__separator" src={MAIN_LOGO_PNG} alt="" />
                            {data.date ? <p className="newsMarquee__dataItem" style={{ color: "lime" }}>{data.date}</p> : null}
                            {data.title ?
                                <React.Fragment>
                                    <TimelineRoundedIcon className="newsMarquee__separator" style={{ color: "yellow" }} />
                                    <p className="newsMarquee__dataItem" style={{ color: "yellow" }}>{data.title}</p>
                                </React.Fragment>
                                : null}
                            {data.category ?
                                <React.Fragment>
                                    <LanguageRoundedIcon className="newsMarquee__separator" style={{ color: "cyan" }} />
                                    <p className="newsMarquee__dataItem" style={{ color: "cyan" }}>{data.category}</p>
                                </React.Fragment>
                                : null}
                            {data.description ?
                                <React.Fragment>
                                    <DescriptionRoundedIcon className="newsMarquee__separator" style={{ color: "white" }} />
                                    <p className="newsMarquee__dataItem" style={{ color: "white" }}>{data.description}</p>
                                </React.Fragment>
                                : null}
                            <img className="newsMarquee__separator" style={{ marginRight: "100px" }} src={MAIN_LOGO_PNG} alt="" />
                        </React.Fragment>
                    ))}
                </div>
            </marquee> : <></>
    );
};

export default NewsMarquee;
