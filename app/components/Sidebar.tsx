"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <div className="bg-gray-900 p-4">
        <div className="text-xl text-gray-400">TodoList</div>
        <div>
          <i className="fa-solid fa-user mr-2"></i>[Fact]
        </div>
        <div className="flex gap-2 justify-center mt-2">
          <button className="border border-red-400 px-3 py-1 rounded-lg text-sm text-red-400 flex gap-1 items-center">
            <i className="fa-solid fa-times mr-2"></i>Log out
          </button>
          <button className="border border-sky-400 px-3 py-1 rounded-lg text-sm text-sky-400 flex gap-1 items-center">
            <i className="fa-solid fa-pencil mr-2"></i>Edit
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/todo">
            <i className="fa-solid fa-list mr-2"></i> บันทึกงาน
          </Link>
          <Link href="/dashboard/home/report">
            <i className="fa-solid fa-file-alt mr-2"></i> รายงานสรุป
          </Link>
        </div>
      </div>
    </div>
  );
}
