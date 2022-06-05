import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";

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
            backgroundColor: "#1b1b1b",
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

const ThemesDropdown = ({ handleThemeChange, theme }) => {
    return (
        <Select
            placeholder={`Select theme`}
            options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                label: themeName,
                value: themeId,
                key: themeId,
            }))}
            components={{
                IndicatorSeparator: () => null,
            }}
            value={theme}
            styles={customStyles}
            onChange={handleThemeChange}
        />
    );
};


export default ThemesDropdown;