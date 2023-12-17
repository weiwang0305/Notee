import { useState, MouseEvent } from 'react';

const RenameBox = ({
  name,
}: {
  handleNameSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  name: string;
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoxText(event.target.value);
  };
  //State for text for each Rename Box Component
  const [boxText, setBoxText] = useState(name);

  return (
    <div>
      <input type='text' value={boxText} onChange={handleNameChange}></input>
    </div>
  );
};
export default RenameBox;
