import React, { useState, useContext, useCallback } from 'react';
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
      {currentItem && <PathView />}
      <h2>Current Item: {item.name}</h2>
      <h3>Type: {item.type}</h3>
      <div className='item'>
        {item.parent != null && (
          <button onClick={goToEnclosingFolder}>Previous Directory</button>
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
  updateName: (newName: string, originalName: string) => void;
}

export const WorkspaceContext = React.createContext<WorkspaceContextProps>({
  currentItem: null,
  setCurrentItem: (item: Item) => {},
  addNote: (fileName: string, noteText: string) => {},
  addDirectory: (newDirName: string) => {},
  updateNote: (newText: string) => {},
  deleteDirectory: (result: Map<string, number>) => {},
  updateName: (newName: string, originalName: string) => {},
});

export function Workspace() {
  const [currentItem, setCurrentItem] = useState<Item>({
    name: 'root',
    type: 'directory',
    items: [],
  });

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

  const updateNote = useCallback((newText: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (prevItem.type === 'note') {
        newItem.note = newText;
      }
      return newItem;
    });
  }, []);

  const deleteDirectory = useCallback((result: Map<string, number>) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      newItem.items = newItem.items
        ? newItem.items.filter((item) => !result.has(item.name))
        : undefined;
      return newItem;
    });
  }, []);

  const updateName = useCallback((newName: string, originalName: string) => {
    setCurrentItem((prevItem) => {
      const newItem = _.cloneDeep(prevItem);
      if (newItem.items) {
        for (let i = 0; i < newItem.items.length; i++) {
          if (newItem.items[i].name === originalName) {
            newItem.items[i].name = newName;
          }
        }
      }
      sortItems(newItem);
      return newItem;
    });
  }, []);

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

  // const sortItems = (newItem: Item) => {
  //   if(newItem.items < 2) {
  //     return newItem.items
  //   }
  //   const mid = Math.floor(newItem.items.length / 2)
  //   const leftArray = newItem.items.slice(0,mid)
  //   const rightArray = newItem.items.slice(mid)
  //   return merge(mergeSort(leftArray), mergeSort(rightArray))
  // }
  // const merge = (leftArray,rightArray) => {
  //   const sortedArray = []
  //   while(leftArray.length && rightArray.length){
  //     if(leftArray[0])
  //   }
  // }

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
        }}
      >
        <ItemView {...currentItem} />
      </WorkspaceContext.Provider>
    </div>
  );
}
