import React, { useState } from 'react';
import Entry from '../components/entry/entry';
import Button from '../components/button/button';

export default function Authorization() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const response = await fetch('http://your-server-url.com/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				const data = await response.json();
				// Обработка успешного ответа от сервера
				console.log(data);
			} else {
				// Обработка ошибки от сервера
				console.error('Ошибка:', response.status);
			}
		} catch (error) {
			console.error('Ошибка при отправке запроса:', error);
		}
	};

	return (
		<main>
			<div style={{ display: 'flex' }}>
				<img
					src="./humans.png"
					style={{ width: '10%', margin: '80px', transform: 'scaleX(-1)', flexGrow: 1 }}
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						flexGrow: 1,
						zoom: 1.2
					}}
				>
					<div
						style={{
							border: '3px solid #f43f5eda',
							borderRadius: '12px',
							padding: '16px',
							background: '#f43f5eda',
							alignItems: 'center',
							justifyContent: 'center',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<h1 style={{ color: '#fff', background: '#f43f5eda', padding: '8px', borderRadius: '12px' }}>
							Authorization
						</h1>
						<Entry
							type="email"
							placeholder="Введите логин"
							style={{ border: '2px solid #8f49a7' }}
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>
						<Entry
							type="password"
							placeholder="Введите пароль"
							style={{ border: '2px solid #8f49a7' }}
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>
						<Button
							children="Log in"
							style={{ border: '2px solid #8f49a7' }}
							onClick={handleLogin}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}

document.body.style.backgroundImage = 'linear-gradient(to right, #f43f5e, #966fd6)';
