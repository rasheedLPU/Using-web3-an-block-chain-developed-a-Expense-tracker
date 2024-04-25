import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const RemainingBudget = () => {
    const { expenses, budget } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const remaining = budget - totalExpenses;

    let alertType = 'alert-success';
    let alertMessage = 'Remaining: ';

    // Check if remaining budget is less than 20% of the total budget
    if (remaining < budget * 0.2) {
        alertType = 'alert-danger';
        // alertMessage = 'Alert: Budget is running low!';
		alert('Budget is running low!');
    }

    return (
        <div className={`alert p-4 ${alertType}`} style={{ backgroundColor: "#bbbbbb" }}>
            <span>{alertMessage}<b> ₹{remaining} </b> </span>
        </div>
    );
};

export default RemainingBudget;
