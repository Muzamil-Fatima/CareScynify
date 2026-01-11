import React from "react";

const AddReceptionists = () => {
  return (
    <div>
      <label htmlFor="">Name</label>
      <input type="text" />
      <label htmlFor="">Phone</label>
      <input type="text" />
      <label htmlFor="">CNIC</label>
      <input type="text" />
      <label htmlFor="">UserName</label>
      <input type="text" />
      <label htmlFor="">Password</label>
      <input type="text" />
      <label htmlFor="">Gender</label>
      <label htmlFor="">Address</label>
      <textarea name="" id=""></textarea>
      <label htmlFor="">Email</label>
      <input type="text" name="" id="" />
      <div>
        <button>Add</button>
        <button>Update</button>
        <button>Clear</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default AddReceptionists;
