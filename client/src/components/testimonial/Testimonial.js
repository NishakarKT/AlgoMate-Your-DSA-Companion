import React, { useContext } from "react";
import "./Testimonial.css";
// contexts
import UserContext from "../../contexts/userContext";

const Testimonial = ({ testimonial, delay }) => {
    const { dark } = useContext(UserContext);

    return (
        <div className={`testimonial ${dark ? "testimonial__dark" : ""}`} style={{ animationDelay: delay + 's' }}>
            <blockquote>{testimonial.text}</blockquote>
            <div className="author">
                <img src={testimonial.photo} alt="sq-sample1" />
                <h5>{testimonial.name} <span> {testimonial.position}</span></h5>
            </div>
        </div>
    );
};

export default Testimonial;