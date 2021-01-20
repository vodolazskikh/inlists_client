import { Close } from "icons/close";
import React, { FC, memo, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "state/actions/popup";
import { addList } from "state/actions/lists/addNew";
import { LiItem } from "./liItem";
import Picker from "emoji-picker-react";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useHistory } from "react-router-dom";
import { getCurrentUserInfo, getCurrentCity } from "state/selectors/user";

export const AddNew: FC = memo(() => {
  const history = useHistory();
  const authorId = useSelector(getCurrentUserInfo)?.id;
  const dispatch = useDispatch();
  const closeCurrentPopup = () => {
    history.goBack();
    dispatch(closePopup());
  };

  const [items, setItems] = useState<
    { value: string | undefined; isChecked: boolean }[]
  >([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("👑");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const city = useSelector(getCurrentCity);

  const pickerRef = useRef(null);
  useOnClickOutside(pickerRef, () => setShowEmojiPicker(false));

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const oтDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const openEmojiInputPanel = () => {
    setShowEmojiPicker(true);
  };
  const onEmojiClick = (
    _event: any,
    emojiObject: { emoji: string; unified: string }
  ) => {
    setEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const onAddItemClick = () => {
    if (items.length > 9) {
      return alert("Максимум - 10 элементов");
    }
    const newItems = [...items, { value: undefined, isChecked: false }];
    setItems(newItems);
  };

  const onTextChange = useCallback(
    (value: string, pos?: number) => {
      if (pos === undefined) {
        return;
      }

      // Осторожно, мутируем
      // Через setItems тут код отказывается работать
      // @todo разобраться
      items[pos].value = value;
    },
    [items]
  );

  const submitNewList = () => {
    if (!title || !items[0]?.value) {
      return;
    }
    // Отправляем запрос на сервер
    dispatch(
      addList({
        title,
        description,
        items,
        emoji,
        authorId,
        city,
      })
    );
    // Закрываем попап
    closeCurrentPopup();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xl mb-16 text-gray-900 w-full">
          <div>
            <span className="mr-8 cursor-pointer" onClick={openEmojiInputPanel}>
              {emoji}
            </span>
            <input
              autoFocus
              required
              type="text"
              className="border-b-2 w-3/5 focus:outline-none"
              placeholder="Название вашего списка"
              onInput={onTitleChange}
            />
            {showEmojiPicker && (
              <div className="absolute z-top" ref={pickerRef}>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </span>
        <span className="cursor-pointer" onClick={closeCurrentPopup}>
          <Close />
        </span>
      </div>
      <div className="ml-24 text-base mb-16 text-gray-900">
        <input
          type="text"
          className="w-3/5 focus:outline-none sm:w-full"
          placeholder="Некоторое описание (опционально)"
          onInput={oтDescriptionChange}
          required
        />
      </div>
      <button
        className="bg-blue-400 active:bg-blue-500 ml-24 mr-12 text-white pt-2 pb-2 pr-12 pl-12 mb-16 focus:outline-none rounded-sm"
        onClick={onAddItemClick}
      >
        Добавьте элемент
      </button>
      <button
        type="submit"
        className="bg-blue-400 active:bg-blue-500 text-white pt-2 pb-2 pr-12 pl-12 mb-16 focus:outline-none rounded-sm"
        onClick={submitNewList}
      >
        Готово
      </button>
      <ul className="ml-24 text-base">
        {items.map((item, pos) => (
          <LiItem
            title={item.value}
            isChecked={item.isChecked}
            key={`${pos}_${item}`}
            pos={pos}
            onTextChange={onTextChange}
          />
        ))}
      </ul>
    </div>
  );
});
