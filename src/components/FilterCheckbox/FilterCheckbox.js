import './FilterCheckbox.css'

function FilterCheckbox() {
  return (
    <label className="toggle">
      <input className="toggle__checkbox" type="checkbox" />
      <svg className="toggle__switch" xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" fill="none">
        <rect className="toggle__switch-bg" width="36" height="20" rx="10" fill="#343434"/>
        <rect className="toggle__knob-inner" width="16" height="16" rx="8" x="2" y="2" fill="#e4e4e4"/>
        <rect className="toggle__knob-outer" width="15" height="15" rx="7.5" x="2.5" y="2.5" stroke="white"/>
      </svg>
      <span className="toggle__label">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
