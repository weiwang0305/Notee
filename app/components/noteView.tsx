import React, { useState, useContext } from 'react';
import { Item } from './types';
import { WorkspaceContext } from './workspace';

interface NoteViewProps {
    note: Item;
}

const NoteView: React.FC<NoteViewProps> = ({ note }) => {
    const { updateNote } = useContext(WorkspaceContext);
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(note.note);

    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleNoteSubmit = () => {
        if (text == null) {
            alert('Cannot save empty note.');
            return
        }
        
        updateNote(text);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={text}
                        onChange={handleNoteChange}
                    />
                    <button onClick={handleNoteSubmit}>Save</button>
                </div>
            ) : (
                <div onClick={() => setIsEditing(true)}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default NoteView;
