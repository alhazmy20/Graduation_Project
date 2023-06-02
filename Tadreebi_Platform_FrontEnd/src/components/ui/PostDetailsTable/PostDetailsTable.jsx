import React from "react";
import "./PostDetailsTable.scss";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faMarsAndVenus,
  faBriefcase,
  faCalendarDays,
  faClock,
  faEarth,
  faCity,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

const PostDetailsTable = ({ data }) => {
  return (
    <Table responsive className="post-detail-table">
      <tbody>
        <tr>
          <td>
            <FontAwesomeIcon className="icon" icon={faDollar} />
            <span className="label">مكافأة:</span>
            <span>{data?.reward}</span>
          </td>
          <td>
            <FontAwesomeIcon className="icon" icon={faMarsAndVenus} />
            <span className="label">الجنس:</span>
            <span>{data?.gender}</span>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
            <span className="label">موعد النشر:</span>
            <span>{data?.created_at}</span>
          </td>
          <td>
            <FontAwesomeIcon className="icon" icon={faBriefcase} />
            <span className="label">نوع البرنامج التدريبي:</span>
            <span>{data?.t_type}</span>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
            <span className="label">تاريخ البدء:</span>
            <span>{data?.t_startDate}</span>
          </td>
          <td>
            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
            <span className="label">تاريخ الإنتهاء:</span>
            <span>{data?.t_endDate}</span>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon className="icon" icon={faEarth} />
            <span className="label">المنطقة:</span>
            <span>{data?.region}</span>
          </td>
          <td>
            <FontAwesomeIcon className="icon" icon={faCity} />
            <span className="label">المدينة:</span>
            <span>{data?.city}</span>
          </td>
        </tr>
        <tr>
          <td>
            <FontAwesomeIcon className="icon" icon={faClock} />
            <span className="label">موعد إنتهاء التقديم:</span>
            <span>{data?.p_endTime}</span>
          </td>
          <td>
            <FontAwesomeIcon className="icon" icon={faGraduationCap} />
            <span className="label">التخصصات المطلوبة:</span>
            <div className="majors">
              {data.post_majors?.map((m) => (
                <span key={m.major} className="major">
                  {m.major}
                </span>
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PostDetailsTable;
