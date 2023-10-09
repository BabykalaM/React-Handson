import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import DeleteConfirmation from "../../../modal";
import { Link, useNavigate } from "react-router-dom";
import Search from "./search";
import { axiosInstance } from "../../../AxiosInterceptors";

/**
 *
 * Write common resuable intercepter that uses token if exist for making api calls
 * across application.
 *
 */
const EmployeeList = () => {
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [id, setId] = useState(null);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    // const response = async () => {
    //   var data;
    //   try {
    //     const res = await axiosInstance.get("/employees");
    //     console.log(res);
    //     if (res.status === 200) {
    //       data = res?.data;
    //     }

    //     setData(data);
    //   } catch (err) {
    //     console.log("empl err", err);
    //     // if (err.response.status === 403) {
    //     //   // originalRequest._retry = true;
    //     //   const resp = await RefreshToken();
    //     //   console.log("res", resp);
    //     //   const token = resp.accessToken;

    //     //   localStorage.setItem("token", token);
    //     // }
    //   }
    // };
    employeeData();
  }, []);

  const employeeData = async () => {
    let data;
    try {
      const res = await axiosInstance.get("/employees");
      if (res.status === 200) {
        data = res?.data;
      }
      setData(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleEdit = (id) => {
    setId(id);
    const empDetail = data.find((el) => el.id === id);
    console.log("found", empDetail);
    const queryParams = new URLSearchParams();
    queryParams.append("data", JSON.stringify(empDetail));

    navigate({
      pathname: `/employee/edit/${id}`,
      search: `?${queryParams.toString()}`,
    });
  };

  const handleDelete = async () => {
    try {
      console.log(id);
      setIsLoading(true);
      const res = await axiosInstance.delete(`/employees/${id}`);
      console.log(res);
      if (res.status === 200) {
        setMsg(`Employee ${id} Deleted successfully`);
        employeeData();
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 404)
        setErr("Request failed with status 404 not found");
    }
    setDisplayConfirmationModal(false);
    setIsLoading(false);
  };

  const showDeleteModal = (id) => {
    setId(id);
    console.log(id);
    setDeleteMessage(`Are you sure, you want to delete the employee id ${id}?`);

    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const empList = data?.map((emp) => {
    return (
      <tr key={emp.id}>
        <td>{emp.id}</td>
        <td>
          <Link
            className="text-decoration-none"
            to={{
              pathname: `/employee/info/${emp.id}`,
            }}
          >
            {emp.firstname}
          </Link>
        </td>
        <td>{emp.dateofbirth}</td>
        <td>{emp.email}</td>
        <td>{emp.phonenumber}</td>
        <td>
          <button
            className="btn btn-outline-info btn-sm m-2"
            onClick={() => handleEdit(emp.id)}
          >
            <MdEdit />
          </button>
          <button
            className="btn btn-outline-info btn-sm"
            onClick={() => showDeleteModal(emp.id)}
          >
            <MdOutlineDelete />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Navbar />
      <div>
        <div className="m-2">
          <Search data={data} />
          <h3>Employee List</h3>
        </div>

        {msg ? <div className="alert alert-success bannerMsg">{msg}</div> : ""}
        {err ? <div className="alert alert-danger bannerMsg">{err}</div> : ""}
        <div className="">
          <table className="table table-bordered table-hover w-75 m-4 text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{empList}</tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={handleDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={deleteMessage}
        isLoading={isLoading}
      />
    </>
  );
};

export default EmployeeList;
