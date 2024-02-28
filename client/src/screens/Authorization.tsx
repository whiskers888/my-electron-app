import { FormEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useApiRequest } from '../dispatch/dispatch'; // Предполагается, что useApiRequest находится в том же файле

function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit">App_name</Link> {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface SignInSideProps {
	onLogin: (token: string) => void;
}

export default function SignInSide({ onLogin }: SignInSideProps) {
	const { request, loading, error } = useApiRequest<{ token: string }>();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const userModel = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		try {
			await request('http://localhost:3001/api/auth/sign-in', 'POST', JSON.stringify(userModel)).then(data =>{
				if (data && data.token) {
					localStorage.setItem('authToken', data.token);
					onLogin(data.token);
					console.log('Success:', data);
				} else {
					setErrorMessage('Токен не получен');
				}
			});

			
		} catch (err) {
			setErrorMessage('Ошибка при отправке запроса');
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid
				container
				component="main"
				sx={{ height: '100vh' }}
			>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://chip58.ru/uploads/s/r/c/d/rcdsnhbi05og/img/full_Kait57Oq.jpeg)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={6}
					square
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography
							component="h1"
							variant="h5"
						>
							Вход в приложение
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Логин"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Пароль"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							{errorMessage && <Typography color="error">{errorMessage}</Typography>}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								{loading ? 'Загрузка...' : 'Sign In'}
							</Button>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
