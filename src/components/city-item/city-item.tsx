import { CityName } from '../../types/types';

type cityItemProps = {
  city: CityName;
  isActive: boolean;
  onCityItemClick: (city: CityName) => void;
}

function CityItem({city, isActive, onCityItemClick}: cityItemProps): JSX.Element {
  const itemClass = `locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`;

  const handleCityItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onCityItemClick(city);
  };

  return (
    <li className="locations__item">
      <a className={itemClass} href="#/" onClick={handleCityItemClick}>
        <span>{city}</span>
      </a>
    </li>
  );
}

export default CityItem;
