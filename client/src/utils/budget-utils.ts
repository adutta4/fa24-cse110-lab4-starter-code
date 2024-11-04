import { API_BASE_URL } from '../constants/constants';
import { Expense } from "../types/types";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);

	if (!response.ok) {
    	throw new Error('Failed to fetch budget');
	}

	let budget = response.json().then((jsonResponse) => {
    	console.log("data in fetchBudget", jsonResponse);
    	return jsonResponse.data;
	});

    return budget;
};