import { Image } from "antd";
import React, { Suspense } from "react";
import "./InstitutionInfo.scss";
import InstitutionInfoCard from "../../../components/ui/InstitutionInfoCard/InstitutionInfoCard";
import { Await, useLoaderData } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner/Spinner";

const InstitutionInfo = () => {
  const institutionData = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={institutionData?.institution}
        errorElement={<p>Error loading the data.</p>}
      >
        {(loadedData) => (
          <div className="institutionInfo">
            <h1>{loadedData.institutionName}</h1>
            <div className="contianer">
              <div className="detailsContainer">
                <div className="imgContainer">
                  {loadedData.logo?.logo_url && (
                    <Image
                      src={loadedData?.logo.logo_url}
                      alt=""
                      preview={false}
                    />
                  )}
                </div>
                <p className="brief">{loadedData?.institutionSummary}</p>
              </div>
              <InstitutionInfoCard data={loadedData} />
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default InstitutionInfo;
