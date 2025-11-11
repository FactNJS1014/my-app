"use client";

import axios from "axios";

export default function Authorization() {
  const sendToken = async () => {
    const token = "asdd";
    const headers = {
      Authorization: "Bearer " + token,
    };
    const payload = {
      id: 100,
      name: "java",
      price: 900,
    };

    const url = "http://localhost:3000/api/products";
    const response = await axios.post(url, payload, { headers });
    console.log(response);
  };

  return (
    <div>
      <button onClick={sendToken} className="button">
        Send Token
      </button>
    </div>
  );
}
