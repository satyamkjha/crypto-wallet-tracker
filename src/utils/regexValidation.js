export const validateContractAddress = (contract_address) =>
	/^xdc[a-fA-F0-9]{40}$|^0x[a-fA-F0-9]{40}$/i.test(contract_address);

export const isEmail = (email) =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
