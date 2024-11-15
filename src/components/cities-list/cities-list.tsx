import type { CityName } from '../../types/types';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { setCity } from '../../store/action';

import CityItem from '../city-item/city-item';

import { cities } from '../../const';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);

  const handleCityClick = (name: CityName) => {
    dispatch(setCity(name));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => <CityItem key={city} name={city} onCityItemClick={handleCityClick} isActive={city === currentCity.name}/>)}
      </ul>
    </section>
  );
}

export default CitiesList;
