import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify"
import axios from 'axios';

import CodeEditorWindow from './CodeEditorWindow';
import { languages } from "../data/languages";
import useKeyPress from "../hooks/useKeyPress";
import LanguagesDropdown from './LanguagesDropdown';
import ThemesDropdown from './ThemesDropdown';
import { defineTheme } from '../lib/defineTheme';
import OutputWindow from './OutputWindow';
import CustomInput from './CustomInput';
import OutputDetails from './OutputDetails';
import './Editor.css';

const defaultComment = `// code here`;

const Editor = () => {
    const [code, setCode] = useState(defaultComment);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languages[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (selectedLang) => {
        console.log("Selected Language: ", selectedLang);
        setLanguage(selectedLang);
    };

    useEffect(() => {
        if(enterPress && ctrlPress) {
            console.log("Enter press ", enterPress);
            console.log("Control press ", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const handleThemeChange = ( theme ) => {
        console.log("Selected Theme: ", theme);
        if(["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);   
        }
        else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    };

    const onChange = (action, data) => {
        switch(action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("Case not handled!", action, data);
            }
        }
    };

    const handleCompile = () => {
        console.log(code);
        setProcessing(true);
        const formData = {
            language_id: language.id,
            source_code: btoa(code),     //encoding
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("Response data ", response.data);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                let status = err.response.status;
                console.log("Status: ", status);
                if(status === 429) {
                    console.log("Too many requests ", status);
                    showErrorToast(
                        `Quota of 100 requests exceeded for the Day!`, 10000
                    );
                }
                setProcessing(false);
                console.log("Catch block ", error);
            });
    };

    const checkStatus = async(token) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            if(statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            }
            else {
                setProcessing(false);
                setOutputDetails(response.data);
                //showSuccessToast(`Compiled Successfully!`);
                console.log("Response data ", response.data);
                return;
            }
        }
        catch (err) {
            console.log("Error: ", err);
            setProcessing(false);
            //showErrorToast();
        }   
    };

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showErrorToast = (msg, timer) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return(
        <>
            <div>
                <h2>codePro</h2>
            </div>
            <ToastContainer 
                position='top-right' 
                autoClose={2500} 
                hideProgressBar={false} 
                newestOnTop={true} 
                closeOnClick rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover
            />
            <div>
                <div>
                    <LanguagesDropdown onSelectChange = { onSelectChange } />
                </div>
                <div>
                    <ThemesDropdown handleThemeChange = { handleThemeChange } theme = { theme } />
                </div>
            </div>
            <div className='editor'>
                <CodeEditorWindow 
                    code = { code } 
                    onChange = { onChange }
                    language = { language?.value }
                    theme = { theme.value }
                />
            </div>
            <div>
                <OutputWindow outputDetails = { outputDetails } />
                <div>
                    <CustomInput customInput = { customInput } setCustomInput = { setCustomInput }/>
                    <button
                        onClick = { handleCompile }
                        // disabled = { !code }
                    >
                    { processing ? "Processing..." : "Compile and Execute" }
                    </button>
                </div>
                { outputDetails && <OutputDetails outputDetails = { outputDetails } />}
            </div>
        </>
    );
}

export default Editor;