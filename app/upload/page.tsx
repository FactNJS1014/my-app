"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | null = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  const uploader = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("No file selected");

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) return alert("Invalid file type");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = "http://localhost:8080/upload";
      const response = await axios.post<{ message: string }>(url, formData);

      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong");
      }
    }
  };
  return (
    <div className="p-3">
      <form action="" onSubmit={uploader}>
        <input
          type="file"
          className="border p-2 rounded-md mr-2"
          onChange={handleFileChange}
          accept="image/png,image/jpg"
        />
        <button className="button" type="submit">
          Send file to server
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
