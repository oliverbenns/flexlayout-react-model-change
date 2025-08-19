export const defaultLayout = {
	global: {},
	borders: [],
	layout: {
		type: "row",
		weight: 100,
		children: [
			{
				type: "tabset",
				weight: 50,
				children: [
					{
						type: "tab",
						name: "One",
						component: "placeholder",
					},
				],
			},
			{
				type: "tabset",
				weight: 50,
				children: [
					{
						type: "tab",
						name: "Two",
						component: "placeholder",
					},
				],
			},
		],
	},
};
