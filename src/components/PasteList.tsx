import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPastes } from '../services/pasteService';
import { Paste } from '../types/paste';
import './PasteList.css';

const PasteList = () => {
    const [pastes, setPastes] = useState<Paste[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPastes = async () => {
            try {
                const data = await fetchPastes();
                setPastes(data || []);
            } catch (error) {
                console.error('error fetching pastes:', error);
                setError('failed to load pastes');
            } finally {
                setLoading(false);
            }
        };

        getPastes();
    }, []);

    if (loading) {
        return <div className="loading">loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (pastes.length === 0) {
        return <div className="pasteList">no pastes yet. create one!</div>;
    }

    return (
        <div className="pasteList">
            <h2>all pastes</h2>
            <ul>
                {pastes.map(paste => (
                    <li key={paste.id} className="pasteItem">
                        <Link to={`/paste/${paste.id}`} className="pasteLink">
                            {paste.content.substring(0, 100)}
                            {paste.content.length > 100 ? '...' : ''}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasteList;