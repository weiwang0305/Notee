import { useState, useContext } from 'react';
import { WorkspaceContext } from './workspace';

const RenameBox = ({
  name,
  setIsRenaming,
}: {
  name: string;
  setIsRenaming: (bool: boolean) => void;
}) => {
  const { updateName } = useContext(WorkspaceContext);
  const [text, setText] = useState(name);
  const originalName = name;
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleNameSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateName(text, originalName);
      setIsRenaming(false);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={handleNameChange}
        onKeyDown={handleNameSubmit}
      ></input>
    </div>
  );
};
export default RenameBox;
