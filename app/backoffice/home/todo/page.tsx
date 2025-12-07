"use client";

import { Config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Todo() {
  const [name, setName] = useState("");
  const [remark, setRemark] = useState("");
  const [id, setId] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const url = `${Config.apiUrl}/todo/list`;
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      if (response.data.todos) {
        console.log("response.data.todos", response.data.todos);
        setList(response.data.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        remark: remark,
      };
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = `${Config.apiUrl}/todo/create`;
      const response = await axios.post(url, payload, { headers });
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Save successfully",
      });
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
    }
  };
  return (
    <div className="flex flex-col w-full">
      <div className="border border-gray-400 m-5 ">
        <div className="text-xl font-bold bg-gray-200 p-4">บันทึกรายการ</div>
        <div className="p-4 flex flex-col gap-4">
          <div>สิ่งที่ต้องทำ</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <div>หมายเหตุ</div>
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="input"
          />
          <button type="submit" className="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <table className="table m-5">
        <thead className="bg-gray-400">
          <tr>
            <th className="p-2 text-start">รายการที่จะทำ</th>
            <th className="p-2 text-start">หมายเหตุ</th>
            <th className="p-2">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: { id: number; name: string; remark: string }) => (
            <tr key={item.id} className="bg-gray-200 border border-b-1">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.remark}</td>
              <td className="p-2 text-center">
                <div className="flex gap-2 justify-center">
                  <button className="bg-amber-500 text-white px-4 py-2 rounded-md">
                    รอทำ
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    กำลังทำ
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                    เสร็จสิ้น
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
