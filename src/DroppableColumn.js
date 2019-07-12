import React from "react";
import { DraggableItem } from "./DraggableItem";
import { Droppable } from "react-beautiful-dnd";
import { ItemCreator } from "./ItemCreator";

export function DroppableColumn({ items, title, id }) {
  return (
    <div className="Column">
      <div className="Column__title">{title}</div>
      <Droppable droppableId={id}>
        {provided => (
          <div
            className="Column__items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                index={index}
                content={item.content}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <ItemCreator columnId={id} />
    </div>
  );
}
