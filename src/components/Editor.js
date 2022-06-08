import React, { useEffect, useState, useContext } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import UserDropdown from './UserDropdown';


const intial = ``;

const Editor = () => {
    const [code, setCode] = useState(intial);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("clouds-midnight");
    const [language, setLanguage] = useState(languages[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("Enter press ", enterPress);
            console.log("Control press ", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const onSelectChange = (selectedLang) => {
        console.log("Selected Language: ", selectedLang);
        setLanguage(selectedLang);
    };

    function handleThemeChange(th) {
        const theme = th;
        console.log("Theme: ", theme);
    
        if (["light", "vs-dark"].includes(theme.value)) {
          setTheme(theme);
        } 
        else {
          defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }
    useEffect(() => {
        defineTheme("clouds-midnight").then((_) =>
        setTheme({ value: "clouds-midnight", label: "Clouds Midnight" }));
    }, []);

    const onChange = (action, data) => {
        switch (action) {
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
        //console.log(code);
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
                if (status === 429) {
                    console.log("Too many requests ", status);
                    showErrorToast(
                        `Quota of 100 requests exceeded for the Day!`, 10000
                    );
                }
                setProcessing(false);
                console.log("Catch block ", error);
            });
    };

    const checkStatus = async (token) => {
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

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            }
            else {
                setProcessing(false);
                setOutputDetails(response.data);
                console.log("Response: ", response.data);
                if(response.data.status_id === 6)
                    showErrorToast(`Compilation Error!`);
                else if(response.data.status_id === 11)
                    showErrorToast(`Runtime Error!`);
                else
                    showSuccessToast(`Compiled Successfully!`);
                console.log("Response data ", response.data);
                return;
            }
        }
        catch (err) {
            console.log("Error: ", err);
            setProcessing(false);
            showErrorToast();
        }
    };

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-center",
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
            position: "top-center",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }; 

    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='background'>
            <div className='top'>
                <div><Link to={`/`} style={{ textDecoration: 'none' }}><h1 className="name">code<b>Pro</b></h1></Link></div>
                <div className='top-right'>
                    <div className='grad-border theme-button'>
                        <ThemesDropdown handleThemeChange={handleThemeChange} theme={theme} />
                    </div>
                    <UserDropdown />
                </div>
            </div>
            <ToastContainer
                position='top-center'
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick rtl={false}
                theme='dark'
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='main'>
                <div className='editor-window'>
                    <div className='editor-nav'>
                        <div className='grad-border'>
                            <LanguagesDropdown onSelectChange={onSelectChange} />
                        </div>
                        <button className='run-btn'
                            onClick={handleCompile}
                            disabled = { !code }
                        >
                            {processing ? <div style={{ width: "18px", height: "18px" }} class="spinner-border text-light" role="status">
                                <span class="sr-only"></span>
                            </div> : "RUN"}
                        </button>
                    </div>
                    <div>
                        <CodeEditorWindow
                            code={code}
                            onChange={onChange}
                            language={language?.value}
                            theme={theme.value}
                        />
                    </div>
                </div>
                <div className='io'>
                    <div className='input'>
                        <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
                    </div>
                    <div className='output-scr'>
                        Output
                        <div className='output-window'>
                            <OutputWindow outputDetails={outputDetails} />
                            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Editor;