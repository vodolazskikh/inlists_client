import React, { memo, useCallback, useEffect } from "react";

export const City = memo(() => {
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onGeoLocationSuccess,
      onGeoLocationError
    );
  }, [onGeoLocationSuccess, onGeoLocationError]);
  return (
    <div className="relative z-base flex justify-start items-center p-8 w-full">
      <div className="absolute z-top text-white text-2xl p-32 cursor-pointer">
        Новосибирск
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/novosibirsk.jpg`}
        className="w-full h-112 object-cover  rounded-t-md"
        alt="city"
      />
    </div>
  );
});
