// --- State Management ---
const state = {
    view: 'general', // ID of current view (category ID, or 'favorites', 'custom', 'tools')
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('it_ready_favs')) || [],
    customPhrases: JSON.parse(localStorage.getItem('it_ready_custom')) || [],
    darkMode: localStorage.getItem('it_ready_dark') === 'true',
    callFlowStates: JSON.parse(localStorage.getItem('it_ready_callflow_states')) || {}
};

// --- DOM Elements ---
const categoriesNav = document.getElementById('categories-nav');
const contentGrid = document.getElementById('content-grid');
const toolsContainer = document.getElementById('tools-container');
const currentViewTitle = document.getElementById('current-view-title');
const navItems = document.querySelectorAll('.nav-item');
const searchInputs = [document.getElementById('search-input-desktop'), document.getElementById('search-input-mobile')];
const themeToggleBtn = document.getElementById('theme-toggle');

// Modals
const addModal = document.getElementById('form-modal');
const readModal = document.getElementById('read-modal');
const readModeContent = document.getElementById('read-mode-content');
const dynamicFabBtn = document.getElementById('dynamic-fab-btn');
const fabIcon = document.getElementById('fab-icon');
const globalQuickNotesModal = document.getElementById('quick-notes-modal');
const globalQuickNotesTextarea = document.getElementById('global-quick-notes');

// --- Initialization ---
function init() {
    renderCategoriesNav();
    applyTheme();
    setupEventListeners();
    renderView();
}

// --- Setup Event Listeners ---
function setupEventListeners() {
    // Nav Navigation (Unified)
    const handleNavClick = (e) => {
        const item = e.target.closest('.nav-item');
        if (item) {
            setView(item.dataset.view);
        }
    };
    categoriesNav.addEventListener('click', handleNavClick);
    document.getElementById('extra-nav').addEventListener('click', handleNavClick);

    // Search
    searchInputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            // Sync both inputs
            searchInputs.forEach(i => { if (i) i.value = state.searchQuery; });
            renderView();
        });
    });

    // Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('it_ready_dark', state.darkMode);
            applyTheme();
        });
    }

    // Modal behavior
    dynamicFabBtn.addEventListener('click', handleFabClick);
    document.getElementById('close-form-btn').addEventListener('click', closeAddModal);
    document.getElementById('cancel-form-btn').addEventListener('click', closeAddModal);
    document.getElementById('save-form-btn').addEventListener('click', saveCustomPhrase);
    
    document.getElementById('close-read-btn').addEventListener('click', () => {
        readModal.classList.remove('active');
    });

    // Add Phrase Modal Background Click
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) closeAddModal();
    });
    readModal.addEventListener('click', (e) => {
        if (e.target === readModal) readModal.classList.remove('active');
    });
    
    // Quick Notes Modal Background Click
    globalQuickNotesModal.addEventListener('click', (e) => {
        if (e.target === globalQuickNotesModal) globalQuickNotesModal.classList.remove('active');
    });

    // Quick Notes Modal
    document.getElementById('close-quick-notes-btn').addEventListener('click', () => globalQuickNotesModal.classList.remove('active'));
    document.getElementById('save-notes-btn').addEventListener('click', () => globalQuickNotesModal.classList.remove('active'));
    document.getElementById('reset-notes-btn').addEventListener('click', () => {
        if (confirm('Clear all quick notes?')) {
            globalQuickNotesTextarea.value = '';
            localStorage.setItem('it_ready_quick_notes', '');
        }
    });
    globalQuickNotesTextarea.addEventListener('input', (e) => {
        localStorage.setItem('it_ready_quick_notes', e.target.value);
    });

    // Card delegation (Copy, Read, Fav, Delete)
    contentGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-icon');
        if (!btn) return;

        const card = btn.closest('.card');
        const phraseId = card.dataset.id;
        const action = btn.dataset.action;

        const phraseText = card.querySelector('.card-text').textContent;

        if (action === 'copy') {
            navigator.clipboard.writeText(phraseText).then(showToast);
        } else if (action === 'read') {
            readModeContent.textContent = phraseText;
            readModal.classList.add('active');
        } else if (action === 'fav') {
            toggleFavorite(phraseId);
        } else if (action === 'delete') {
            deleteCustomPhrase(phraseId);
        } else if (action === 'edit') {
            openAddModal(phraseId);
        }
    });
}

// --- Data Operations ---
function getAllPhrases() {
    return [...defaultPhrases, ...state.customPhrases];
}

function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);
    if (index === -1) {
        state.favorites.push(id);
    } else {
        state.favorites.splice(index, 1);
    }
    localStorage.setItem('it_ready_favs', JSON.stringify(state.favorites));
    renderView(); // re-render to update heart icon immediately
}

function saveCustomPhrase() {
    const idInput = document.getElementById('phrase-id').value;
    const catInput = document.getElementById('phrase-category').value;
    const textInput = document.getElementById('phrase-text').value.trim();

    if (!textInput) return;

    if (idInput) {
        // Edit
        const phrase = state.customPhrases.find(p => p.id === idInput);
        if (phrase) {
            phrase.category = catInput;
            phrase.text = textInput;
        }
    } else {
        // Add
        state.customPhrases.push({
            id: 'cst_' + Date.now(),
            category: catInput,
            text: textInput,
            tags: textInput.toLowerCase().split(' ').filter(w => w.length > 3)
        });
    }

    localStorage.setItem('it_ready_custom', JSON.stringify(state.customPhrases));
    closeAddModal();
    renderView();
}

function deleteCustomPhrase(id) {
    if (confirm('Are you sure you want to delete this custom phrase?')) {
        state.customPhrases = state.customPhrases.filter(p => p.id !== id);
        localStorage.setItem('it_ready_custom', JSON.stringify(state.customPhrases));
        // Remove from favorites if it was there
        state.favorites = state.favorites.filter(f => f !== id);
        localStorage.setItem('it_ready_favs', JSON.stringify(state.favorites));
        renderView();
    }
}

// --- Rendering ---
function applyTheme() {
    const themeIcon = document.getElementById('theme-icon');
    if (state.darkMode) {
        document.documentElement.style.setProperty('--bg-color', '#0f172a');
        document.documentElement.style.setProperty('--text-primary', '#f8fafc');
        document.documentElement.style.setProperty('--card-bg', 'rgba(30, 41, 59, 1)');
        document.documentElement.style.setProperty('--sidebar-bg', 'rgba(15, 23, 42, 1)');
        document.documentElement.style.setProperty('--border', 'rgba(51, 65, 85, 1)');
        document.documentElement.style.setProperty('--glass', 'rgba(15, 23, 42, 0.95)');
        if (themeIcon) themeIcon.className = 'ph ph-moon';
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f8fafc');
        document.documentElement.style.setProperty('--text-primary', '#0f172a');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 1)');
        document.documentElement.style.setProperty('--sidebar-bg', 'rgba(255, 255, 255, 1)');
        document.documentElement.style.setProperty('--border', 'rgba(226, 232, 240, 1)');
        document.documentElement.style.setProperty('--glass', 'rgba(255, 255, 255, 0.95)');
        if (themeIcon) themeIcon.className = 'ph ph-sun';
    }
}

function renderCategoriesNav() {
    categoriesNav.innerHTML = categories.map(cat => `
        <a class="nav-item ${state.view === cat.id ? 'active' : ''}" data-view="${cat.id}">
            <i class="ph ${cat.icon}"></i>
            <span class="desktop-only">${cat.label}</span>
        </a>
    `).join('');

    // Populate Category Select for Add Modal
    const select = document.getElementById('phrase-category');
    select.innerHTML = categories.map(cat => `<option value="${cat.id}">${cat.label}</option>`).join('');
}

function updateNavActiveState() {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.view === state.view);
    });
}

function setView(viewId) {
    state.view = viewId;
    state.searchQuery = '';
    searchInputs.forEach(i => { if(i) i.value = ''; });
    updateNavActiveState();
    
    if (viewId === 'tools') {
        currentViewTitle.textContent = 'Support Tools';
    } else if (viewId === 'favorites') {
        currentViewTitle.textContent = 'Favorites';
    } else if (viewId === 'custom') {
        currentViewTitle.textContent = 'Personal Phrases';
    } else {
        const cat = categories.find(c => c.id === viewId);
        currentViewTitle.textContent = cat ? cat.label : 'Phrases';
    }
    
    renderView();
}
function renderView() {

    if (state.view === 'tools' && !state.searchQuery) {
        contentGrid.style.display = 'none';
        toolsContainer.style.display = 'block';
        renderTools();
        dynamicFabBtn.style.display = 'flex';
        fabIcon.className = 'ph ph-note-pencil';
        dynamicFabBtn.title = 'Quick Notes';
        return;
    }

    contentGrid.style.display = 'grid';
    toolsContainer.style.display = 'none';
    dynamicFabBtn.style.display = 'flex';
    fabIcon.className = 'ph ph-note-pencil';
    dynamicFabBtn.title = 'Quick Notes';

    let phrasesToRender = getAllPhrases();

    if (state.searchQuery) {
        phrasesToRender = phrasesToRender.filter(p => {
            const matchText = p.text.toLowerCase().includes(state.searchQuery);
            const matchTag = p.tags && p.tags.some(t => t.toLowerCase().includes(state.searchQuery));
            return matchText || matchTag;
        });
        currentViewTitle.textContent = `Search results for "${state.searchQuery}"`;
    } else {
        if (state.view === 'favorites') {
            phrasesToRender = phrasesToRender.filter(p => state.favorites.includes(p.id));
        } else if (state.view === 'custom') {
            phrasesToRender = state.customPhrases;
        } else {
            phrasesToRender = phrasesToRender.filter(p => p.category === state.view);
        }
    }

    contentGrid.style.display = 'grid';
    
    const isCategory = categories.some(cat => cat.id === state.view);
    const callFlowHtml = (isCategory && !state.searchQuery) ? renderIntegratedCallFlow(state.view) : '';

    if (isCategory && !state.searchQuery) {
        contentGrid.innerHTML = callFlowHtml;
        contentGrid.className = 'portrait-scroll-area';
        contentGrid.style.display = 'block';
        return;
    }

    contentGrid.className = 'grid-list';
    if (phrasesToRender.length === 0) {
        contentGrid.innerHTML = callFlowHtml + `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="ph ph-empty"></i>
                <h3>No phrases found</h3>
                <p>Try a different category or search term.</p>
            </div>
        `;
        contentGrid.style.display = 'block';
        return;
    }
    
    contentGrid.style.display = 'grid';
    contentGrid.innerHTML = callFlowHtml + phrasesToRender.map(p => {
        const isFav = state.favorites.includes(p.id);
        const isCustom = p.id.startsWith('cst_');
        return `
            <div class="card" data-id="${p.id}">
                <div class="card-text">${p.text}</div>
                <div class="card-actions">
                    ${isCustom ? `
                        <button class="btn-icon" data-action="edit" title="Edit"><i class="ph ph-pencil-simple"></i></button>
                        <button class="btn-icon" data-action="delete" title="Delete"><i class="ph ph-trash"></i></button>
                    ` : ''}
                    <button class="btn-icon ${isFav ? 'active' : ''}" data-action="fav" title="Favorite">
                        <i class="ph ${isFav ? 'ph-star-fill' : 'ph-star'}"></i>
                    </button>
                    <button class="btn-icon" data-action="read" title="Read Mode">
                        <i class="ph ph-book-open-text"></i>
                    </button>
                    <button class="btn-icon" data-action="copy" title="Copy to clipboard">
                        <i class="ph ph-copy"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderTools() {
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">

            
            <div class="tool-column">
                <h3 style="margin-bottom: 16px; color: var(--text-secondary);">Command Line Reference</h3>
                ${supportTools.commands.map(cmdGrp => `
                    <div class="tool-section">
                        <div class="tool-header">
                            <i class="ph ${cmdGrp.icon}"></i> ${cmdGrp.platform}
                        </div>
                        <div>
                            ${cmdGrp.items.map(item => `
                                <div class="command-item" title="Click to copy" onclick="navigator.clipboard.writeText('${item.cmd}').then(showToast)" style="cursor:pointer;">
                                    <div>
                                        <div class="command-text">${item.cmd}</div>
                                        <div class="command-desc">${item.desc}</div>
                                    </div>
                                    <i class="ph ph-copy" style="color:var(--text-secondary);"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                
                <h3 style="margin-top: 24px; margin-bottom: 16px; color: var(--text-secondary);">Quick Diagnosis</h3>
                <div class="tool-section">
                    <ul style="padding-left: 20px; line-height: 1.6;">
                        ${supportTools.diagnosisQuestions.map(q => `<li style="margin-bottom: 8px;">${q}</li>`).join('')}
                    </ul>
                </div>

                <div class="tool-section" style="margin-top:24px;">
                    <div class="tool-header">
                        <i class="ph ph-note-pencil"></i> Session Notes
                    </div>
                    <textarea class="form-control" id="session-notes" placeholder="Client: \nIssue: \nSteps taken: \nResolution: " oninput="localStorage.setItem('it_ready_notes', this.value)">${localStorage.getItem('it_ready_notes') || ''}</textarea>
                </div>
            </div>
        </div>
    `;
    toolsContainer.innerHTML = html;
}


// --- Utils ---
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function openAddModal(editingId = null) {
    document.getElementById('phrase-id').value = '';
    document.getElementById('phrase-category').value = state.view !== 'tools' && state.view !== 'favorites' && state.view !== 'custom' ? state.view : 'general';
    document.getElementById('phrase-text').value = '';
    document.getElementById('form-title').textContent = 'Add Custom Phrase';

    if (typeof editingId === 'string') {
        const phrase = state.customPhrases.find(p => p.id === editingId);
        if (phrase) {
            document.getElementById('phrase-id').value = phrase.id;
            document.getElementById('phrase-category').value = phrase.category;
            document.getElementById('phrase-text').value = phrase.text;
            document.getElementById('form-title').textContent = 'Edit Phrase';
        }
    }
    
    addModal.classList.add('active');
    document.getElementById('phrase-text').focus();
}

function closeAddModal() {
    addModal.classList.remove('active');
}

function handleFabClick() {
    globalQuickNotesTextarea.value = localStorage.getItem('it_ready_quick_notes') || '';
    globalQuickNotesModal.classList.add('active');
}

function renderIntegratedCallFlow(categoryId) {
    const scripts = {
        'phone': 'I understand you are having trouble with your phone or VoIP line. "I understand how frustrating it is when your communication tools aren\'t working. Let\'s check your device status and connectivity right away."',
        'printer': '"I see you are having issues with your printer. I know how important it is to get those documents out. Let\'s verify the physical connections and see what\'s happening in the print queue."',
        'computer': '"I understand your computer is not performing as expected. A slow system can really hinder your work. We\'ll look into the system resources and recent updates to find the bottleneck."',
        'networking': '"I see your internet connection is unstable. Being offline is never ideal. Let\'s check your router and network configurations to get you back online."',
        'hardware': '"I understand a piece of hardware is malfunctioning. Let\'s verify the physical installation and drivers to see if we can get it responding again."',
        'software': '"I see you are having trouble with an application. Software errors can be tricky. Let\'s check for updates and license status to ensure everything is configured correctly."',
        'general': '"I\'m happy to help you with your IT-related inquiry. Let\'s start by narrowing down the problem so I can provide the best solution."'
    };

    const troubleshootingScriptsMap = {
        'phone': [
            'Could you please check if the VoIP power and Ethernet cables are securely plugged into the back of the phone?',
            'Can you verify if the device volume is turned up and that the mute button isn\'t active?',
            'Let\'s try testing the microphone on another application to see if the issue is software-specific.',
            'I\'d like you to restart the VoIP phone or softphone application now.',
            'I\'m checking your internet stability on my end; please let me know if you notice any other devices losing connection.'
        ],
        'printer': [
            'Please check the paper tray for any jams or if it\'s simply out of paper.',
            'Let\'s verify the ink or toner levels through the printer control panel.',
            'I\'d like you to restart the printer, and I will reset the print spooler on your computer.',
            'Could you double-check the USB or network cable connecting the printer to your device?',
            'I\'m going to clear any stuck print jobs from the queue now.'
        ],
        'computer': [
            'I\'d like you to perform a full power cycle by restarting your system now.',
            'Could you open Task Manager and tell me if you see any applications using a high percentage of CPU or RAM?',
            'I\'ll check for any pending OS or critical driver updates.',
            'I\'m going to run a quick scan for registry or system errors.',
            'Let\'s verify how much available disk space you have on your primary drive.'
        ],
        'networking': [
            'Could you please power cycle your router and modem by unplugging them for 30 seconds?',
            'I\'m going to flush your DNS and reset your IP configuration now.',
            'Is it possible to test the connection on a different device to see if the issue is isolated?',
            'I\'ll check the ISP service status for your area to rule out an external outage.',
            'Let\'s verify if any firewall or proxy settings were recently changed.'
        ],
        'hardware': [
            'I\'d like you to reseat any external cables or components related to the device.',
            'I\'m checking the Device Manager now to see if there are any error icons listed.',
            'Let\'s run the built-in hardware diagnostic tool to check for component failure.',
            'Could you try plugging the device into a different port?',
            'I\'ll check for the latest driver updates for this specific component.'
        ],
        'software': [
            'Please check if there are any updates available within the application settings.',
            'I\'d like to try clearing the application\'s cache and temporary data.',
            'Let\'s re-verify your software license and login credentials.',
            'Try running the application as an Administrator to see if it resolves the issue.',
            'If the problem persists, we may need to reinstall the application files.'
        ]
    };

    const script = scripts[categoryId] || scripts['general'];
    const troubleshootingScripts = troubleshootingScriptsMap[categoryId] || troubleshootingScriptsMap['phone'];
    
    const steps = [
        {
            id: 'step1',
            title: 'Step 1: Opening & Verification',
            instruction: 'GREET THE CUSTOMER',
            bubbles: [
                'Hi! Thank you for calling Tech Support. My name is Cris, how can I help you today?',
                'I\'ve noted your symptoms. Before we proceed, may I verify your name and the device you are using?'
            ]
        },
        {
            id: 'step2',
            title: 'Step 2: Empathy & Clarification',
            instruction: 'SHOW EMPATHY & SET EXPECTATIONS',
            bubbles: [
                script,
                'To make sure I have this right: [Summarize the User\'s Issue]. Is that correct?'
            ]
        },
        {
            id: 'step3',
            title: 'Step 3: Troubleshooting (' + categoryId.toUpperCase() + ')',
            instruction: 'FOLLOW THE TROUBLESHOOTING SCRIPT',
            bubbles: troubleshootingScripts
        },
        {
            id: 'step4',
            title: 'Step 4: Closing',
            instruction: 'OFFER ADDITIONAL ASSISTANCE & SIGN-OFF',
            bubbles: [
                'I\'ve summarized the fix for your records. Is your issue fully resolved now?',
                'Is there anything else I can assist you with today?',
                'Thank you for calling Tech Support. Have a great day!',
                'Professional Sign-off: "Again, my name is Cris. Thank you for your time."'
            ]
        }
    ];

    return `
        <div class="portrait-container">
            <h2 style="text-align: center; margin-bottom: 32px; color: var(--accent);">
                <i class="ph ph-scroll"></i> Support Script: ${categoryId.toUpperCase()}
            </h2>
            ${steps.map((step, sIdx) => `
                <div class="script-card">
                    <div class="script-instruction">
                        <i class="ph ph-info"></i> ${step.instruction}
                    </div>
                    <div class="section-title">
                        <i class="ph ph-number-circle-${sIdx + 1}"></i> ${step.title.split(': ')[1]}
                    </div>
                    <div class="script-actions">
                        ${step.bubbles.map((bubble, bIdx) => {
                            const key = `${categoryId}-${sIdx}-${bIdx}`;
                            const isChecked = state.callFlowStates[key];
                            return `
                                <div class="script-checkbox-item ${isChecked ? 'checked' : ''}">
                                    <input type="checkbox" id="sc-chk-${categoryId}-${sIdx}-${bIdx}" 
                                        ${isChecked ? 'checked' : ''}
                                        onchange="toggleIntegratedCheck('${categoryId}', ${sIdx}, ${bIdx}, this.checked)">
                                    <label for="sc-chk-${categoryId}-${sIdx}-${bIdx}" class="script-bubble">
                                        ${bubble}
                                    </label>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button class="btn btn-secondary" onclick="resetIntegratedCallFlow('${categoryId}')">
                    <i class="ph ph-arrows-counter-clockwise"></i> Reset Script Guide
                </button>
            </div>
        </div>
    `;
}

function toggleIntegratedCheck(catId, sIdx, iIdx, isChecked) {
    const key = `${catId}-${sIdx}-${iIdx}`;
    if (isChecked) {
        state.callFlowStates[key] = true;
    } else {
        delete state.callFlowStates[key];
    }
    localStorage.setItem('it_ready_callflow_states', JSON.stringify(state.callFlowStates));
    
    const item = document.getElementById(`sc-chk-${catId}-${sIdx}-${iIdx}`).parentElement;
    if (item) {
        item.classList.toggle('checked', isChecked);
    }
}

function resetIntegratedCallFlow(catId) {
    if (confirm('Reset script guide for this category?')) {
        Object.keys(state.callFlowStates).forEach(key => {
            if (key.startsWith(catId + '-')) {
                delete state.callFlowStates[key];
            }
        });
        localStorage.setItem('it_ready_callflow_states', JSON.stringify(state.callFlowStates));
        renderView();
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);
