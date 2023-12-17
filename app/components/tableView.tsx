import Image from 'next/image';
import RenameBox from './renameBox';
import { Item } from './types';
import { useState, useContext, MouseEvent } from 'react';
import { WorkspaceContext } from './workspace';

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
  const { selectedBoxes, setSelectedBoxes, updateName } =
    useContext(WorkspaceContext);

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isSelected = event.target.checked;
    let value = event.target.value;
    console.log(event.target.value);
    console.log(selectedBoxes);
    if (isSelected) {
      setSelectedBoxes((prevItem: string[]) => [...prevItem, value]);
    } else {
      setSelectedBoxes((prevItem: string[]) => {
        return prevItem.filter((name: string) => name !== value);
      });
    }
  };

  return (
    <tr className='dirItem' key={index}>
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
            width={100}
            height={24}
            priority
          />
        )}
        {childItem.type === 'note' && (
          <Image
            src='/notes.svg'
            alt='notes logo'
            width={100}
            height={24}
            priority
          />
        )}
      </td>

      {!isRenaming && (
        <td onClick={() => handleItemClick(childItem)}>{childItem.name} </td>
      )}
      {isRenaming && (
        <td>
          <RenameBox
            handleNameSubmit={handleNameSubmit}
            name={childItem.name}
          />
        </td>
      )}
      {/* <td>
        {isRenaming && (
          <RenameBox name={childItem.name} setIsRenaming={setIsRenaming} />
        )}
      </td> */}
    </tr>
  );
};
export default TableView;
