import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ obj }) => {
  const { title, stipend, company_name, location_names, duration, start_date, _id } = obj;
  const navigate = useNavigate();

  const getdata = async () => {
   
      const token = localStorage.getItem('Token');
      if (!token) {
        alert('login to apply');
        navigate('/');
        return;
      }

      const response = await axios.post('http://localhost:8080/apply', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.res == true ) {
        
        const internshipIds = response.data.user.internshipIds;
       let ans =  internshipIds.includes(_id);

       if (ans == true ){
         alert("Already applied ")
       }else{

        let data = await axios.post('http://localhost:8080/addinternship' , {user : response.data.user , _id : _id})
        console.log(data)
        alert("Applied succesfully ")
       }
        
      } else {
        alert('login to apply');
       
      }
    
  };

  const handleApply = () => {
    getdata();
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl m-5">
      <div className="card-body">
        <h2 className="card-title text-white">{title}</h2>
        <p>{company_name}</p>
        <p>Duration: {duration}</p>
        <p>Stipend: {stipend.salary}</p>
        <p>StartDate: {start_date}</p>
        <div>
          <span>City:</span>
          {location_names.map((city, idx) => (
            <div key={idx} className="badge badge-primary m-2">{city}</div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
