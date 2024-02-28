import { useState, useCallback } from 'react';

export function useApiRequest<T>() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const request = useCallback(async (url: string, method: string = 'GET', body: BodyInit | null = null) => {
		setLoading(true);
		setError(null);
		try {
			const headers: HeadersInit = {
				'Content-Type': 'application/json'
			};

			const response = await fetch(url, {
				method,
				body,
				headers
			});

			if (!response.ok) {
				throw new Error(`Ошибка HTTP: ${response.status}`);
			}

			const data = await response.json();
			return data as T;
		} catch (error: any) {
			setError(error.message);
			throw error; // Переброс исключения для использования в then/catch
		} finally {
			setLoading(false);
		}
	}, []);

	return { request, loading, error };
}
