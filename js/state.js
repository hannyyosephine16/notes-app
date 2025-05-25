// Global state management

// State aplikasi - Langsung gunakan data awal, tanpa localStorage untuk sekarang
let notes = getInitialData();
let searchQuery = '';

// Pastikan data dimuat
console.log('Initial notes loaded:', notes.length, 'items', notes);

// State management functions
const NotesState = {
    // Get all notes
    getAllNotes() {
        return notes;
    },

    // Get filtered notes based on archive status and search query
    getFilteredNotes(isArchived = false) {
        console.log(`Filtering notes with isArchived=${isArchived}, searchQuery="${searchQuery}"`);
        
        const filtered = notes.filter(note => {
            const matchesArchiveStatus = note.archived === isArchived;
            const matchesSearch = searchQuery === '' || 
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.body.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesArchiveStatus && matchesSearch;
        });
        
        console.log(`Found ${filtered.length} notes matching criteria`);
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
        
        notes = [...notes, newNote]; // Buat array baru untuk menjaga immutability
        this.notifyStateChange();
        
        console.log('Note added, total notes:', notes.length);
    },

    // Delete note by ID
    deleteNote(id) {
        notes = notes.filter(note => note.id !== id);
        this.notifyStateChange();
        
        console.log('Note deleted, ID:', id, 'total notes:', notes.length);
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
    },

    // Get current search query
    getSearchQuery() {
        return searchQuery;
    },

    // Notify all components about state change
    notifyStateChange() {
        console.log("State changed, updating components...");
        // Update notes lists
        const activeNotesList = document.getElementById('active-notes');
        const archivedNotesList = document.getElementById('archived-notes');
        
        if (activeNotesList) {
            console.log("Updating active notes list");
            activeNotesList.updateNotes();
        } else {
            console.warn("Active notes list element not found!");
        }
        
        if (archivedNotesList) {
            console.log("Updating archived notes list");
            archivedNotesList.updateNotes();
        } else {
            console.warn("Archived notes list element not found!");
        }
    }
};