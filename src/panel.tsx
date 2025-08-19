import { useMemo, useRef, useEffect, useState } from "react";

type PanelProps = {
	nodeId: string;
};

// import { useMemo, useRef, useEffect, useState } from "react";

export const Panel = ({ nodeId }: PanelProps) => {
	const firstRenderTime = useMemo(() => new Date().toISOString(), []);
	const background = useMountFlashBackground();

	return (
		<div style={{ ...background, width: "100%", height: "100%" }}>
			<ul
				style={{
					fontSize: 10,
				}}
			>
				<li>
					<strong>Node id:</strong> {nodeId}
				</li>
				<li>
					<strong>First render time:</strong> {firstRenderTime}
				</li>
			</ul>
		</div>
	);
};

const useMountFlashBackground = () => {
	const [flash, setFlash] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setFlash(false), 200);
		return () => clearTimeout(timeout);
	}, []);

	return useMemo(() => {
		return {
			background: flash ? "yellow" : "transparent",
			transition: "background 0.2s",
		};
	}, [flash]);
};
