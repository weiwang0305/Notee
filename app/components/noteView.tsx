import React, { useState, useContext } from 'react';
import { Item } from './types';
import { WorkspaceContext } from './workspace';

import '../styles/note.css';

interface NoteViewProps {
  note: Item;
}

const NoteView: React.FC<NoteViewProps> = ({ note }) => {
  const { updateNote } = useContext(WorkspaceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.note);

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleNoteSubmit = () => {
    if (text == null) {
      alert('Cannot save empty note.');
      return;
    }

    updateNote(text);
    setIsEditing(false);
  };

  return (
    <div
      className='noteSection'
      onClick={() => {
        if (!isEditing) {
          setIsEditing(true);
        }
      }}
    >
      {isEditing ? (
        <div>
          <div>
            <textarea value={text} onChange={handleNoteChange} />
          </div>
          <div>
            <button onClick={handleNoteSubmit}>Save</button>
          </div>
        </div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};

export default NoteView;
