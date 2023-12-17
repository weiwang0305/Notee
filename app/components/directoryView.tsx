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

  //State for Renaming files
  const [isRenaming, setIsRenaming] = useState(false);

  // Adding notes
  const handleAddNote = () => {
    const fileName = window.prompt('Enter the name of the new note:');

    //Checking to see if the fileName already exists
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

  //Adding Directory
  const handleAddDirectory = () => {
    const dirName = window.prompt('Enter the name of the new directory:');

    //Checking to see if the directory name exists
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

  //Clicking on Item div to either go into directory or note
  const handleItemClick = (item: Item) => {
    setCurrentItem(item);
  };

  //Deleting directory or file
  const handleDeletion = () => {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checked.length === 0) {
      alert('You have not deleted any files to delete');
      return;
    }
    const confirmation = confirm('Want to delete?');

    //Asking for confirmation to delete
    if (!confirmation) {
      return;
    } else {
      //Using a hashmap to store all the fileNames that has been checked off.
      //Hashmap can help speed up lookups
      const result = new Map();
      for (let i = 0; i < checked.length; i++) {
        result.set(checked[i].getAttribute('value'), 1);
      }

      if (result === null) return;
      deleteDirectory(result);
    }
  };

  //Handles the submit button when renaming files
  const handleNameSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    //Creating an array of all the files names in order
    const result: string[] = [];
    const inputBoxes: NodeListOf<HTMLFormElement> =
      document.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputBoxes.length; i++) {
      result.push(inputBoxes[i].value);
    }
    updateName(result);
    setIsRenaming(false);
  };

  return (
    <div>
      {!isRenaming && (
        <div>
          <button className='button' onClick={handleAddNote}>
            New Note
          </button>
          <button className='button' onClick={handleAddDirectory}>
            New Directory
          </button>
          <button className='button' onClick={handleDeletion}>
            Delete
          </button>
        </div>
      )}
      <button
        className='button'
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
      {isRenaming && (
        <button className='button' onClick={handleNameSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default DirectoryView;
