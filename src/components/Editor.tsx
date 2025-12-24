import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPaste } from '../services/pasteService';
import './Editor.css';

const Editor = () => {
    const [pasteContent, setPasteContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPasteContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!pasteContent.trim()) {
            setError('paste content cannot be empty');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const paste = await createPaste(pasteContent);
            console.log('paste created:', paste);
            setPasteContent('');
            navigate(`/paste/${paste.id}`);
        } catch (err) {
            console.error('error creating paste:', err);
            setError('failed to create paste. please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="editorForm">
            <textarea
                value={pasteContent}
                onChange={handleInputChange}
                placeholder="write your paste here..."
                rows={15}
                className="editorTextarea"
                disabled={loading}
            />
            {error && <div className="errorMessage">{error}</div>}
            <button type="submit" className="submitButton" disabled={loading}>
                {loading ? 'submitting...' : 'submit paste'}
            </button>
        </form>
    );
};

export default Editor;