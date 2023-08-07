import React from 'react';
import { HOME, ACCOUNT, SETTINGS,SUPPORT, LOGOUT} from '../../assets/Images';
import './VerticalBar.css';

const VerticalBar = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="vertical-bar">
      <div
        className={`verticalLOGO1 ${selectedOption === 'history' ? 'active' : ''}`}
        onClick={() => onSelectOption('history')}
      > 
        {/* Replace with your history logo */}
        <img src={HOME} alt="Home Logo"/>
        Home
      </div>
      
      <div
        className={`verticalLOGO2 ${selectedOption === 'history' ? 'active' : ''}`}
        onClick={() => onSelectOption('history')}
      > 
        {/* Replace with your history logo */}
        <img src={ACCOUNT} alt="User Logo"/>
        Account
      </div>
      <div
        className={`verticalLOGO3 ${selectedOption === 'history' ? 'active' : ''}`}
        onClick={() => onSelectOption('history')}
      > 
        {/* Replace with your history logo */}
        <img src={SETTINGS} alt="User Logo"/>
        Settings
      </div>
      <div
        className={`verticalLOGO4 ${selectedOption === 'history' ? 'active' : ''}`}
        onClick={() => onSelectOption('history')}
      > 
        {/* Replace with your history logo */}
        <img src={SUPPORT} alt="User Logo"/>
        Support
      </div>
      <div
        className={`verticalLOGO5 ${selectedOption === 'history' ? 'active' : ''}`}
        onClick={() => onSelectOption('history')}
      > 
        {/* Replace with your history logo */}
        <img src={LOGOUT} alt="User Logo"/>
        Logout
      </div>

    </div>

  );
};

export default VerticalBar;
