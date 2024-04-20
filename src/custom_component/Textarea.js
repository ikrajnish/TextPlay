import React, { useState } from "react";
import PropTypes from "prop-types";
import "./textarea.css";

export default function Textarea(props) {
    const [text, setText] = useState("");

    const toupcase = () => {
        setText(text.toUpperCase());
        props.shAlert("Converted to Upper Case", "success");
    };

    const tolocase = () => {
        setText(text.toLowerCase());
        props.shAlert("Converted to Lower Case", "success");
    };

    const handler = (event) => {
        setText(event.target.value);
    };

    const capitalEachWord = () => {
        let newText = text
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        setText(newText);
        props.shAlert("First Letter of each word is capital now!", "success");
    };

    const copyText = () => {
        if (text) {
            navigator.clipboard.writeText(text);
            props.shAlert("Text copied to clipboard :)", "success");
        }
    };

    const clearText = () => {
        setText("");
        props.shAlert("Text Cleared!!!", "success");
    };

    return (
        <div className={`textarea-container text-${props.mode === "light" ? "dark" : "light"}`}>
            <h1 className="textarea-title">
                <u>{props.title}</u> :-
            </h1>
            <textarea
                className="form-control my-3"
                id="myBox"
                rows="10"
                value={text}
                onChange={handler}
                style={{ width: "100%", backgroundColor: props.mode === "light" ? "#F5EDCE" : "#F7F5EB" }}
            ></textarea>
            <div className="button-container">
                <button className="btn btn-info mx-2 my-1" onClick={toupcase}>
                    Convert to UPPERCASE
                </button>
                <button className="btn btn-info mx-2 my-1" onClick={tolocase}>
                    Convert to Lowercase
                </button>
                <button className="btn btn-info mx-2 my-1" onClick={capitalEachWord}>
                    Capitalize Each Word
                </button>
                <button className="btn btn-info mx-2 my-1" onClick={copyText}>
                    Copy Text Area
                </button>
                <button className="btn btn-info mx-2 my-1" onClick={clearText}>
                    Clear Text
                </button>
            </div>
            <div className="text-summary">
                <h2>Your Text Summary.</h2>
                <p>
                    {text.split(/\s+/).filter((element) => element.length !== 0).length} words & {text.length} characters.
                </p>
                <p>{0.008 * text.split(" ").filter(Boolean).length} minutes read.</p>
                <h3 className="my-1">
                    <u>Preview</u>
                </h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

Textarea.propTypes = {
    title: PropTypes.string,
    mode: PropTypes.string,
    shAlert: PropTypes.func,
};

Textarea.defaultProps = {
    title: "Enter text here",
};
