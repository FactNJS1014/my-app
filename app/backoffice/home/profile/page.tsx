"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Config } from "@/app/backoffice/config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Config.apiUrl}/member/info`;
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        console.log(response.data);
        if (response.status == 200) {
          setName(response.data.member.name);
          setUsername(response.data.member.username);
          setPassword(response.data.member.password);
          setConfirmPassword(response.data.member.password);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: (error as Error).message,
        });
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (password != confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password not match",
        });
        return;
      }

      const payload = {
        name: name,
        username: username,
        password: password,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const url = `${Config.apiUrl}/member/update`;
      const response = await axios.put(url, payload, { headers });
      console.log(response.data);
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Update profile successfully",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-auto mt-10 border border-gray-400 p-4 rounded-lg">
      <div className="text-xl font-bold">แก้ไขข้อมูลส่วนตัว</div>
      <div>
        <div>ชื่อ</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <div>Username</div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <div>Password</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <div>Confirm Password (ไม่อยากเปลี่ยนรหัสผ่านให้เว้นช่องนี้)</div>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="button" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
}
