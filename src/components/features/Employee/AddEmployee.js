import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./employee.css";
import { axiosInstance } from "../../../AxiosInterceptors";

const AddEmployee = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const dataQueryParam = searchParams.get("data");

  const [isLoading, setIsLoading] = useState(false);
  // const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    dateofbirth: "",
    email: "",
    phonenumber: null,
  });
  const [id, setId] = useState();

  useEffect(() => {
    if (dataQueryParam) {
      const { id, firstname, lastname, dateofbirth, email, phonenumber } =
        JSON.parse(dataQueryParam);
      setInput({ firstname, lastname, dateofbirth, email, phonenumber });
      setId(id);
    }
  }, [dataQueryParam]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const inputFieldName = e.target.name;
    const NewInput = {
      ...input,
      [inputFieldName]: inputValue,
    };
    setInput(NewInput);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dataQueryParam === null) {
      try {
        setIsLoading(true);
        const res = await axiosInstance.post("/employees", {
          firstname: input.firstname,
          lastname: input.lastname,
          dateofbirth: input.dateofbirth,
          email: input.email,
          phonenumber: input.phonenumber,
        });
        console.log("res", res);
        if (res.status === 201) {
          navigate("/employee");
        } else {
          console.log(res);
        }
      } catch (err) {
        setIsLoading(false);
        if (err.response.status === 404)
          setErr("Request failed with status 404 not found");
        else if (err.response.status === 400) setErr(err.response.data);
        else if (err.response.status === 403) {
          setErr(err.response.data);
          navigate("/login");
        }
      }
    } else {
      try {
        setIsLoading(true);
        const res = await axiosInstance.put(`/employees`, {
          id: id,
          firstname: input.firstname,
          lastname: input.lastname,
          dateofbirth: input.dateofbirth,
          email: input.email,
          phonenumber: input.phonenumber,
        });

        console.log("res", res);
        if (res.status === 200) {
          navigate("/employee");
        } else {
          console.log(res);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        if (err.response.status === 404)
          setErr("Request failed with status 404 not found");
        else if (err.response.status === 403) {
          setErr(err.response.data);
          navigate("/login");
        }
      }
    }
  };
  return (
    <div className="m-2 p-2">
      <h3 className="p-2">
        {dataQueryParam ? "Edit Employee Form" : "Employee Registration Form"}
      </h3>
      {/* {msg ? <div className="alert alert-success bannerMsg">{msg}</div> : ""} */}
      {err ? <div className="alert alert-danger bannerMsg">{err}</div> : ""}
      <form onSubmit={handleSubmit} className="p-2 form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            defaultValue={input.firstname}
            // placeholder="Enter firstname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            defaultValue={input.lastname}
            // placeholder="Enter lastname"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dateofbirth"
            name="dateofbirth"
            defaultValue={input.dateofbirth}
            // placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            defaultValue={input.email}
            // placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneno">Phone No.</label>
          <input
            type="tel"
            className="form-control"
            id="phonenumber"
            name="phonenumber"
            defaultValue={input.phonenumber}
            maxLength={10}
            // placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div className="addform p-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : dataQueryParam ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
