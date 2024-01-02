import React, { useState } from "react";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    companyCode: "",
    companyName: "",
    companyPrefix: "",
    groupOfCompany: "",
    locationCode: "",
    maxRequestQty: "",
    companyStatus: "",
    createdBy: "",
    createdDateTime: "",
    modifiedBy: "",
    modifiedDateTime: "",
  });

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data submitting:", formData);

    if (
      !formData.companyCode ||
      !formData.companyName ||
      !formData.companyStatus ||
      !formData.maxRequestQty
    ) {
      alert(
        "Company Code, Company Name, Max Request QTY and Company Status are required fields."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Form Data saved:", result);
      window.location.reload();

      // Reset form after successful submission
      setFormData({
        id: "",
        companyCode: "",
        companyName: "",
        companyPrefix: "",
        groupOfCompany: "",
        locationCode: "",
        maxRequestQty: "",
        companyStatus: "",
        createdBy: "",
        createdDateTime: "",
        modifiedBy: "",
        modifiedDateTime: "",
      });
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const validateNumericInput = (value) => {
    const regex = /^\d*$/; // Only allows digits
    return regex.test(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the state only if the validation passes
    if (name === "companyPrefix" && value.length > 9) {
      alert("Company Prefix must not exceed 9 characters.");
      return;
    }

    if (name === "id" || name === "companyCode" || name === "maxRequestQty") {
      if (!validateNumericInput(value)) {
        alert(`${name} must be a numeric value.`);
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      companyCode: "",
      companyName: "",
      companyPrefix: "",
      groupOfCompany: "",
      locationCode: "",
      maxRequestQty: "",
      companyStatus: "",
      createdBy: "",
      createdDateTime: "",
      modifiedBy: "",
      modifiedDateTime: "",
    });
  };
  return (
    <>
      <h1 className=" container mt-5 pb-2 text-center formHeading">
        Company Form
      </h1>
      <div className="your-form-container">
        <div className="form-section">
          <div className="label-input-container">
            <label>ID:</label>
            <input
              type="tel"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Company Code:</label>
            <input
              type="tel"
              name="companyCode"
              value={formData.companyCode}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Company Prefix</label>
            <input
              type="text"
              name="companyPrefix"
              value={formData.companyPrefix}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Group of Company:</label>

            <select
              name="groupOfCompany"
              value={formData.groupOfCompany}
              onChange={handleInputChange}
            >
              <option value="Group1">Group 1</option>
              <option value="Group2">Group 2</option>
              {/* Add other options as needed */}
            </select>
          </div>

          <div className="label-input-container">
            <label>Location Code:</label>
            <select
              name="locationCode"
              value={formData.locationCode}
              onChange={handleInputChange}
            >
              <option value="Location1">Location 1</option>
              <option value="Location2">Location 2</option>
              {/* Add other options  */}
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="label-input-container">
            <label>Max Request QTY</label>
            <input
              type="tel"
              name="maxRequestQty"
              value={formData.maxRequestQty}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Company Status:</label>

            <select
              name="companyStatus"
              value={formData.companyStatus}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="label-input-container">
            <label>Created By</label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Created DateTime</label>
            <input
              type="date"
              name="createdDateTime"
              value={formData.createdDateTime}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Modified By</label>
            <input
              type="text"
              name="modifiedBy"
              value={formData.modifiedBy}
              onChange={handleInputChange}
            />
          </div>

          <div className="label-input-container">
            <label>Modified DateTime</label>
            <input
              type="date"
              name="modifiedDateTime"
              value={formData.modifiedDateTime}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="button-container">
          <button
            className="m-4 btn btn-secondary"
            type="submit"
            onClick={handleFormSubmit}
          >
            Save
          </button>

          <button
            className="m-4 btn btn-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          
          <button
            className="m-4 btn btn-secondary "
            type="button"
            onClick={handleFormSubmit}
          >
            List
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
