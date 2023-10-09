import React, { useEffect, useState } from "react";
import "./employee.css";
import { Link } from "react-router-dom";

const Search = ({ data }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    const userInput = e.target.value;
    setSearchInput(userInput);
  };
  useEffect(() => {
    if (searchInput) {
      const lowerCaseUserInput = searchInput.toLowerCase();
      const filteredData = data.filter((emp) => {
        return emp.firstname.toLowerCase().includes(lowerCaseUserInput);
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData([]);
    }
  }, [searchInput, data]);

  //   const handleClick = () => {
  //     if (searchInput.length > 0) {
  //       const lowerCaseSearchInput = searchInput.toLowerCase();
  //       const filtData = data.filter((emp) => {
  //         return emp.firstname.toLowerCase().includes(lowerCaseSearchInput);
  //       });
  //       console.log(filtData);
  //       setFilteredData(filtData);
  //       filterData(filteredData);
  //     }
  //   };

  return (
    <>
      <div className="search">
        <div className={` ${searchInput.length > 0 ? "searchcontent" : ""}`}>
          <input
            type="search"
            placeholder="Search the employee by name"
            onChange={handleChange}
            value={searchInput}
            className={
              searchInput.length > 0 ? "searchInputContent" : "searchInput"
            }
          />
          {/* <span>
            <AiOutlineSearch onClick={handleClick} />
          </span> */}
          <div className="">
            {filteredData.map((emp) => (
              <Link
                className="text-decoration-none"
                to={{
                  pathname: `/employee/info/${emp.id}`,
                }}
                state={{ emp }}
                key={emp.id}
              >
                <div className="hover-effect">{emp.firstname}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
