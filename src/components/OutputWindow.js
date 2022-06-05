import React from "react"



const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if(statusId === 6) {
            // compilation error
            return (
                // atob - decoding
                <p>{atob(outputDetails?.compile_output) }</p>
            );
        }
        else if(statusId === 3) {
            return (
                <pre>{atob(outputDetails.stdout) !== null ? `${atob(outputDetails.stdout)}` : null }</pre>
            );
        }
        else if(statusId === 5) {
            return (
                <pre>{`Time limit exceeded!`}</pre>
            );
        }
        else {
            return (
                <pre>{ atob(outputDetails?.stderr) }</pre>
            );
        }
    };

    return (
        <>
            <div>{outputDetails ? <>{getOutput()}</> : null}</div>
        </>
    );
};


export default OutputWindow;