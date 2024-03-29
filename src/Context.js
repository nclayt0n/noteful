import React from 'react'


export default React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    handleClickDelete: () => {},
    addNote: () => {},
    addFolder: () => {},
    deleteFolder: () => {},
    updateFolder: () => {},
    updateNote: () => {},
})