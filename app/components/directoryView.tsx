import React, { useContext } from 'react';
import { Item } from './types';
import { WorkspaceContext } from './workspace';

import '../styles/directory.css';

interface DirectoryViewProps {
  directory: Item;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const { addNote, addDirectory, setCurrentItem, deleteDirectory } =
    useContext(WorkspaceContext);

  const handleAddNote = () => {
    const fileName = window.prompt('Enter the name of the new note:');
    if (fileName === null) return;
    const noteText = window.prompt('Enter the text of the new note:');
    if (noteText === null) return;
    addNote(fileName, noteText);
  };

  const handleAddDirectory = () => {
    const dirName = window.prompt('Enter the name of the new directory:');
    if (dirName === null) return;
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
      for (let i = 0; i < checked.length; i++) {
        result.set(checked[i].getAttribute('value'), 1);
      }

      console.log(result);
      if (result === null) return;
      deleteDirectory(result);
    }
  };

  return (
    <div>
      <button onClick={handleAddNote}>New Note</button>
      <button onClick={handleAddDirectory}>New Directory</button>
      <button onClick={handleDeletion}>Delete</button>
      <table className='dirSection'>
        <tbody>
          {directory.items?.map((childItem, index) => (
            <tr className='dirItem' key={index}>
              <td>
                <input
                  type='checkbox'
                  name={childItem.name}
                  value={childItem.name}
                ></input>
              </td>
              <td onClick={() => handleItemClick(childItem)}>
                {childItem.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryView;
