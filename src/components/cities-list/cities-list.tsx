import CityItem from '../city-item/city-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/action';

import type { Cities, CityName } from '../../types/types';

function CitiesList({cities}: {cities: Cities}): JSX.Element {
  const cityNames: CityName[] = Object.keys(cities) as CityName[];
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const handleCityClick = (city: CityName) => {
    dispatch(setCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((city) => <CityItem key={city} city={city} onCityItemClick={handleCityClick} isActive={city === currentCity}/>)}
      </ul>
    </section>
  );
}

export default CitiesList;
