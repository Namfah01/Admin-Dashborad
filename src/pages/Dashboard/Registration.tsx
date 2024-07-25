import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";

function Registration() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://test-api-py77dwlbxa-df.a.run.app/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
        console.log("Data from API:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "รอตรวจสอบ":
        return "bg-blue-500 text-white";
      case "พิจารณาเอกสาร":
        return "bg-orange-400 text-white";
      case "ขึ้นทะเบียน":
        return "bg-green-300 text-green-800";
      case "ออกเอกสาร":
        return "bg-yellow-200 text-orange-900";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  useEffect(() => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App m-10">
      <h1 className="text-3xl font-bold mb-6 text-center font-serif text-gray-700">
        รายการขอขึ้นทะเบียน
      </h1>
      <div className="flex justify-end mb-4">
        <div className="relative w-1/5">
          <input
            type="text"
            placeholder="ค้นหาชื่อหน่วยงาน..."
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="h-6 w-6 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3 hover:cursor-pointer" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ชื่อหน่วยงาน</th>
              <th className="border px-4 py-2">รหัสหน่วยบริการ</th>
              <th className="border px-4 py-2">วันที่ขึ้นทะเบียน</th>
              <th className="border px-4 py-2">ชื่อผู้ตรวจสอบ</th>
              <th className="border px-4 py-2">วันที่ตรวจสอบ</th>
              <th className="border px-4 py-2">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2 hover:cursor-pointer ">
                  {item.name}
                </td>
                <td className="border px-4 py-2 ">{item.code}</td>
                <td className="border px-4 py-2 text-center">
                  {item.verifyDate}
                </td>
                <td className="border px-4 py-2 text-center">
                  {item.verifyBy}
                </td>
                <td className="border px-4 py-2 text-center">-</td>
                <td className="border px-4 py-2 rounded-lg ">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-s font-semibold hover:cursor-pointer border ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Registration;
