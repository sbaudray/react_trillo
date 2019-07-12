import React from "react";
import { AddButton } from "./AddButton";
import { BoardContext } from "./BoardContext";

const Modes = {
  button: "button",
  input: "input,"
};

export function ItemCreator({ columnId }) {
  const dispatch = React.useContext(BoardContext);
  const buttonEl = React.useRef(null);

  const [mode, setMode] = React.useState(Modes.button);
  const [isDirty, setDirty] = React.useState(false);
  const [content, setContent] = React.useState("");

  function submitItem(event) {
    event.preventDefault();

    dispatch({ type: "NEW_ITEM", content, columnId });

    setDirty(true);
    setContent("");
    setMode(Modes.button);
  }

  React.useEffect(() => {
    if (buttonEl && mode === Modes.button && isDirty) {
      buttonEl.current.focus();
    }
  }, [mode, isDirty]);

  return mode === Modes.button ? (
    <AddButton innerRef={buttonEl} onClick={() => setMode(Modes.input)} />
  ) : (
    <form onSubmit={submitItem}>
      <input
        autoFocus
        value={content}
        onChange={e => setContent(e.currentTarget.value)}
      />
    </form>
  );
}
