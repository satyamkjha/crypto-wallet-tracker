export const charTypes = ['lowercase', 'uppercase', 'symbol', 'number'];

export function unique(arr1, arr2) {
	const different = [];
	for (const value of arr2) {
		if (!arr1.includes(value)) {
			different.push(value);
		}
	}

	return different;
}

export const getPasswordStrengthMessage = (passwordError) => {
	if (
		passwordError &&
		(passwordError.length < 8 || passwordError.contains.length < 4)
	) {
		return `Your password should contain a
            ${unique(passwordError.contains, charTypes).map(
							(item, index, array) =>
								index === array.length - 1 ? ` ${item}` : ` ${item},`
						)}
            ${
							passwordError.length < 8 &&
							` and should have ${8 - passwordError.length} more characters`
						}`;
	} else return null;
};
