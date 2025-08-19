import "flexlayout-react/style/light.css";
import { useState } from "react";
import { defaultJsonModel } from "./default-model";
import { BrokenLayout, FixedLayout } from "./layout";
import type { IJsonModel } from "flexlayout-react";

export const App = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 30,
        padding: 20,
        boxSizing: "border-box",
        background: "black",
      }}
    >
      <WrappedBrokenLayout />
      <WrappedFixedLayout />
    </div>
  );
};

const WrappedBrokenLayout = () => {
  const [jsonModel, setJsonModel] = useState<IJsonModel>(defaultJsonModel);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <h2 style={{ color: "white", margin: 0 }}>
          Broken Layout - Always updating
        </h2>
        <button onClick={() => setJsonModel(defaultJsonModel)}>Reset</button>
      </div>
      <div style={{ position: "relative", flex: 1 }}>
        <BrokenLayout jsonModel={jsonModel} onChange={setJsonModel} />
      </div>
    </div>
  );
};

const WrappedFixedLayout = () => {
  const [jsonModel, setJsonModel] = useState<IJsonModel>(defaultJsonModel);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <h2 style={{ color: "white", margin: 0 }}>
          Fixed Layout - Components do not remount
        </h2>
        {/* Reset the layout back will still cause a remount here as solution is not smart enough to determine if individual nodes are the same
         */}
        <button onClick={() => setJsonModel(defaultJsonModel)}>Reset</button>
      </div>
      <div style={{ position: "relative", flex: 1 }}>
        <FixedLayout jsonModel={jsonModel} onChange={setJsonModel} />
      </div>
    </div>
  );
};
