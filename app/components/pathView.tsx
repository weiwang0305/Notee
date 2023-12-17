import React, { useContext } from 'react';
import { Item } from './types';
import { WorkspaceContext } from './workspace';
import Image from 'next/image';

import '../styles/path.css';

interface PathViewProps {
  path: Item;
}

const PathView: React.FC<PathViewProps> = () => {
  const { currentItem } = useContext(WorkspaceContext);

  //creating an array to store all the paths
  const allPath = [];

  //If currentItem exist we will continue to go through the node until currentItem.parent doesn't exist
  if (currentItem) {
    let pathfinder = currentItem;
    while (pathfinder.parent) {
      allPath.push(pathfinder.parent);
      pathfinder = pathfinder.parent;
    }
    //reversing because when rendering, it actually prepends each element of the array in the front.
    allPath.reverse();
  }

  return (
    <div className='pathContainer'>
      {allPath.map((path) => (
        <div className='pathBox' key={path.name}>
          {path.type === 'directory' && (
            <Image
              src='/folder.svg'
              alt='Folder logo'
              width={20}
              height={15}
              priority
            />
          )}
          {path.type === 'note' && (
            <Image
              src='/notes.svg'
              alt='notes logo'
              width={20}
              height={15}
              priority
            />
          )}

          {path.name}
          <Image
            src='/arrowforward.svg'
            alt='arrow forward'
            width={20}
            height={15}
            priority
          />
        </div>
      ))}

      <div className='currentDirectory'>
        {currentItem?.type === 'directory' && (
          <Image
            src='/folder.svg'
            alt='Folder logo'
            width={20}
            height={15}
            priority
          />
        )}
        {currentItem?.type === 'note' && (
          <Image
            src='/notes.svg'
            alt='notes logo'
            width={20}
            height={15}
            priority
          />
        )}
        {currentItem?.name}
      </div>
    </div>
  );
};
export default PathView;
