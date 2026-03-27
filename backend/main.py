"""
backend/main.py

FastAPI backend for the VectorShift Pipeline Builder.

Endpoints
---------
GET  /              — health check
POST /pipelines/parse — accepts a JSON pipeline (nodes + edges),
                        returns node count, edge count, and whether
                        the graph is a Directed Acyclic Graph (DAG).
"""

from collections import deque
from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="VectorShift Pipeline API")

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request model ─────────────────────────────────────────────────────────────

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


# ── DAG detection (Kahn's topological-sort algorithm) ─────────────────────────

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Returns True if the graph defined by `nodes` and `edges` is acyclic.

    Uses Kahn's algorithm:
    1. Build an in-degree map and adjacency list.
    2. Start from all nodes with in-degree 0.
    3. Repeatedly remove those nodes and decrement neighbours' in-degrees.
    4. If every node is eventually visited the graph has no cycles → DAG.
    """
    node_ids = {node["id"] for node in nodes}

    in_degree: Dict[str, int] = {nid: 0 for nid in node_ids}
    adj:       Dict[str, List[str]] = {nid: [] for nid in node_ids}

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    queue   = deque(nid for nid in node_ids if in_degree[nid] == 0)
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbour in adj[node]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    return visited == len(node_ids)


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    """
    Analyse a pipeline and return:
      - num_nodes : total number of nodes
      - num_edges : total number of edges
      - is_dag    : whether the graph is a Directed Acyclic Graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag       = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag":    dag,
    }
