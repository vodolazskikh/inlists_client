import { List } from "types/data";

export const lists: List[] = [
  {
    _id: "0",
    title: "Что посмотреть",
    description: "Список фильмов для вечера пятницы",
    rating: 4.1,
    emoji: "🎬",
    items: [
      { value: "Пираты карибского моря и грязный Виктор", isChecked: false },
      { value: "Замерзшая в Суздали", isChecked: false },
      { value: "Отстойники 3", isChecked: false },
    ],
  },
];
