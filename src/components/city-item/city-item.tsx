import { CityName } from '../../types/types';

type cityItemProps = {
  name: CityName;
  isActive: boolean;
  onCityItemClick: (name: CityName) => void;
}

function CityItem({name, isActive, onCityItemClick}: cityItemProps): JSX.Element {
  const anchorElementClass = `locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`;

  const handleCityItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    onCityItemClick(name);
  };

  return (
    <li className="locations__item">
      <a className={anchorElementClass} href="#/" onClick={handleCityItemClick}>
        <span>{name}</span>
      </a>
    </li>
  );
}

export default CityItem;
