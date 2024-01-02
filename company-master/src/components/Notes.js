import React from "react";

function Notes() {
  return (
    <div className="notes p-2">
      <h2>Notes:</h2>
      <ol>
        <li>
          All drop-down list fields are auto-populated from Database Table.
          <ul>
            <li>Group of Company - Table GroupCompanyMaster.</li>
            <li>Location Code - Table LocationMaster.</li>
          </ul>
        </li>
        <li>Limit of Company Prefix field is '9'.</li>
        <li>Extension Digit & Company Prefix as an optional fields.</li>
        <li>
          Company Status is shown in the drop-down list as Active or Inactive.
        </li>
        <li>Max Request QTY is not null and accepts digits only.</li>
        <li>
          Created and Modified By and DateTime fields are updated based on Data
          Operation (Insert/Update) on Table.
        </li>
        <li>
          Created and Modified Fields: It is only Backend Operation. No need to
          display on Screen.
        </li>
      </ol>
    </div>
  );
}

export default Notes;
