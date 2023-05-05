import "./AdminsTable.scss";
import { Suspense, useState } from "react";
import { Button } from "antd";
import Table from "../../../components/ui/Table/Table";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  AdminStudentTable,
  Edit,
} from "../../../components/ui/Table/TableHelpers";
import { Await, Link, useLoaderData } from "react-router-dom";
import DeleteModal from "../../../components/ui/DeleteModal/DeleteModal";
import { handlePaginationChange } from "../../../util/helpers";

const AdminsTable = () => {
  const adminsData = useLoaderData();
  const { fName } = adminsData;
  console.log(fName);

  const [statusFilter, setStatusFilter] = useState(null);
  const [pageSize, setPageSize] = useState(8);
  const [currentRange, setCurrentRange] = useState([1, pageSize]);

  const filterData = (dataSource) => {
    const filteredDataSource = statusFilter
      ? dataSource?.filter((admin) => admin.status === statusFilter)
      : dataSource;
    return filteredDataSource;
  };

  const columns = [
    {
      title: "اسم المشرف",
      dataIndex: "fName lName",
      align: "center",
      render: (text, record) => (
        <span>{`${record.fName} ${record.lName}`}</span>
      ),
    },
    {
      title: "البريد الالكتروني",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "رقم الجوال",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "تاريخ الإنضمام",
      dataIndex: "created_at",
      align: "center",
    },
    {
      title: "الإجراء",
      dataIndex: "edit",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            <Edit
              record={record}
              endPoint_1={"admin"}
              endPoint_2={"manage-admins"}
            />
            <DeleteModal
              name={`${record.fName} ${record.lName}`}
              id={record.id}
              endpoint="admins"
              deleteType="المشرف"
            />
          </span>
        );
      },
    },
  ];

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    console.log(status);
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={adminsData?.admins}
        errorElement={<p>Error loading admins data.</p>}
      >
        {(loadedData) => (
          <div className="tableContainer">
            <div className="excelContainer">
              <Button className="excelBtn">
                <Link to="/admin/add-admin">
                  <FontAwesomeIcon className="icon" icon={faPlusCircle} />
                  <strong>اضافة مشرف</strong>
                </Link>
              </Button>
            </div>
            <div className="filterTable">
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("")}
              >
                الكل
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("نشط")}
              >
                المشرفين النشطين
              </Button>
              <Button
                className="button-filter"
                onClick={() => handleStatusFilterChange("غير نشط")}
              >
                المشرفين الغير نشطين
              </Button>
            </div>
            <p className="rangeText">
              عرض {currentRange[0]} إلى {currentRange[1]} من أصل{" "}
              {loadedData.length} سجل
            </p>
            <Table
              col={columns}
              data={filterData(loadedData)}
              Size={pageSize}
              handleChange={(page, pageSize) =>
                handlePaginationChange(
                  page,
                  pageSize,
                  loadedData,
                  setCurrentRange,
                  setPageSize
                )
              }
              emptyText="لا توجد بيانات"
            />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default AdminsTable;
