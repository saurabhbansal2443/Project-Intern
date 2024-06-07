import React from "react";

const Card = ({obj}) => {
  let {title , stipend , company_name ,location_names , duration , start_date } = obj
  return (
    <div className="card card-side bg-base-100 shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title text-white" >{title}</h2>
        <p >{company_name}</p>
        <p> Duration : {duration}</p>
        <p> Stipend : {stipend.salary}</p>
        <p> StartDate : {start_date}</p>
        <div>
          <span> City : </span>
          {location_names.map((city ,idx )=> <div key={idx} className="badge badge-primary m-2">{city}</div>)}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" >Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
