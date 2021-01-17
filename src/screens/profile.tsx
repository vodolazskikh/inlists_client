import { ListCard } from "components/listCard";
import { ListPreview } from "components/listPreview";
import { User } from "components/user";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { Filters } from "components/filters";
import { FilterName } from "types/data";
import { features } from "config";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserLists, getCurrentUserInfo } from "state/selectors/user";
import { fetchUserLists } from "state/actions/users/fetchUserLists";

export const Profile: FC = memo(() => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const dispatch = useDispatch();

  const handleItemClick = useCallback((num: number) => {
    setSelectedItemIndex(num);
  }, []);

  const onFilterApply = (_filterName: FilterName) => {
    // console.log("Выбрал фильтр", filterName);
  };

  const listFilters = useMemo(() => {
    const filters = [{ type: "my" as FilterName, name: "Я автор" }];

    if (features.friends) {
      filters.push({ type: "friends" as FilterName, name: "Добавили друзья" });
    }
    if (features.favorites) {
      filters.push({ type: "favorites" as FilterName, name: "Моё избранное" });
    }

    return filters;
  }, []);

  const userId = useSelector(getCurrentUserInfo)?.id;

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(fetchUserLists({ userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const lists = useSelector(getCurrentUserLists).data;

  return (
    <div className="min-h-screen gap-4 flex flex-col items-center justify-center text-gray-500 relative">
      <section className="absolute top-32 right-32 flex-col flex items-start">
        <User isInUserProfile />
      </section>
      <section className="flex w-full sm:flex-col-reverse items-center justify-evenly mt-72 sm:mt-120">
        <div>
          <div className="ml-8 text-lg mb-32 cursor-pointer absolute top-48">
            <Link to="/">Вернуться назад</Link>
          </div>
          <div className="ml-8 mb-16">
            <Filters handleFilterApply={onFilterApply} types={listFilters} />
          </div>
          {lists?.length && (
            <div className="grid grid-cols-2 max-h-600 overflow-scroll">
              {lists.map((list, position) => (
                <ListPreview
                  key={`${list._id}_${position}`}
                  onClick={() => handleItemClick(position)}
                  isSelected={selectedItemIndex === position}
                  list={list}
                />
              ))}
            </div>
          )}
        </div>
        {lists?.length && (
          <div className="p-32 lg:min-w-400 lg:max-w-400 min-w-full">
            <ListCard list={lists[selectedItemIndex]} usage="flat" />
          </div>
        )}
      </section>
    </div>
  );
});
