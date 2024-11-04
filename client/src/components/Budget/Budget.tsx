import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
    };

  const handleEditClick = () => {
    setEdit(!edit);
    console.log(edit)
  }

  const handleSaveClick = () => {
    setEdit(!edit);
    updateBudget(budget);
    setBudget(budget);
  }

  return (
    <div>
      {
        edit ? (<div>
          <input
            required
            type="text"
            className="form-control"
            value={budget}
            onChange={(event) => setBudget(parseInt(event.target.value))}
          ></input>
          <button type="submit" className="btn btn-primary mt-3" onClick={(event) => handleSaveClick()}>
            Save
          </button>
          </div>
        )
          : (
            <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
              <div>Budget: {budget} <br />
                <button type="button" className="btn btn-primary mt-3" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
            </div>
          )
      }
    </div>

  );
};

export default Budget;
