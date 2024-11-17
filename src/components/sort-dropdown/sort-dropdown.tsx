import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';
import { setActiveSortType } from '../../store/action';
import { SortTypes } from '../../const';
import type { SortType } from '../../types/types';
function SortDropdown(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSortType = useAppSelector((state) => state.activeSortType);
  const [isOpen, setIsOpen] = useState(false);

  const sortItemHandleClick = (sortType: SortType) => {
    setIsOpen(false);
    dispatch(setActiveSortType(sortType));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by &nbsp;</span>

      <span className="places__sorting-type" onClick={() => setIsOpen(!isOpen)} tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SortTypes.map((sortType) => (
          <li className={`places__option ${activeSortType === sortType ? 'places__option--active' : ''}`} key={sortType} onClick={() => sortItemHandleClick(sortType)} tabIndex={0}>
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortDropdown;

{/* <li className={`places__option ${activeSortType === 'Popular' ? 'places__option--active' : ''}`} tabIndex={0}>Popular</li>
<li className={`places__option ${activeSortType === 'Price: low to high' ? 'places__option--active' : ''}`} tabIndex={0}>Price: low to high</li>
<li className={`places__option ${activeSortType === 'Price: high to low' ? 'places__option--active' : ''}`} tabIndex={0}>Price: high to low</li>
<li className={`places__option ${activeSortType === 'Top rated first' ? 'places__option--active' : ''}`} tabIndex={0}>Top rated first</li> */}
