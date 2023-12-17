import React, { useContext } from 'react';
import { Item } from './types';
import { WorkspaceContext } from './workspace';
import Image from 'next/image';

interface PathViewProps {
  path: Item;
}

const PathView: React.FC<PathViewProps> = () => {
  const { currentItem } = useContext(WorkspaceContext);
  const allPath = [];
  console.log(currentItem);
  if (currentItem) {
    let pathfinder = currentItem;
    while (pathfinder.parent) {
      allPath.push(pathfinder.parent);
      pathfinder = pathfinder.parent;
    }
    allPath.reverse();
  }

  return (
    <div>
      {allPath.map((path) => (
        <span key={path.name}>
          {path.type === 'directory' && (
            <Image
              src='/folder.svg'
              alt='Folder logo'
              width={75}
              height={15}
              priority
            />
          )}
          {path.type === 'note' && (
            <Image
              src='/notes.svg'
              alt='notes logo'
              width={75}
              height={15}
              priority
            />
          )}

          {path.name}
          <Image
            src='/arrowforward.svg'
            alt='arrow forward'
            width={75}
            height={15}
            priority
          />
        </span>
      ))}

      <span>
        {currentItem?.type === 'directory' && (
          <Image
            src='/folder.svg'
            alt='Folder logo'
            width={75}
            height={15}
            priority
          />
        )}
        {currentItem?.type === 'note' && (
          <Image
            src='/notes.svg'
            alt='notes logo'
            width={75}
            height={15}
            priority
          />
        )}
        {currentItem?.name}
      </span>
    </div>
  );
};
export default PathView;
