import {
  equals as deepEquals,
  evolve,
  move,
  remove,
  insert,
  append,
  assoc
} from "ramda";
import uuid from "uuid/v4";

export function reorderItems(state, { source, destination, itemId }) {
  if (!destination || deepEquals(source, destination)) {
    return state;
  }

  const { index: sourceIndex, droppableId: sourceColumn } = source;
  const { index: targetIndex, droppableId: targetColumn } = destination;

  if (sourceColumn === targetColumn) {
    return evolve(
      {
        columns: {
          [sourceColumn]: {
            items: move(sourceIndex, targetIndex)
          }
        }
      },
      state
    );
  }

  return evolve(
    {
      columns: {
        [sourceColumn]: {
          items: remove(sourceIndex, 1)
        },
        [targetColumn]: {
          items: insert(targetIndex, itemId)
        }
      }
    },
    state
  );
}

export function addItem(state, { content, columnId }) {
  if (!content) return state;

  const id = uuid();

  return evolve(
    {
      items: assoc(id, { id, content }),
      columns: {
        [columnId]: {
          items: append(id)
        }
      }
    },
    state
  );
}

