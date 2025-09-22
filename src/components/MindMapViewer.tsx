'use client';

import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RoadmapNode } from '@/types';
import { getCategoryColor } from '@/lib/utils';

interface MindMapViewerProps {
  nodes: RoadmapNode[];
  completedNodes: string[];
  onNodeClick: (nodeId: string) => void;
}

const nodeTypes = {
  custom: ({ data, selected }: { data: any; selected: boolean }) => (
    <div
      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
        data.completed
          ? 'bg-green-500/20 border-green-400 text-green-400'
          : selected
          ? 'bg-blue-500/20 border-blue-400 text-blue-400'
          : 'bg-white/5 border-white/20 text-white hover:border-white/40'
      }`}
    >
      <div className="font-semibold text-sm">{data.label}</div>
      <div className="text-xs text-gray-400">{data.description}</div>
      <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${getCategoryColor(data.category)}`}>
        {data.category}
      </div>
    </div>
  ),
};

export default function MindMapViewer({ nodes, completedNodes, onNodeClick }: MindMapViewerProps) {
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState([]);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convert roadmap nodes to ReactFlow nodes
  const flowNodes = useMemo(() => {
    return nodes.map((node, index) => ({
      id: node.id,
      type: 'custom',
      position: {
        x: (index % 3) * 300 + 100,
        y: Math.floor(index / 3) * 200 + 100,
      },
      data: {
        label: node.title,
        description: node.description,
        completed: completedNodes.includes(node.id),
        category: node.category,
      },
    }));
  }, [nodes, completedNodes]);

  // Create edges based on node relationships
  const flowEdges = useMemo(() => {
    const edges: Edge[] = [];
    nodes.forEach((node) => {
      node.children.forEach((childId) => {
        edges.push({
          id: `${node.id}-${childId}`,
          source: node.id,
          target: childId,
          type: 'smoothstep',
          animated: completedNodes.includes(node.id) && completedNodes.includes(childId),
          style: {
            stroke: completedNodes.includes(node.id) && completedNodes.includes(childId) 
              ? '#10b981' 
              : '#6b7280',
            strokeWidth: 2,
          },
        });
      });
    });
    return edges;
  }, [nodes, completedNodes]);

  // Update nodes and edges when data changes
  useMemo(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClickHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeClick(node.id);
    },
    [onNodeClick]
  );

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
      >
        <Controls className="bg-black/50 border-white/20" />
        <MiniMap
          className="bg-black/50 border-white/20"
          nodeColor={(node) => {
            if (node.data?.completed) return '#10b981';
            return '#6b7280';
          }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#374151"
        />
      </ReactFlow>
    </div>
  );
}
