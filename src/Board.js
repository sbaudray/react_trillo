import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./Board.css";
import { DroppableColumn } from "./DroppableColumn";
import { BoardContext } from "./BoardContext";
import { reorderItems, addItem } from "./BoardReducers";

function boardStateReducer(state, action) {
  switch (action.type) {
    case "DRAG_END":
      return reorderItems(state, action);
    case "NEW_ITEM":
      return addItem(state, action);
    default:
      return state;
  }
}

export function Board() {
  const [boardState, dispatch] = React.useReducer(boardStateReducer, {
    items: {},
    columns: {
      1: {
        id: 1,
        title: "Todo",
        items: []
      },
      2: {
        id: 2,
        title: "Done",
        items: []
      }
    },
    columnsOrder: [1, 2]
  });

  const { columns, columnsOrder, items } = boardState;

  function handleDragEnd({ source, destination, draggableId }) {
    dispatch({ type: "DRAG_END", source, destination, itemId: draggableId });
  }

  return (
    <BoardContext.Provider value={dispatch}>
      <div className="Board">
        <div className="Columnz">
          <DragDropContext onDragEnd={handleDragEnd}>
            {columnsOrder.map(columnId => {
              const column = columns[columnId];
              return (
                <DroppableColumn
                  key={column.id}
                  id={column.id}
                  items={column.items.map(itemId => items[itemId])}
                  title={column.title}
                />
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </BoardContext.Provider>
  );
}

