import { useCallback, useEffect, useState } from "react";
import { fetchServerData } from "../../../utilis/fetchDataUtilis";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

function DepartmentOrgChart() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  async function initData() {
    const res = await fetchServerData("/department/list");
    const initialNodes = res.map((v: any) => {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerWidth;
      return {
        id: v.id + "",
        data: { label: `${v.department_name}` },
        position: { x: x, y: y },
      };
    });
    setNodes(initialNodes);

    let initialEdges = [];
    for (let v of res) {
      if (v.father_department_id !== null) {
        initialEdges.push({
          id: `e${v.id}-${v.father_department_id}`,
          source: v.father_department_id + "",
          type: "step",
          target: v.id + "",
        });
      }
    }
    setEdges(initialEdges);
  }

  useEffect(() => {
    initData();
  }, []);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <>
      <div style={{ width: "100%", height: "95vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          attributionPosition="top-right"
        >
          <Controls position={"top-right"} />
          <MiniMap zoomable pannable />
        </ReactFlow>
      </div>
    </>
  );
}

export default DepartmentOrgChart;
