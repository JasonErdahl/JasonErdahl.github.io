import React from "react";
import "./Navbar.css";

const Navbar = props => (
    <div>
        <ul className="nav nav-bar nav-justified">
            <li><a href="/">Clicky Game</a></li>
            <li
                className={props.message.includes('incorrectly') ? 
                    "desc-incorrect" : 
                    props.message.includes('correctly') ?
                        "desc-correct" :
                    props.message.includes('Win') ?
                        "winIndicator active" :
                        "desc-normal"}
            >
                {props.message}
            </li>
            <li>Score: <span style={{color: "yellow"}}>{props.curScore}</span> | Top Score: {props.topScore}</li>
        </ul>
    </div>
);
  
export default Navbar;