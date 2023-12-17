import React, { useContext, useState, MouseEvent } from 'react';
import { Item } from './types';
import { WorkspaceContext } from './workspace';
import RenameBox from './renameBox';
import Image from 'next/image';

import '../styles/directory.css';
import TableView from './tableView';

interface DirectoryViewProps {
  directory: Item;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const {
    addNote,
    addDirectory,
    setCurrentItem,
    deleteDirectory,
    currentItem,
    updateName,
  } = useContext(WorkspaceContext);

  //State for renaming
  const [isRenaming, setIsRenaming] = useState(false);

  const handleAddNote = () => {
    const fileName = window.prompt('Enter the name of the new note:');
    if (fileName === null) {
      return;
    } else {
      console.log(currentItem);
      if (currentItem?.items) {
        for (let i = 0; i < currentItem.items.length; i++) {
          console.log(currentItem.items[i].name, fileName);
          if (currentItem.items[i].name === fileName) {
            alert('Name already exist');
            return;
          }
        }
      } else {
        return null;
      }
    }
    const noteText = window.prompt('Enter the text of the new note:');
    if (noteText === null) return;
    addNote(fileName, noteText);
  };

  const handleAddDirectory = () => {
    const dirName = window.prompt('Enter the name of the new directory:');
    if (dirName === null) {
      return;
    } else {
      if (currentItem?.items) {
        for (let i = 0; i < currentItem.items.length; i++) {
          if (currentItem.items[i].name === dirName) {
            alert('Name already exist');
            return;
          }
        }
      }
    }
    addDirectory(dirName);
  };

  const handleItemClick = (item: Item) => {
    setCurrentItem(item);
  };

  const handleDeletion = () => {
    const confirmation = confirm('Want to delete?');
    if (!confirmation) {
      return;
    } else {
      const result = new Map();
      const checked = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      console.log(checked);
      for (let i = 0; i < checked.length; i++) {
        result.set(checked[i].getAttribute('value'), 1);
      }

      console.log(result);
      if (result === null) return;
      deleteDirectory(result);
      for (let i = 0; i < checked.length; i++) {
        console.log('checks', checked[i]);
      }
    }
  };

  const handleNameSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(currentItem);
    const result: string[] = [];
    const inputBoxes: NodeListOf<HTMLFormElement> =
      document.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputBoxes.length; i++) {
      result.push(inputBoxes[i].value);
    }

    updateName(result);

    console.log(result);
    setIsRenaming(false);
  };

  return (
    <div>
      {!isRenaming && (
        <div>
          <button onClick={handleAddNote}>New Note</button>
          <button onClick={handleAddDirectory}>New Directory</button>
          <button onClick={handleDeletion}>Delete</button>
        </div>
      )}
      <button
        onClick={() => {
          if (
            currentItem &&
            currentItem.items &&
            currentItem.items.length > 0 &&
            currentItem.items != undefined &&
            !isRenaming
          ) {
            setIsRenaming(true);
          }
        }}
      >
        Rename
      </button>

      <table className='dirSection'>
        <tbody>
          {directory.items?.map((childItem, index) => (
            <TableView
              childItem={childItem}
              index={index}
              key={index}
              handleItemClick={handleItemClick}
              isRenaming={isRenaming}
              setIsRenaming={setIsRenaming}
              handleNameSubmit={handleNameSubmit}
            />
          ))}
        </tbody>
      </table>
      {isRenaming && <button onClick={handleNameSubmit}>Submit</button>}
    </div>
  );
};

export default DirectoryView;
