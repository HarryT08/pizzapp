import React, { useState, useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import cloudUpload from "../assets/img/cloudUpload.png";

const FileUpload = () => {
  const [file, setFile] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-azul-marino/60 rounded-lg">
      <img
        src={file ? URL.createObjectURL(file) : cloudUpload}
        alt=""
        className="w-full h-40 object-container object-center rounded-t-md"
      />

      <div>
        <form action="">
          <label
            htmlFor="file"
            className="flex gap-2 items-center font-semibold text-lg cursor-pointer"
          >
            Imagen: <AiFillCamera />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
