// Global state management

// State aplikasi - Inisialisasi dengan data dari data.js
let notes = getInitialData();
let searchQuery = '';

console.log('Data loaded:', notes.length, 'notes');

// State management functions
const NotesState = {
    // Get all notes
    getAllNotes() {
        return notes;
    },

    // Get filtered notes based on archive status and search query
    getFilteredNotes(isArchived = false) {
        const filtered = notes.filter(note => {
            const matchesArchiveStatus = note.archived === isArchived;
            const matchesSearch = searchQuery === '' || 
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.body.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesArchiveStatus && matchesSearch;
        });
        
        console.log(`Found ${filtered.length} ${isArchived ? 'archived' : 'active'} notes`);
        return filtered;
    },

    // Add new note
    addNote(noteData) {
        const newNote = {
            id: `notes-${generateId()}`,
            title: noteData.title.trim(),
            body: noteData.body.trim(),
            createdAt: new Date().toISOString(),
            archived: false
        };
        
        notes.push(newNote);
        this.notifyStateChange();
        console.log('Note added, total notes:', notes.length);
        return newNote;
    },

    // Delete note by ID
    deleteNote(id) {
        notes = notes.filter(note => note.id !== id);
        this.notifyStateChange();
        console.log('Note deleted, ID:', id);
    },

    // Toggle archive status of a note
    toggleArchive(id) {
        notes = notes.map(note => 
            note.id === id 
                ? { ...note, archived: !note.archived }
                : note
        );
        this.notifyStateChange();
        console.log('Note archive toggled, ID:', id);
    },

    // Update search query
    setSearchQuery(query) {
        searchQuery = query;
        this.notifyStateChange();
        console.log('Search query updated:', query);
    },

    // Get current search query
    getSearchQuery() {
        return searchQuery;
    },

    // Notify all components about state change
    notifyStateChange() {
        console.log('State changed, updating components');
        
        // Update notes lists
        const activeNotesList = document.getElementById('active-notes');
        const archivedNotesList = document.getElementById('archived-notes');
        
        if (activeNotesList) {
            console.log('Updating active notes list');
            activeNotesList.updateNotes();
        } else {
            console.warn('Active notes list element not found!');
        }
        
        if (archivedNotesList) {
            console.log('Updating archived notes list');
            archivedNotesList.updateNotes();
        } else {
            console.warn('Archived notes list element not found!');
        }
    }
};