// @ts-ignore
// import * as lib from "./lib.js";



export default function Demo() {
  type Node = {
    id: number;
    name: string;
    parent_id?: number;
    parentNode?: Node;
    children?: Node[];
  };
  let allNodes: Node[] = [
    { id: 1, name: "Boss" },
    { id: 2, name: "HR", parent_id: 1 },
    { id: 3, name: "MK", parent_id: 1 },
    { id: 4, name: "OP", parent_id: 1 },
    { id: 5, name: "Sales", parent_id: 3 },
    { id: 6, name: "CS", parent_id: 3 },
  ];

  for (let node of allNodes) {
    let parent = allNodes.find((parent) => parent.id == node.parent_id);
    if (parent) {
      node.parentNode = parent;
      parent.children ||= [];
      parent.children.push(node);
    }
  }

  let rootNodes = allNodes.filter((item) => !item.parent_id);

  function renderNode(node: Node) {
    return (
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            margin: "auto",
            outline: "1px solid black",
            display: "inline-block",
            padding: "1rem",
            width: "-webkit-fill-available",
          }}
        >
          <div>{node.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "start" }}>
          {node.children?.map(renderNode)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Demo</h1>
      {allNodes.map((item) => (
        <div>
          {item.name}: p is{" "}
          {allNodes.find((parent) => parent.id == item.parent_id)?.name}
        </div>
      ))}
      <h2>chart</h2>
      {rootNodes.map(renderNode)}
    </div>
  );
}
