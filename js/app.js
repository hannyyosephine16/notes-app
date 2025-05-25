// Main App Initialization

// Register all custom elements
customElements.define('app-header', AppHeader);
customElements.define('note-form', NoteForm);
customElements.define('notes-list', NotesList);
customElements.define('note-item', NoteItem);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Aplikasi Catatan berhasil dimuat!');
    console.log('Initial data:', getInitialData().length, 'notes');
    
    // Force update notes lists after a short delay to ensure all components are loaded
    setTimeout(() => {
        console.log('Forcing initial render of notes');
        
        const activeNotesList = document.getElementById('active-notes');
        const archivedNotesList = document.getElementById('archived-notes');
        
        if (activeNotesList) {
            console.log('Updating active notes list');
            activeNotesList.updateNotes();
        } else {
            console.warn('active-notes element not found!');
        }
        
        if (archivedNotesList) {
            console.log('Updating archived notes list');
            archivedNotesList.updateNotes();
        } else {
            console.warn('archived-notes element not found!');
        }
        
        // Log all notes-list elements to check if they exist
        console.log('Notes list elements found:', document.querySelectorAll('notes-list').length);
    }, 300); // Longer delay to ensure everything is initialized

    // Set up global event listeners
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('app-header .search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('app-header .search-input');
            if (searchInput && searchInput === document.activeElement) {
                searchInput.value = '';
                NotesState.setSearchQuery('');
                searchInput.blur();
            }
        }
    });

    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});