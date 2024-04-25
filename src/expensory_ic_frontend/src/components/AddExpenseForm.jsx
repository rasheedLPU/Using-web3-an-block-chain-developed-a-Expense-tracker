import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

const AddExpenseForm = (props) => {
  const { dispatch } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [existingNames, setExistingNames] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      name,
      cost: parseInt(cost),
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    setName("");
    setCost("");
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div className="row">
        <div className="col-lg-12">
          <label htmlFor="name">Name</label>
          <input
            required="required"
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => {
              const newName = event.target.value;
              if (!existingNames.includes(newName)) {
                setName(newName);
              } else {
                console.log("Duplicate name detected!");
              }
            }}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <label htmlFor="cost">Cost</label>
          <input
            required="required"
            type="number"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(Math.max(0, event.target.value))}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
