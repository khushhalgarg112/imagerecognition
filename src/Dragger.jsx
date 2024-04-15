import Gemini from "./gemini";
import useDragAndDrop from "./useDragAndDrop";
import { useState } from "react";

const Dragger = ({ text }) => {
  const {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  } = useDragAndDrop();
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e?.dataTransfer?.files[0];
    setSelectedFile(file);
    console.log("selected file", file);
  };

  const fileSelect = (e) => {
    let file = e?.target?.files[0];
    setFileDropError("");
    setSelectedFile(file);
    console.log("selected file", file);
  };

  return (
    <>
      <form
        className="h-200 w-200 rounded-20 flex items-center justify-center cursor-pointer border border-dotted border-blue-500"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <label className="" htmlFor="file">
          <div className="dragger">{text}</div>
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={fileSelect}
          className="hidden"
          multiple
        />
      </form>
      {selectedFile && <Gemini file={selectedFile} />}
    </>
  );
};

export default Dragger;