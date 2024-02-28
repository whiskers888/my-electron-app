import React from 'react';

interface MainProps {
	authToken: string;
	onLogout: () => void;
}

function Main({ authToken, onLogout }: MainProps) {
	const handleLogout = () => {
		onLogout();
	};

	return (
		<div>
			<h1>Welcome to the Main Component</h1>
			<p>Your auth token is: {authToken}</p>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}

export default Main;
