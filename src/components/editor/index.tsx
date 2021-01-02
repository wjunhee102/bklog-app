import React, { useState } from "react";

interface Node {
  id: string;
  type: string; // class에 들어가거나 타입에 따라 작동 방식을 넣을 것.
  content: string; 
}

interface NodeDomDefaultProps {
  node: Node;
  addNode: any
}


function NodeDom({ node, addNode }:NodeDomDefaultProps) {

  const { id, type, content }  = node;
  const [ editable, setAble ] = useState<boolean>(false);

  const setEdit = (e:any) => {
    if(e.key === "Enter") {
      setAble(false);
      addNode(e);
    }
  }
  const editing = () => {
    setAble(true);
  }

  return (
    <div 
      className={type} 
      data-id={id} 
      contentEditable={editable}
      onKeyPress={setEdit}
      onClick={editing}
    >
      {content}
    </div>
  )
}

function Editor() {

  const [ nodeData, setNodeData ] = useState<Node[]>([{
    type: "text",
    content: "asdsd",
    id: "123"
  }]);

  const addNode = (e:any) => {
    console.log(e.key);
    if(e.key === "Enter") {
      const data = nodeData.concat();
      data.push({
        type: "text",
        content: "asdsd",
        id: "123"
      })
      console.log(data);
      setNodeData(data);
    }
  }

  return (
    <div>
      {
        nodeData? 
        nodeData.map((node, idx) => 
          <NodeDom 
            node={node}
            key={idx}
            addNode={addNode}
          />
        )
        : "Loading..."
      }
      <textarea onKeyPress={addNode}></textarea>
    </div>
  )
}

export default Editor;