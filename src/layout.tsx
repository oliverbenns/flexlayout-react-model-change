import { useEffect, useMemo, useRef, useState } from "react";
import { Layout, Model, TabNode } from "flexlayout-react";
import type { IJsonModel } from "flexlayout-react";
import { Panel } from "./panel";
import objectHash from "object-hash";

const factory = (node: TabNode) => {
	return <Panel nodeId={node.getId()} />;
};

type BrokenLayoutProps = {
	jsonModel: IJsonModel;
	onChange: (model: IJsonModel) => void;
};

export const BrokenLayout = ({ jsonModel, onChange }: BrokenLayoutProps) => {
	// Model is reset each time, despite same layout json, causing remounting of components
	const model = useMemo(() => {
		return Model.fromJson(jsonModel);
	}, [jsonModel]);

	return (
		<Layout
			model={model}
			factory={factory}
			onModelChange={(model) => {
				const jsonModel = model.toJson();
				onChange(jsonModel);
			}}
		/>
	);
};

type FixedLayoutProps = {
	jsonModel: IJsonModel;
	onChange: (model: IJsonModel) => void;
};

export const FixedLayout = ({ jsonModel, onChange }: FixedLayoutProps) => {
	const hashRef = useRef(objectHash(jsonModel));
	const [model, setModel] = useState<Model>(Model.fromJson(jsonModel));

	useEffect(() => {
		// We have to compare a hash as model.toJson() creates a new reference so we cannot
		// just compare by address.
		const newHash = objectHash(jsonModel);
		if (hashRef.current === newHash) {
			return;
		}

		// jsonModel has changed, so update model + new hash.
		hashRef.current = newHash;

		const newModel = Model.fromJson(jsonModel);
		setModel(newModel);
	}, [jsonModel]);

	return (
		<Layout
			model={model}
			factory={factory}
			onModelChange={(model) => {
				const newJsonModel = model.toJson();

				// Store the new hash internally so that when jsonModel is passed in, we can compare
				const newHash = objectHash(newJsonModel);
				hashRef.current = newHash;

				onChange(newJsonModel);
			}}
		/>
	);
};
