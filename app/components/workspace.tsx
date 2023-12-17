import React, { useState, useContext, useCallback, Dispatch } from 'react';
import { Item } from './types';
import NoteView from './noteView';
import DirectoryView from './directoryView';
import PathView from './pathView';

import _ from 'lodash';

import '../styles/workspace.css';

function ItemView(item: Item) {
  const { currentItem, setCurrentItem } = useContext(WorkspaceContext);

  const goToEnclosingFolder = useCallback(() => {
    if (item.parent == null) {
      alert('Cannot go to enclosing folder.');
      return;
    }

    setCurrentItem(item.parent);
  }, [item, setCurrentItem]);
  return (
    <div>
      <PathView path={item} />
      <div className='item'>
        {item.parent != null && (
          <button className='button' onClick={goToEnclosingFolder}>
            Previous Directory
          </button>
        )}
        {item.type == 'directory' && <DirectoryView directory={item} />}
        {item.type == 'note' && <NoteView note={item} />}
      </div>
    </div>
  );
}

interface WorkspaceContextProps {
  currentItem: Item | null;
  setCurrentItem: (item: Item) => void;
  addNote: (fileName: string, noteText: string) => void;
  addDirectory: (newDirName: string) => void;
  updateNote: (newText: string) => void;
  deleteDirectory: (result: Map<string, number>) => void;
  updateName: (newName: string[]) => void;
  selectedBoxes: string[] | null;
  setSelectedBoxes: (box: any) => void;
}

export const WorkspaceContext = React.createContext<WorkspaceContextProps>({
  currentItem: null,
  setCurrentItem: (item: Item) => {},
  addNote: (fileName: string, noteText: string) => {},
  addDirectory: (newDirName: string) => {},
  updateNote: (newText: string) => {},
  deleteDirectory: (result: Map<string, number>) => {},
  updateName: (newName: string[]) => {},
  selectedBoxes: [],
  setSelectedBoxes: (box: string[] | null) => {},
});

export function Workspace() {
  const [currentItem, setCurrentItem] = useState<Item>({
    name: 'root',
    type: 'directory',
    items: [],
  });

  //All of the boxes that have been selected in the tableview.tsx
  const [selectedBoxes, setSelectedBoxes] = useState<string[]>([]);

  //Adding notes
  const addNote = useCallback((fileName: string, noteText: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === 'directory') {
        const newNote: Item = {
          type: 'note',
          name: fileName,
          note: noteText,
          parent: newItem,
        };
        newItem.items = newItem.items ? [...newItem.items, newNote] : [newNote];
      }
      sortItems(newItem);
      return newItem;
    });
  }, []);

  //Adding directory
  const addDirectory = useCallback((newDirName: string) => {
    setCurrentItem((prevItem) => {
      // Deep clone the item
      const newItem = _.cloneDeep(prevItem);
      if (newItem.type === 'directory') {
        const newDir: Item = {
          type: 'directory',
          name: newDirName,
          items: [],
          parent: newItem,
        };
        newItem.items = newItem.items ? [...newItem.items, newDir] : [newDir];
      }
      sortItems(newItem);
      return newItem;
    });
  }, []);

  //Updates the notes
  const updateNote = useCallback((newText: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (prevItem.type === 'note') {
        newItem.note = newText;
      }
      return newItem;
    });
  }, []);

  //Deleting directory or file only keep the items if it doesn't exist in the hashmap keys
  const deleteDirectory = useCallback((result: Map<string, number>) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      newItem.items = newItem.items
        ? newItem.items.filter((item) => !result.has(item.name))
        : undefined;
      return newItem;
    });
    setSelectedBoxes([]);
  }, []);

  //Used in the rename function. Updates each of the names by looping through an array of updated names.
  const updateName = useCallback((newNames: string[]) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (newItem.items) {
        for (let i = 0; i < newItem.items.length; i++) {
          newItem.items[i].name = newNames[i];
        }
      }
      sortItems(newItem);
      return newItem;
    });
  }, []);

  //Sorting the Items by directory first and then comparing the names by alphabetical
  const sortItems = (newItem: Item) => {
    if (newItem.items) {
      newItem.items.sort((a, b) => {
        if (a.type === 'directory' && b.type !== 'directory') {
          return -1;
        } else if (a.type !== 'directory' && b.type === 'directory') {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div className='workspace'>
      <WorkspaceContext.Provider
        value={{
          currentItem,
          setCurrentItem,
          addNote,
          addDirectory,
          updateNote,
          deleteDirectory,
          updateName,
          selectedBoxes,
          setSelectedBoxes,
        }}
      >
        <ItemView {...currentItem} />
      </WorkspaceContext.Provider>
    </div>
  );
}
