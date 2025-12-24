// this file contains functions for interacting with the backend API for pastes.

import axios from 'axios';
import { Paste } from '../types/paste';

// How to use something from .env instead
const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const createPaste = async (content: string): Promise<Paste> => {
    const response = await axios.post(`${apiUrl}/pastes`, { content });
    return response.data;
};

export const fetchPastes = async (): Promise<Paste[]> => {
    const response = await axios.get(`${apiUrl}/pastes`);
    return response.data;
};

export const fetchPasteById = async (id: string): Promise<Paste> => {
    const response = await axios.get(`${apiUrl}/paste`, {
        params: { id }
    });
    return response.data;
};

export const updatePaste = async (id: string, content: string): Promise<Paste> => {
    const response = await axios.put(`${apiUrl}/paste`, { content }, {
        params: { id }
    });
    return response.data;
};

export const deletePaste = async (id: string): Promise<void> => {
    await axios.delete(`${apiUrl}/paste`, {
        params: { id }
    });
};