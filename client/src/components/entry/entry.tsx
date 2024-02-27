import { useState } from 'react';
import './Entry.css'; // Импортируем файл стилей

export default function Entry(props: any) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="entry">
			<label
				className="entry-label"
				style={{
					top: isFocused || props.value ? '-12px' : '25px',
					transform: isFocused || props.value ? 'none' : 'translateY(-100%)'
				}}
			>
				{props.placeholder}
			</label>
			<input
				type={props.type}
				placeholder={isFocused ? '' : props.placeholder}
				className="entry-input"
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onChange={props.onChange}
			/>
		</div>
	);
}
