// Notes List Component
class NotesList extends HTMLElement {
    constructor() {
        super();
        this.listType = this.getAttribute('list-type');
        console.log(`NotesList constructed with type: ${this.listType}`);
        this.render();
    }

    connectedCallback() {
        console.log(`NotesList connected to DOM with type: ${this.listType}`);
        // Panggil updateNotes() segera setelah elemen terhubung ke DOM
        setTimeout(() => this.updateNotes(), 0);
    }

    render() {
        this.innerHTML = `
            <style>
                .notes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 25px;
                    width: 100%;
                }
                
                .empty-message {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.1rem;
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    grid-column: 1 / -1;
                }
                
                @media (max-width: 768px) {
                    .notes-grid {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }
                }
            </style>
            <div class="notes-grid">
                <div class="empty-message">Memuat catatan...</div>
            </div>
        `;
        
        this.notesGrid = this.querySelector('.notes-grid');
    }
    
    updateNotes() {
        console.log(`Updating notes for ${this.listType} list`);
        
        // Dapatkan catatan yang difilter
        const isArchived = this.listType === 'archived';
        const filteredNotes = NotesState.getFilteredNotes(isArchived);
        
        console.log(`Found ${filteredNotes.length} notes for ${this.listType} list`);
        
        // Bersihkan grid
        this.notesGrid.innerHTML = '';
        
        if (filteredNotes.length === 0) {
            // Tampilkan pesan kosong jika tidak ada catatan
            this.notesGrid.innerHTML = `<div class="empty-message">Tidak ada catatan ${this.listType === 'archived' ? 'arsip' : 'aktif'} 📝</div>`;
            console.log(`No notes found for ${this.listType} list, showing empty message`);
        } else {
            // Buat dan tambahkan elemen note-item untuk setiap catatan
            filteredNotes.forEach((note, index) => {
                console.log(`Rendering note ${index+1}/${filteredNotes.length}: ${note.id} - ${note.title}`);
                
                const noteItem = document.createElement('note-item');
                noteItem.setAttribute('note-id', note.id);
                noteItem.setAttribute('note-title', escapeHtml(note.title || ''));
                noteItem.setAttribute('note-body', escapeHtml(note.body || ''));
                noteItem.setAttribute('note-date', note.createdAt);
                noteItem.setAttribute('note-archived', String(note.archived));
                
                this.notesGrid.appendChild(noteItem);
            });
            
            console.log(`Rendered ${filteredNotes.length} notes for ${this.listType} list`);
        }
    }

    // Handle attribute changes
    static get observedAttributes() {
        return ['list-type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
        if (name === 'list-type') {
            this.listType = newValue;
            this.updateNotes();
        }
    }
}