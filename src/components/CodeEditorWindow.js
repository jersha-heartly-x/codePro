import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    console.log(value);
    setValue(value);
    onChange("code", value);
  };

  return (
    <div >
      <Editor
        height="85vh"
        borderRadius="0 0 7px 7px"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        theme={theme}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;