// --- State Management ---
const state = {
    view: 'modules', // Default to modules study guide
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('it_ready_favs')) || [],
    customPhrases: JSON.parse(localStorage.getItem('it_ready_custom')) || [],
    darkMode: localStorage.getItem('it_ready_dark') === 'true',
    callFlowStates: JSON.parse(localStorage.getItem('it_ready_callflow_states')) || {},
    sessionStarted: false,
    mode: 'oncall', // 'oncall' or 'onsite'
    sessionInfo: JSON.parse(localStorage.getItem('it_ready_session_info')) || { client: '', device: '', serial: '' }
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
    loadSessionInfo();
    setupEventListeners();
    
    // Loading Screen Logic
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.remove('is-loading');
            }, 500);
        }
    }, 1500);

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
    document.getElementById('top-nav-bar').addEventListener('click', handleNavClick);

    // Landing Page Buttons
    const landingStep1 = document.getElementById('landing-step-1');
    const landingStep2 = document.getElementById('landing-step-2');
    const landingStartBtn = document.getElementById('landing-start-btn');
    const backToStep1Btn = document.getElementById('back-to-step-1-btn');
    const startOnCall = document.getElementById('start-oncall-btn');
    const startOnSite = document.getElementById('start-onsite-btn');
    const switchModeBtn = document.getElementById('switch-mode-btn');

    if (switchModeBtn) {
        switchModeBtn.addEventListener('click', () => {
            const landingPage = document.getElementById('landing-page');
            const landingStep1 = document.getElementById('landing-step-1');
            const landingStep2 = document.getElementById('landing-step-2');
            
            landingPage.style.display = 'flex';
            landingPage.classList.add('active');
            landingStep1.style.display = 'none';
            landingStep1.classList.remove('active');
            landingStep2.style.display = 'block';
            setTimeout(() => landingStep2.classList.add('active'), 50);
        });
    }

    if (landingStartBtn) {
        landingStartBtn.addEventListener('click', () => {
            landingStep1.classList.remove('active');
            setTimeout(() => {
                landingStep1.style.display = 'none';
                landingStep2.style.display = 'block';
                setTimeout(() => landingStep2.classList.add('active'), 50);
            }, 300);
        });
    }

    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', () => {
            landingStep2.classList.remove('active');
            setTimeout(() => {
                landingStep2.style.display = 'none';
                landingStep1.style.display = 'block';
                setTimeout(() => landingStep1.classList.add('active'), 50);
            }, 300);
        });
    }


    if (startOnCall) {
        startOnCall.addEventListener('click', () => {
            setAppMode('oncall');
            startSession();
        });
    }

    if (startOnSite) {
        startOnSite.addEventListener('click', () => {
            setAppMode('onsite');
            startSession();
        });
    }

    function startSession() {
        state.sessionStarted = true;
        document.getElementById('landing-page').classList.remove('active');
        setTimeout(() => {
            document.getElementById('landing-page').style.display = 'none';
        }, 300);
    }

    // Session Info inputs
    const sessionClient = document.getElementById('session-client-name');
    const sessionDevice = document.getElementById('session-device-model');
    const sessionSerial = document.getElementById('session-serial-tag');

    [sessionClient, sessionDevice, sessionSerial].forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => {
            state.sessionInfo.client = sessionClient.value;
            state.sessionInfo.device = sessionDevice.value;
            state.sessionInfo.serial = sessionSerial.value;
            localStorage.setItem('it_ready_session_info', JSON.stringify(state.sessionInfo));
        });
        
        // Clear initial placeholder-like data if it was accidentally saved as "Test Client" etc.
        input.addEventListener('focus', () => {
            if (input.value.toLowerCase().includes('test client') || input.value.toLowerCase().includes('test device')) {
                input.value = '';
            }
        });
    });

    // Report Generation
    const generateReportBtn = document.getElementById('generate-report-btn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', generateSessionReport);
    }

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

function setAppMode(mode) {
    state.mode = mode;
    document.body.classList.toggle('onsite-mode', mode === 'onsite');
    
    // Set default view for mode
    state.view = 'modules';
    
    renderCategoriesNav();
    setView(state.view);
}

function renderCategoriesNav() {
    // Filter categories based on mode
    const onCallCats = ['phone', 'printer', 'computer', 'networking', 'hardware', 'software', 'modules'];
    const onSiteCats = ['phone', 'printer', 'computer', 'networking', 'hardware', 'software', 'on-site', 'modules'];
    
    const allowedCats = state.mode === 'onsite' ? onSiteCats : onCallCats;
    const filteredCategories = categories.filter(cat => allowedCats.includes(cat.id));

    categoriesNav.innerHTML = filteredCategories.map(cat => `
        <a class="nav-item ${state.view === cat.id ? 'active' : ''}" data-view="${cat.id}">
            <i class="ph ${cat.icon}"></i>
            <span class="nav-item-label">${cat.label}</span>
        </a>
    `).join('');

    // Toggle Pre-Call visibility based on mode
    const preCallNavItem = document.querySelector('[data-view="client_checklist"]');
    if (preCallNavItem) {
        preCallNavItem.style.display = state.mode === 'onsite' ? 'none' : 'flex';
    }

    // Populate Category Select for Add Modal
    const select = document.getElementById('phrase-category');
    select.innerHTML = filteredCategories.map(cat => `<option value="${cat.id}">${cat.label}</option>`).join('');
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
        currentViewTitle.textContent = 'All Categories';
    } else if (viewId === 'client_checklist') {
        currentViewTitle.textContent = 'Client Pre-Call Checklist';
    } else {
        const cat = categories.find(c => c.id === viewId);
        currentViewTitle.textContent = cat ? cat.label : 'Phrases';
    }
    
    renderView();
}
function renderView() {

    if (state.view === 'client_checklist') {
        contentGrid.style.display = 'none';
        toolsContainer.style.display = 'block';
        renderClientChecklist();
        return;
    }

    if (state.view === 'modules') {
        contentGrid.style.display = 'none';
        toolsContainer.style.display = 'block';
        renderModules();
        return;
    }

    if (state.view === 'cheat_sheet') {
        contentGrid.style.display = 'none';
        toolsContainer.style.display = 'block';
        renderCheatSheet();
        return;
    }

    if (state.view === 'custom') {
        contentGrid.style.display = 'block';
        toolsContainer.style.display = 'none';
        renderCategoryGrid();
        return;
    }

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
        const queryTerms = state.searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 0);
        phrasesToRender = phrasesToRender.filter(p => {
            const matchText = p.text.toLowerCase();
            const matchTags = (p.tags || []).map(t => t.toLowerCase());
            const categoryObj = categories.find(c => c.id === p.category);
            const matchCategory = categoryObj ? categoryObj.label.toLowerCase() : '';
            
            return queryTerms.every(term => 
                matchText.includes(term) || 
                matchTags.some(t => t.includes(term)) || 
                matchCategory.includes(term)
            );
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

function renderCategoryGrid() {
    const onCallCats = ['phone', 'printer', 'computer', 'networking', 'hardware', 'software', 'modules'];
    const onSiteCats = ['phone', 'printer', 'computer', 'networking', 'hardware', 'software', 'on-site', 'modules'];
    
    const allowedCats = state.mode === 'onsite' ? onSiteCats : onCallCats;
    const filteredCategories = categories.filter(cat => allowedCats.includes(cat.id));

    contentGrid.className = 'portrait-scroll-area';
    contentGrid.innerHTML = `
        <div class="category-grid-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; padding: 20px;">
            ${filteredCategories.map(cat => `
                <div class="category-card" onclick="setView('${cat.id}')" style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px; padding: 24px; text-align: center; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; box-shadow: var(--shadow);">
                    <i class="ph-fill ${cat.icon}" style="font-size: 2.5rem; color: var(--accent);"></i>
                    <span style="font-weight: 700; font-size: 1rem; color: var(--text-primary);">${cat.label}</span>
                </div>
            `).join('')}
        </div>
        <style>
            .category-card:hover {
                transform: translateY(-8px);
                box-shadow: var(--shadow-hover);
                border-color: var(--accent);
                background: var(--accent-light);
            }
            .category-card i {
                transition: transform 0.3s ease;
            }
            .category-card:hover i {
                transform: scale(1.1);
            }
        </style>
    `;
}
function renderModules() {
    const onSiteModules = ['mod_site_survey', 'mod_rack_management', 'mod_field_tools', 'mod_field_etiquette', 'mod_osi', 'mod_documentation'];
    const onCallModules = ['mod_mindset', 'mod_osi', 'mod_documentation'];
    
    const allowedModules = state.mode === 'onsite' ? onSiteModules : onCallModules;
    const filteredModules = modulesContent.filter(m => allowedModules.includes(m.id));

    let html = `
        <div class="module-container">
            ${filteredModules.map(module => `
                <article class="module-article">
                    <div class="module-image">
                        <img src="${module.image}" alt="${module.title}">
                    </div>
                    <h2>${module.title}</h2>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 32px;">${module.description}</p>
                    
                    ${module.sections.map(section => `
                        <div class="module-section">
                            <h3>${section.heading}</h3>
                            <p>${section.text}</p>
                            
                            ${section.keyPoints ? `
                                <ul style="margin-top: 12px; padding-left: 20px;">
                                    ${section.keyPoints.map(point => `<li>${point}</li>`).join('')}
                                </ul>
                            ` : ''}

                            ${section.examples ? `
                                <div class="example-grid">
                                    ${section.examples.map(ex => `
                                        <div class="example-box ${ex.type}">
                                            <div class="example-label ${ex.type}">
                                                <i class="ph ${ex.type === 'good' ? 'ph-check-circle' : 'ph-x-circle'}"></i> 
                                                ${ex.label}
                                            </div>
                                            ${ex.text}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </article>
            `).join('')}
        </div>
    `;
    toolsContainer.innerHTML = html;
}

function renderTools() {
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <div class="tool-column">
                <h3 style="margin-bottom: 16px; color: var(--text-secondary);">Freelance Tech Toolkit</h3>
                ${supportTools.freelanceToolkit.map(category => `
                    <div class="tool-section">
                        <div class="tool-header">
                            <i class="ph ${category.icon}"></i> ${category.category}
                        </div>
                        <div class="toolkit-grid">
                            ${category.tools.map(tool => `
                                <div class="toolkit-item" onclick="window.open('${tool.url}', '_blank')">
                                    <div class="toolkit-name">${tool.name}</div>
                                    <div class="toolkit-desc">${tool.desc}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="tool-column">
                <h3 style="margin-bottom: 16px; color: var(--text-secondary);">Command Line Reference (One-Click Copy)</h3>
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
                
                <h3 style="margin-top: 24px; margin-bottom: 16px; color: var(--text-secondary);">Quick Diagnosis Questions</h3>
                <div class="tool-section">
                    <ul style="padding-left: 20px; line-height: 1.6;">
                        ${supportTools.diagnosisQuestions.map(q => `<li style="margin-bottom: 8px;">${q}</li>`).join('')}
                    </ul>
                </div>

                <h3 style="margin-top: 24px; margin-bottom: 16px; color: var(--text-secondary);">OSI Troubleshooting Foundation</h3>
                <div class="tool-section">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${supportTools.osiModel.map(layer => `
                            <div style="display: flex; gap: 12px; padding: 10px; background: var(--bg-color); border-radius: 8px; border-left: 4px solid var(--accent);">
                                <div style="font-weight: 800; color: var(--accent); min-width: 24px;">L${layer.layer}</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 700; font-size: 0.9rem;">${layer.name}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-secondary);">${layer.focus}</div>
                                    <div style="font-size: 0.7rem; margin-top: 4px; padding-top: 4px; border-top: 1px dotted var(--border);"><strong>Checks:</strong> ${layer.checks}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
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

function renderClientChecklist() {
    const checklistItems = [
        { task: "Power & Connectivity", desc: "Please ensure your device is plugged into a power source and connected to the internet (if possible)." },
        { task: "Identify Device", desc: "Have your device model name or Serial Number/Asset Tag ready." },
        { task: "Error Messages", desc: "If you saw an error message, please have the exact text or a photo of it ready." },
        { task: "Remote Ready", desc: "Download and install RustDesk or AnyDesk if a remote session is planned." },
        { task: "Recent Changes", desc: "Think about any new software or hardware you installed just before the issue started." }
    ];

    let html = `
        <div class="client-checklist-container">
            <div class="checklist-card">
                <div class="checklist-header">
                    <i class="ph ph-clipboard-check"></i>
                    <h2>Pre-Call Checklist</h2>
                </div>
                <p class="checklist-intro">To help me resolve your issue as quickly as possible, please have these ready before our call:</p>
                <div class="checklist-items">
                    ${checklistItems.map((item, index) => `
                        <div class="checklist-item-row">
                            <div class="checklist-number">${index + 1}</div>
                            <div class="checklist-content">
                                <strong>${item.task}</strong>
                                <p>${item.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="checklist-footer">
                    <button class="btn btn-primary" onclick="navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied! Send this to your client.'))">
                        <i class="ph ph-share-network"></i> Copy Link for Client
                    </button>
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
    const isOnsite = state.mode === 'onsite';
    const script = openingScripts[categoryId] || openingScripts['general'];
    const troubleshootingSteps = isOnsite ? (onsiteProceduresMap[categoryId] || onsiteProceduresMap['phone']) : (troubleshootingScriptsMap[categoryId] || troubleshootingScriptsMap['phone']);
    const viewTitle = isOnsite ? 'On-Site Procedure' : 'Support Script';
    
    const steps = [
        {
            id: 'step1',
            title: isOnsite ? 'Step 1: Physical Access & Environment' : 'Step 1: Opening & Verification',
            instruction: isOnsite ? 'SECURE THE AREA & ASSESS' : 'GREET THE CUSTOMER',
            bubbles: isOnsite ? [
                'Identify exact location of the device and surrounding environment hazards.',
                'Ensure you have cleared a clean workspace for your field tools.'
            ] : [
                'Hi! Thank you for calling Tech Support. My name is Cris, how can I help you today?',
                'I\'ve noted your symptoms. Before we proceed, may I verify your name and the device you are using?'
            ]
        },
        {
            id: 'step2',
            title: isOnsite ? 'Step 2: External Assessment' : 'Step 2: Empathy & Clarification',
            instruction: isOnsite ? 'VISUAL INSPECTION (L1)' : 'SHOW EMPATHY & SET EXPECTATIONS',
            bubbles: isOnsite ? [
                'Check all visible cables, power lights, and physical indicators.',
                'Verify if the issue is environmental (heat, dust, moisture).'
            ] : [
                script,
                'To make sure I have this right: [Summarize the User\'s Issue]. Is that correct?'
            ]
        },

        {
            id: 'step3',
            title: isOnsite ? 'Step 3: Tactical Procedure (OSI Method)' : 'Step 3: Troubleshooting (' + categoryId.toUpperCase() + ')',
            instruction: isOnsite ? 'HANDS-ON TECHNICAL REPAIR' : 'FOLLOW THE TROUBLESHOOTING SCRIPT',
            bubbles: troubleshootingSteps
        },
        {
            id: 'step4',
            title: isOnsite ? 'Step 4: Cleanup & Client Sign-off' : 'Step 4: Closing',
            instruction: isOnsite ? 'CLEAN THE AREA & VERIFY FIX' : 'OFFER ADDITIONAL ASSISTANCE & SIGN-OFF',
            bubbles: isOnsite ? [
                'Pick up all cable stubs, dust, and tool remnants.',
                'Ask the client to test the device in your presence to confirm resolution.',
                'Label the repaired component for future tracking.',
                'Final Check: "Area is clean, fix is verified. Ready for sign-off."'
            ] : [
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
                <i class="ph ph-${isOnsite ? 'wrench' : 'scroll'}"></i> ${viewTitle}: ${categoryId.toUpperCase() === 'ON-SITE' ? 'FIELD REPAIR' : categoryId.toUpperCase()}
            </h2>
            ${steps.map((step, sIdx) => `
                <div class="script-card">
                    <div class="script-instruction">
                        <i class="ph ph-info"></i> ${step.instruction}
                    </div>
                    <div class="section-title">
                        <i class="ph ph-number-circle-${sIdx + 1}"></i> ${step.title.includes(': ') ? step.title.split(': ')[1] : step.title}
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
                                    <label for="sc-chk-${categoryId}-${sIdx}-${bIdx}" class="script-bubble-container">
                                        <div class="script-bubble">
                                            ${typeof bubble === 'object' ? bubble.script : bubble}
                                        </div>
                                        ${typeof bubble === 'object' && bubble.action ? `
                                            <div class="action-bubble" style="margin-top: 8px; padding: 10px; background: rgba(59, 130, 246, 0.1); border-left: 3px solid var(--accent); border-radius: 6px; font-size: 0.85rem; color: var(--text-primary);">
                                                <i class="ph ph-lightning" style="color: var(--accent); margin-right: 6px;"></i>
                                                <strong>Action:</strong> <em>${bubble.action}</em>
                                            </div>
                                        ` : ''}
                                    </label>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button class="btn btn-secondary" onclick="resetIntegratedCallFlow('${categoryId}')">
                    <i class="ph ph-arrows-counter-clockwise"></i> Reset ${isOnsite ? 'Procedure' : 'Script Guide'}
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

function loadSessionInfo() {
    const info = state.sessionInfo;
    if (document.getElementById('session-client-name')) document.getElementById('session-client-name').value = info.client || '';
    if (document.getElementById('session-device-model')) document.getElementById('session-device-model').value = info.device || '';
    if (document.getElementById('session-serial-tag')) document.getElementById('session-serial-tag').value = info.serial || '';
}

function getStepText(catId, sIdx, bIdx) {
    const isOnsite = state.mode === 'onsite';
    const script = openingScripts[catId] || openingScripts['general'];
    const troubleshootingSteps = isOnsite ? (onsiteProceduresMap[catId] || onsiteProceduresMap['phone']) : (troubleshootingScriptsMap[catId] || troubleshootingScriptsMap['phone']);
    
    // This logic must mirror renderIntegratedCallFlow
    if (sIdx === 0) {
        const bubbles = isOnsite ? [
            'Identify exact location of the device and surrounding environment hazards.',
            'Ensure you have cleared a clean workspace for your field tools.'
        ] : [
            'Hi! Thank you for calling Tech Support. My name is Cris, how can I help you today?',
            'I\'ve noted your symptoms. Before we proceed, may I verify your name and the device you are using?'
        ];
        return bubbles[bIdx];
    }
    if (sIdx === 1) {
        const bubbles = isOnsite ? [
            'Check all visible cables, power lights, and physical indicators.',
            'Verify if the issue is environmental (heat, dust, moisture).'
        ] : [
            script,
            'To make sure I have this right: [Summarize the User\'s Issue]. Is that correct?'
        ];
        return bubbles[bIdx];
    }
    if (sIdx === 2) {
        const bubble = troubleshootingSteps[bIdx];
        return typeof bubble === 'object' ? bubble.script : bubble;
    }
    if (sIdx === 3) {
        const bubbles = isOnsite ? [
            'Pick up all cable stubs, dust, and tool remnants.',
            'Ask the client to test the device in your presence to confirm resolution.',
            'Label the repaired component for future tracking.',
            'Final Check: "Area is clean, fix is verified. Ready for sign-off."'
        ] : [
            'I\'ve summarized the fix for your records. Is your issue fully resolved now?',
            'Is there anything else I can assist you with today?',
            'Thank you for calling Tech Support. Have a great day!',
            'Professional Sign-off: "Again, my name is Cris. Thank you for your time."'
        ];
        return bubbles[bIdx];
    }
    return 'Unknown Step';
}

function generateSessionReport() {
    // Pull fresh values from DOM to ensure no stale data in report
    const clientName = document.getElementById('session-client-name')?.value || state.sessionInfo.client;
    const deviceModel = document.getElementById('session-device-model')?.value || state.sessionInfo.device;
    const serialTag = document.getElementById('session-serial-tag')?.value || state.sessionInfo.serial;
    
    const notes = localStorage.getItem('it_ready_quick_notes') || '';
    const checkedSteps = [];
    
    const keys = Object.keys(state.callFlowStates).sort();
    keys.forEach(key => {
        const [cat, sIdx, bIdx] = key.split('-');
        const text = getStepText(cat, parseInt(sIdx), parseInt(bIdx));
        checkedSteps.push(`[${cat.toUpperCase()} / S${parseInt(sIdx)+1}] ${text}`);
    });

    const report = `
# TS READY SESSION REPORT
Generated: ${new Date().toLocaleString()}

## CLIENT INFO
Client: ${clientName || 'N/A'}
Device: ${deviceModel || 'N/A'}
Serial: ${serialTag || 'N/A'}

## ACTIONS TAKEN (CHECKLIST)
${checkedSteps.length > 0 ? checkedSteps.map(s => `- ${s}`).join('\n') : 'No specific steps were checked.'}

## QUICK NOTES
${notes || 'No extra notes recorded.'}

----------------------------------------
Workstation: TS READY by crizneil
    `.trim();

    const successMsg = 'REPORT COPIED!\n\nYour Professional Session Report is now on the clipboard.\nYou can now paste it into your ticketing system.';

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(report).then(() => {
            showToast();
            alert(successMsg);
        }).catch(err => {
            console.error('Clipboard failed', err);
            prompt('Clipboard blocked. Copy report below:', report);
        });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = report;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast();
            alert(successMsg);
        } catch (err) {
            prompt('Clipboard blocked. Copy report below:', report);
        }
        document.body.removeChild(textArea);
    }
}

function renderCheatSheet() {
    let html = `
        <div class="portrait-container" style="max-width: 900px;">
            <h2 style="margin-bottom: 24px; color: var(--accent);"><i class="ph ph-file-text"></i> Quick-Fix Reference</h2>
            <div class="reference-grid">
                ${quickFixes.map(fix => `
                    <div class="ref-card">
                        <h4><i class="ph ph-lightning"></i> ${fix.title}</h4>
                        <div class="ref-desc">${fix.desc}</div>
                        <div class="code-box">
                            <div class="code-box-header">
                                <span><i class="ph ph-terminal-window"></i> CMD/PS</span>
                                <button class="copy-code-btn" onclick="navigator.clipboard.writeText('${fix.commands.replace(/\n/g, ' && ')}').then(showToast)">
                                    <i class="ph ph-copy"></i> Copy
                                </button>
                            </div>
                            <pre class="ref-code">${fix.commands}</pre>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    toolsContainer.innerHTML = html;
}

function renderUtilities() {
    let html = `
        <div class="portrait-container" style="max-width: 900px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                <div class="utility-card">
                    <h3 style="color: var(--accent); margin-bottom: 20px;"><i class="ph ph-calculator"></i> Subnet Calculator</h3>
                    <div class="calc-input-group">
                        <label style="font-size: 0.85rem; font-weight: 600;">CIDR Notation (e.g. 24)</label>
                        <input type="number" id="calc-cidr" value="24" min="0" max="32" class="form-control" oninput="updateSubnetCalc()">
                    </div>
                    <div class="calc-grid">
                        <div class="calc-input-group">
                            <label style="font-size: 0.75rem; color: var(--text-secondary);">Subnet Mask</label>
                            <div id="calc-mask" class="calc-result-badge">255.255.255.0</div>
                        </div>
                        <div class="calc-input-group">
                            <label style="font-size: 0.75rem; color: var(--text-secondary);">IPs Available</label>
                            <div id="calc-ips" class="calc-result-badge">254</div>
                        </div>
                    </div>
                </div>

                <div class="utility-card">
                    <h3 style="color: var(--accent); margin-bottom: 20px;"><i class="ph ph-plug-connected"></i> Port Reference</h3>
                    <div style="height: 300px; overflow-y: auto; padding-right: 8px;">
                        ${commonPorts.map(p => `
                            <div style="padding: 10px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
                                <div>
                                    <span class="port-badge">${p.port}</span>
                                    <strong>${p.service}</strong>
                                </div>
                                <div style="font-size: 0.75rem; color: var(--text-secondary);">${p.desc}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    toolsContainer.innerHTML = html;
}

window.updateSubnetCalc = function() {
    const cidr = parseInt(document.getElementById('calc-cidr').value);
    if (isNaN(cidr) || cidr < 0 || cidr > 32) return;
    
    // Calculate mask
    let mask = [];
    for (let i = 0; i < 4; i++) {
        let n = Math.min(cidr - (i * 8), 8);
        if (n < 0) n = 0;
        mask.push(256 - Math.pow(2, 8 - n));
    }
    
    // Calculate IPs
    const ips = cidr === 32 ? 1 : cidr === 31 ? 2 : Math.pow(2, 32 - cidr) - 2;
    
    document.getElementById('calc-mask').textContent = mask.join('.');
    document.getElementById('calc-ips').textContent = ips.toLocaleString();
};

// Initialize App
document.addEventListener('DOMContentLoaded', init);
