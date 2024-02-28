import './App.css';
import { useState, useEffect } from 'react';
import SignInSide from './screens/Authorization';
import Main from './screens/Main';

export default function App() {
	const [authToken, setAuthToken] = useState('');

	useEffect(() => {
		// Чтение токена из localStorage при запуске компонента
		const token = localStorage.getItem('authToken');
		if (token) {
			setAuthToken(token);
		}
	}, []);
	// Функция для обновления состояния токена
	const updateAuthToken = (token: string) => {
		setAuthToken(token);
		localStorage.setItem('authToken', token); // Сохранение токена в localStorage
	};

	// Функция для удаления токена
	const removeAuthToken = () => {
		setAuthToken('');
		localStorage.removeItem('authToken'); // Удаление токена из localStorage
	};
	return (
		<main>
			{authToken}
			{authToken ? (
				<Main
					authToken={authToken}
					onLogout={removeAuthToken}
				/>
			) : (
				<SignInSide onLogin={updateAuthToken} />
			)}
		</main>
	);
}
