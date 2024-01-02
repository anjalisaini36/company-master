import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyView = () => {
  const [companyList, setCompanyList] = useState([]);
  const [editedCompany, setEditedCompany] = useState({
    id: '',
    companyCode: '',
    companyName: '',
    companyStatus: '',
  });

  useEffect(() => {
    console.log('Fetching data...');
    axios.get('http://localhost:5000/')
      .then(response => {
        console.log('Data fetched successfully:', response.data);
        setCompanyList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message, error.response);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (company) => {
    // Set the editedCompany state to the selected company
    setEditedCompany({
      id: company.id,
      companyCode: company.companyCode,
      companyName: company.companyName,
      companyStatus: company.companyStatus,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany({ ...editedCompany, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/${editedCompany.id}`, editedCompany);
      window.location.reload();
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <>
      <div className='mt-5'>
        <h1 className="viewScreen text-center pb-2">View Screen</h1>
        <table className="table tableClass">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Company Code</th>
              <th>Company Name</th>
              <th>Company Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companyList.map((company, index) => (
              <tr key={company.id}>
                <td>{index + 1}</td>
                <td>{company.companyCode}</td>
                <td>{company.companyName}</td>
                <td>{company.companyStatus}</td>
                <td>
                  <button className='btn btn-danger m-2' onClick={() => handleDelete(company.id)}>Delete</button>
                  <button className='btn btn-primary m-2' onClick={() => handleUpdate(company)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form or Modal for Editing  */}
      {editedCompany.id && (
        <div className='editData'>
          <h2 className='text-center editHeading'>Edit Data</h2>
          <label>Company Code:</label>
          <input
            type="text"
            name="companyCode"
            value={editedCompany.companyCode}
            onChange={handleEditInputChange}
          />
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={editedCompany.companyName}
            onChange={handleEditInputChange}
          />
          
          <div className="label-input-container">
            <label>Company Status:</label>

            <select
              name="companyStatus"
              value={editedCompany.companyStatus}
              onChange={handleEditInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button className='btn btn-dark m-3' onClick={handleSaveEdit}>Save</button>
        </div>
      )}
    </>
  );
};

export default CompanyView;
