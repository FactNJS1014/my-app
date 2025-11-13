"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Config } from "../config";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const url = Config.apiUrl + "/member/signup";
      const payload = {
        name: name,
        username: username,
        password: password,
      };

      const res = await axios.post(url, payload);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        router.push("/backoffice/signin");
      }
    } catch (error: unknown) {
      Swal.fire({
        title: "error",
        text: (error as Error).message,
        icon: "error",
      });
    }
  };

  return (
    <div className="border border-gray-400 rounded-md p-10 m-20 flex flex-col gap-4">
      <div className="text-2xl font-bold">Sign Up</div>
      <div>
        <div>Name</div>
        <input className="input" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <div>Username</div>
        <input
          className="input"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <div>Password</div>
        <input
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className="button" onClick={handleSignUp}>
          Submit
        </button>
      </div>
    </div>
  );
}
