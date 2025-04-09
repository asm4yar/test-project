import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const ListItem: React.FC<any> = ({ id, name, description, onClick, isactive }) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие
    onClick(id);
  };

  return (
    <li className={isactive ? 'list-item active' : 'list-item'}>
      <Link to={`/${id}`}>
        <div className={'list-item-actions'}>
          <div>ID: <b>{id}</b></div>
          <Button onClick={handleButtonClick} id={id} disabled={isactive}>
            {isactive ? 'Active' : 'Set Active'}
          </Button>
        </div>
        <div>{name}</div>
        <div className={'list-item__description'}>{description}</div>
      </Link>
    </li>
  );
};

export default ListItem;