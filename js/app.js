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
    
    // Force update notes lists
    setTimeout(() => {
        console.log('Forcing initial render of notes');
        
        const activeNotesList = document.getElementById('active-notes');
        const archivedNotesList = document.getElementById('archived-notes');
        
        if (activeNotesList) {
            console.log('Found active-notes element, updating...');
            activeNotesList.updateNotes();
        } else {
            console.warn('active-notes element not found in DOM!');
            console.log('All note lists:', document.querySelectorAll('notes-list'));
        }
        
        if (archivedNotesList) {
            console.log('Found archived-notes element, updating...');
            archivedNotesList.updateNotes();
        } else {
            console.warn('archived-notes element not found in DOM!');
        }
    }, 100);

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
});