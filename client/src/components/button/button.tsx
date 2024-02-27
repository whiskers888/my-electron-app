import './button.css';

export default function Button(props: any) {
	return (
		<button
			className={`button ${props.className}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
