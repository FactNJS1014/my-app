"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Config } from "../backoffice/config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [name, setName] = useState("");
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
        setName(response.data.member.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      localStorage.removeItem("token");
      router.push("/backoffice/signin");
    }
  };

  return (
    <div>
      <div className="bg-gray-900 p-4">
        <div className="text-xl text-gray-400">TodoList</div>
        <div>
          <i className="fa-solid fa-user mr-2"></i>
          {name}
        </div>
        <div className="flex gap-2 justify-center mt-2">
          <button
            className="border border-red-400 px-3 py-1 rounded-lg text-sm text-red-400 flex gap-1 items-center"
            onClick={logout}
          >
            <i className="fa-solid fa-times mr-2"></i>Log out
          </button>
          <button
            onClick={() => router.push("/backoffice/home/profile")}
            className="border border-sky-400 px-3 py-1 rounded-lg text-sm text-sky-400 flex gap-1 items-center"
          >
            <i className="fa-solid fa-pencil mr-2"></i>Edit
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <Link href="/backoffice/home/todo">
            <i className="fa-solid fa-list mr-2"></i> บันทึกงาน
          </Link>
          <Link href="/backoffice/home/report">
            <i className="fa-solid fa-file-alt mr-2"></i> รายงานสรุป
          </Link>
        </div>
      </div>
    </div>
  );
}
