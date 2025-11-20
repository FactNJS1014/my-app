"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Config } from "../config";
import axios from "axios";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const payload = {
        username: username,
        password: password,
      };

      const url = Config.apiUrl + "/member/signin";
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/backoffice/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          Swal.fire({
            title: "Sign In",
            text: "Username or password is incorrect",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      } else {
        Swal.fire({
          title: "error",
          text: (error as Error).message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-auto items-start border border-gray-400 w-1/2 p-4">
      <div className="text-2xl font-bold">Sig In</div>
      <div>Username</div>
      <div>
        <input
          type="text"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>Password</div>
      <div>
        <input
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignIn} className="button">
          Sign In
        </button>
      </div>
    </div>
  );
}
