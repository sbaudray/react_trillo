import React from "react";
import { Draggable } from "react-beautiful-dnd";

export function DraggableItem({ content, id, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="Item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
}

