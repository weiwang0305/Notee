import Image from 'next/image';
import RenameBox from './renameBox';
import { Item } from './types';
import { useState, useContext, MouseEvent } from 'react';
import { WorkspaceContext } from './workspace';

import '../styles/table.css';

interface TableViewProps {
  childItem: Item;
  index: number;
  handleItemClick: (item: Item) => void;
  isRenaming: boolean;
  setIsRenaming: (bool: boolean) => void;
  handleNameSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TableView: React.FC<TableViewProps> = ({
  childItem,
  index,
  handleItemClick,
  isRenaming,
  handleNameSubmit,
}) => {
  const { selectedBoxes, setSelectedBoxes } = useContext(WorkspaceContext);

  //When a checkbox is checked, it will be added into the selectedBoxes state in the workspace.tsx, if not, it will be filtered out
  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isSelected = event.target.checked;
    let value = event.target.value;
    if (isSelected) {
      setSelectedBoxes((prevItem: string[]) => [...prevItem, value]);
    } else {
      setSelectedBoxes((prevItem: string[]) => {
        return prevItem.filter((name: string) => name !== value);
      });
    }
  };

  return (
    <tr key={index}>
      <td>
        {!isRenaming && (
          <input
            type='checkbox'
            value={childItem.name}
            checked={selectedBoxes?.includes(childItem.name)}
            onChange={checkboxHandler}
          ></input>
        )}
      </td>
      <td>
        {childItem.type === 'directory' && (
          <Image
            src='/folder.svg'
            alt='Folder logo'
            width={25}
            height={24}
            priority
          />
        )}
        {childItem.type === 'note' && (
          <Image
            src='/notes.svg'
            alt='notes logo'
            width={25}
            height={24}
            priority
          />
        )}
      </td>

      {!isRenaming && (
        <td className='dirItem' onClick={() => handleItemClick(childItem)}>
          {childItem.name}{' '}
        </td>
      )}
      {isRenaming && (
        <td>
          <RenameBox
            handleNameSubmit={handleNameSubmit}
            name={childItem.name}
          />
        </td>
      )}
    </tr>
  );
};
export default TableView;
