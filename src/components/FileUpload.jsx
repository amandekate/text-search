import React from "react";
import { Label, Input } from "./ui";

const FileUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  return (
    <div className="flex flex-col p-1 gap-1 max-w-[250px]">
      <Label htmlFor="upload">Upload File</Label>
      <Input id="upload" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
