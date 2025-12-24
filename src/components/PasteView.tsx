import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPasteById } from '../services/pasteService';
import { Paste } from '../types/paste';
import './PasteView.css';

const PasteView = () => {
    const { id } = useParams<{ id: string }>();
    const [paste, setPaste] = useState<Paste | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPaste = async () => {
            if (!id) {
                setError('no paste id provided');
                setLoading(false);
                return;
            }

            try {
                const fetchedPaste = await fetchPasteById(id);
                setPaste(fetchedPaste);
            } catch (err) {
                console.error('error fetching paste:', err);
                setError('failed to fetch paste');
            } finally {
                setLoading(false);
            }
        };

        getPaste();
    }, [id]);

    if (loading) {
        return <div className="loading">loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!paste) {
        return <div className="notFound">paste not found</div>;
    }

    return (
        <div className="pasteView">
            <h1>paste details</h1>
            <div className="pasteId">id: {paste.id}</div>
            <pre className="pasteContent">{paste.content}</pre>
            <p className="pasteMetadata">
                created at: {new Date(paste.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default PasteView;