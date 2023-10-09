import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../AxiosInterceptors";

const EmployeeInfo = () => {
  const params = useParams();
  const id = parseInt(params.id);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const response = async () => {
      try {
        const res = await axiosInstance.get(`/employees/${id}`);
        if (res.status === 200) {
          setData(res?.data);
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          console.log(err.response.data);
        }
      }
    };
    response();
  }, [id]);

  const handleEdit = () => {
    setIsLoading(true);
    const queryParams = new URLSearchParams();
    queryParams.append("data", JSON.stringify(data));

    navigate({
      pathname: `/employee/edit/${data.id}`,
      search: `?${queryParams.toString()}`,
    });
  };
  return (
    <>
      <div className="m-2">
        <h3>Employee Information</h3>
        <div className="p-2">
          <p>
            Employee ID : <b>{data.id}</b>
          </p>

          <p>
            Employee Name : <b>{data.firstname + " " + data.lastname}</b>
          </p>
          <p>
            Date of Birth : <b>{data.dateofbirth}</b>
          </p>

          <p>
            Email Id : <b>{data.email}</b>
          </p>

          <p>
            Phone No : <b>{data.phonenumber}</b>
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleEdit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Edit"}
        </button>
      </div>
    </>
  );
};

export default EmployeeInfo;
