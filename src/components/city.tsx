import { core } from "config";
import React, {
  memo,
  useCallback,
  useEffect,
  FC,
  useMemo,
  useState,
} from "react";
import { CityCode } from "types/city";

interface Props {
  cityCode: CityCode;
  onCityChange: (cityCode: CityCode) => void;
}

export const City: FC<Props> = memo(({ cityCode, onCityChange }) => {
  const [showCitySelect, setShowCitySelect] = useState(false);

  const onGeoLocationSuccess = useCallback(
    (position: { coords: { latitude: number; longitude: number } }) => {
      //   const lat = position.coords.latitude;
      //   const lon = position.coords.longitude;
      //   @TODO заюзать геокодинг и сделать ситиселект
    },
    []
  );

  const onGeoLocationError = useCallback(() => {
    // @TODO заюзать геокодинг и сделать ситиселект - обработать ошибку
  }, []);

  const getNameByCode = (code: CityCode) => {
    switch (code) {
      case "nsk":
        return "Новосибирск";
      case "ekb":
        return "Екатеринбург";
      case "kazan":
        return "Казань";
      case "spb":
        return "Санкт-Петербург";
      case "tomsk":
        return "Томск";
      case "tumen":
        return "Тюмень";
      default:
        console.log("Ты забыл поддержать имя нового города");
        return "";
    }
  };

  useEffect(() => {
    // @TODO заюзать геокодинг и сделать ситиселект
    // navigator.geolocation.getCurrentPosition(
    //   onGeoLocationSuccess,
    //   onGeoLocationError
    // );
  }, [onGeoLocationSuccess, onGeoLocationError]);

  const citySelect = useMemo(() => {
    if (!showCitySelect) {
      return null;
    }

    return (
      <nav className="flex flex-wrap absolute top-80 left-32 list-none z-top text-xl">
        {core.city.map((item) => (
          <li
            className="px-16 rounded-md bg-white cursor-pointer mx-4 my-4 transform hover:scale-105 transition-transform"
            key={item}
            onClick={() => onCityChange(item)}
          >
            {getNameByCode(item)}
          </li>
        ))}
      </nav>
    );
  }, [showCitySelect, onCityChange]);

  return (
    <div className="relative z-base flex justify-start items-center p-8 w-full">
      <div
        className="absolute z-top text-white text-2xl p-32 cursor-pointer"
        onClick={() => setShowCitySelect(!showCitySelect)}
      >
        {getNameByCode(cityCode)}
      </div>
      {citySelect}
      <img
        src={`${process.env.PUBLIC_URL}/city/${cityCode}.jpg`}
        className="w-full h-112 object-cover  rounded-t-md"
        alt="city"
      />
    </div>
  );
});
