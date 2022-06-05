import React from "react";

const customStyles = {
    backgroundColor : "#1f1f1f",
    fontFamily: "Courier new",
    color: "white",
    fontWeight: "bold",
    border: 'none',
    padding : '7px',
    borderRadius: "7px",
    outline: 'none',
};

const CustomInput = ({ customInput, setCustomInput }) => {
    return (
        <>
            <textarea
                style={ customStyles }
                rows = "4"
                cols = "43"
                value = { customInput }
                onChange = {(e) => setCustomInput(e.target.value)}
                placeholder = {`Custom input`}
            >
            </textarea>
        </>
    );
};

export default CustomInput;

