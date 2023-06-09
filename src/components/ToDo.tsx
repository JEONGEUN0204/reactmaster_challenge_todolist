import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState, categoryType } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const categories = useRecoilValue(categoryType);

  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (item:string) =>
          category !== item && (
            <button name={item} onClick={onClick}>
              {item}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
