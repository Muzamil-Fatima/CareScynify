import React from "react";

const AddNewDr = () => {
  return (
    <div>
      <div>
        <h2>Personal Information</h2>
        <div>
          <label htmlFor="">Dr Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">DOB</label>
          <p>datepicker</p>
          <p>selection</p>
        </div>
        <div>
          <label htmlFor="">CNIC</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Address</label>
          <input type="text" />
        </div>
      </div>
      <div>
        <h2>Professional Details</h2>
        <div>
          <label htmlFor="">ID</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Specialization</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Qualification</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">License No</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Experience</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">UserName</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" />
        </div>
      </div>
      <div>
        <p>picture box</p>
        <button>Browse</button>
      </div>
      <div>
        <h2>Appointment Details</h2>
        <p>Available Days</p>
        <label htmlFor="">Consultation Hours</label>
        <p>time picker</p>
        <p>Time picker</p>
        <label htmlFor="">Room No.</label>
        <input type="text" />
        <label htmlFor="">Appointment Duration</label>
        <p>Drop Down Box</p>
        <label htmlFor="">Appointment Duration</label>
        <p>counter</p>
        <label htmlFor="">Status</label>
      </div>
      <div>
        <button>Add</button>
        <button>Update</button>
        <button>Clear</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default AddNewDr;
