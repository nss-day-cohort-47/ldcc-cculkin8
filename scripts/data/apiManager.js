const apiURL = "http://localhost:8088";

//// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}

export const getToppings = (snackId) => {
	return fetch(`http://localhost:8088/snackToppings?snackId=${snackId}&_expand=topping`)
	  .then(response => response.json())
	  .then(parsedResponse => {
        return parsedResponse;  
	   })
}
let snackCollection = [];
export const useSnackCollection = () => {
  const snackCollectionCopy = [...snackCollection]
  return snackCollectionCopy;
}

export const getSnacks = () => {
	return fetch(`${apiURL}/snacks`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
			return parsedResponse;
		})
}
let toppingList = [];
export const grabToppingMenu = () => {
	return fetch(`${apiURL}/toppings`)
		.then(response => response.json())
		.then(parsedResponse => {
			return parsedResponse;
		
		})
} 
export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}?_expand=inFlavor&_expand=season&_expand=type&_expand=shape`)
	.then(response => response.json())
}
export const getSelectSnacks = (toppingId) => {
	return fetch(`http://localhost:8088/snackToppings?toppingId=${toppingId}&_expand=snack`)
	  .then(response => response.json())
	  .then(parsedResponse => {
        return parsedResponse;  
	   })
	  
}

export const usingToppingList = () => {
	const toppingList2 = [...toppingList];
	return toppingList2;
  };

  export const newTopType = (typeObj) => {
	return fetch(`${apiURL}/types`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(typeObj),
	}).then(response => response.json())
}