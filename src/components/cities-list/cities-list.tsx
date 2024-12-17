import type { CityName } from '../../types/types';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { setCity } from '../../store/app-process/app-process';

import CityItem from '../city-item/city-item';

import { cities } from '../../const';
import { getCity } from '../../store/app-process/selectors';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

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
