import React from "react";
import Select from "react-select";
import { languages } from "../data/languages";

const customStyles = {
    control: (styles, state) => {
        return ({
            ...styles,
            padding: '0 10px',
            width: "100%",
            maxWidth: "14rem",
            minWidth: "12rem",
            borderRadius: "25px",
            color: "hsl(0, 0%, 80%)",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            backgroundColor: "#1f1f1f",
            cursor: "pointer",
            border: state.isFocused ? 0 : 0,
            boxShadow: state.isFocused ? 0 : 0,
            ":hover": {
                border: 0,
            },
        })
    },
    option: (styles) => {
        return {
            ...styles,
            color: "hsl(0, 0%, 80%)",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            width: "100%",
            background: "#1b1b1b",
            ":hover": {
                backgroundColor: "#2b2b2b",
                color: "#fff",
                cursor: "pointer",
            },
        };
    },
    menu: (styles) => {
        return {
            ...styles,
            backgroundColor: "#1b1b1b",
            maxWidth: "14rem",
            borderRadius: "100px",
        };
    },
    menuList: (base) => ({
        ...base,
    
        "::-webkit-scrollbar": {
          width: "6px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "#1b1b1b"
        },
        "::-webkit-scrollbar-thumb": {
        background: ['rgb(13,0,241)', '-moz-linear-gradient(180deg, rgba(13,0,241,1) 0%, rgba(229,43,232,1) 100%)', '-webkit-linear-gradient(180deg, rgba(13,0,241,1) 0%, rgba(229,43,232,1) 100%)', 'linear-gradient(180deg, rgba(13,0,241,1) 0%, rgba(229,43,232,1) 100%)'],
        filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#0d00f1",endColorstr="#e52be8",GradientType=1)',

          borderRadius: "10px",
        },
        // "::-webkit-scrollbar-thumb:hover": {
        //   background: "#555"
        // }
      }),

    singleValue: (styles) =>{
        return {
            ...styles,
            color: "hsl(0, 0%, 80%)",
        }
    },

    input: (styles) =>{
        return {
            ...styles,
            color: "hsl(0, 0%, 80%)",
        }
    },
    
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "hsl(0, 0%, 80%)",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
        };
    },
};


const LanguagesDropdown = ({onSelectChange}) => {
    return(
        <Select
            placeholder={`Select languages`}
            options={languages}
            defaultValue={languages[0]}
            styles={customStyles}
            components={{
                IndicatorSeparator: () => null,
            }}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;