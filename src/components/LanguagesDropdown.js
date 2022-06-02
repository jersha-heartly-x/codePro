import React from "react";
import Select from "react-select";
import { languages } from "../data/languages";

const LanguagesDropdown = ({onSelectChange}) => {
    return(
        <Select
            placeholder={`Select languages`}
            options={languages}
            // styles={}
            // defaultInputValue={languages[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;