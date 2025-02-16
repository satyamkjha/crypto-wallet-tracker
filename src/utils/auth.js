class Auth {
	/**
	 * Authenticate a user. Save sessionId string in Local Storage
	 *
	 * @param {string} sessionId
	 */
	/* eslint-disable no-undef */
	static authenticateUser() {
		localStorage.setItem('authenticated', 'true');
	}

	/**
	 * Check if a user is authenticated - check if sessionId is saved in Local Storage
	 *
	 * @returns {boolean}
	 */
	static isUserAuthenticated() {
		return localStorage.getItem('authenticated') !== null;
	}

	/**
	 * Deauthenticate a user. Remove sessionId from Local Storage.
	 *
	 */
	static deauthenticateUser() {
		localStorage.removeItem('authenticated');
	}

	/**
	 * Get sessionId value.
	 *
	 * @returns {string}
	 */

	// static getSessionId(): string | null {
	//   return localStorage.getItem('sessionId');
	// }
}

export default Auth;
