/* ============================================
   AI Prompt Library - Application Logic
   ============================================ */

// ============================================
// State Management
// ============================================

const state = {
    prompts: [],
    filteredPrompts: [],
    filters: {
        platform: 'all',
        category: 'all',
        difficulty: 'all',
        framework: 'all',
        search: ''
    }
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    // Grid & Display
    promptsGrid: document.getElementById('prompts-grid'),
    emptyState: document.getElementById('empty-state'),

    // Filters
    searchInput: document.getElementById('search-input'),
    platformBtns: document.querySelectorAll('.platform-btn'),
    categorySelect: document.getElementById('category-select'),
    difficultyBtns: document.querySelectorAll('.difficulty-btn'),
    frameworkSelect: document.getElementById('framework-select'),
    clearFiltersBtn: document.getElementById('clear-filters'),

    // Stats
    visibleCount: document.getElementById('visible-count'),
    totalCount: document.getElementById('total-count'),

    // Toast
    toast: document.getElementById('toast')
};

// ============================================
// Initialization
// ============================================

function init() {
    // Load data from prompts.js (loaded via script tag)
    if (typeof promptsData !== 'undefined') {
        state.prompts = promptsData;
    }

    // Populate dropdowns
    populateCategories();
    populateFrameworks();

    // Set up event listeners
    setupEventListeners();

    // Initial render
    applyFilters();

    console.log('AI Prompt Library initialized with', state.prompts.length, 'prompts');
}

// ============================================
// Category Population
// ============================================

function populateCategories() {
    if (typeof categories === 'undefined') return;

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.slug;
        option.textContent = `${category.icon} ${category.name}`;
        elements.categorySelect.appendChild(option);
    });
}

// ============================================
// Framework Population
// ============================================

function populateFrameworks() {
    if (typeof frameworks === 'undefined') return;

    frameworks.forEach(fw => {
        const option = document.createElement('option');
        option.value = fw.id;
        option.textContent = `${fw.shortLabel} - ${fw.name}`;
        elements.frameworkSelect.appendChild(option);
    });
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Search input with debounce
    let searchTimeout;
    elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.filters.search = e.target.value.toLowerCase().trim();
            applyFilters();
        }, 200);
    });

    // Platform filter buttons
    elements.platformBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;

            // Update active state
            elements.platformBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update filter
            state.filters.platform = platform;
            applyFilters();
        });
    });

    // Category select
    elements.categorySelect.addEventListener('change', (e) => {
        state.filters.category = e.target.value;
        applyFilters();
    });

    // Difficulty filter buttons
    elements.difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const difficulty = btn.dataset.difficulty;

            elements.difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            state.filters.difficulty = difficulty;
            applyFilters();
        });
    });

    // Framework select
    elements.frameworkSelect.addEventListener('change', (e) => {
        state.filters.framework = e.target.value;
        applyFilters();
    });

    // Clear filters button
    elements.clearFiltersBtn.addEventListener('click', clearFilters);
}

// ============================================
// Filter Logic
// ============================================

function applyFilters() {
    const { platform, category, difficulty, framework, search } = state.filters;

    state.filteredPrompts = state.prompts.filter(prompt => {
        // Platform filter
        if (platform !== 'all') {
            const matchesPlatform = prompt.platforms.includes(platform) ||
                                   prompt.platforms.includes('universal');
            if (!matchesPlatform) return false;
        }

        // Category filter
        if (category !== 'all' && prompt.category !== category) {
            return false;
        }

        // Difficulty filter
        if (difficulty !== 'all' && prompt.difficulty !== difficulty) {
            return false;
        }

        // Framework filter
        if (framework !== 'all') {
            if (!prompt.frameworks || !prompt.frameworks.includes(framework)) {
                return false;
            }
        }

        // Search filter
        if (search) {
            const searchableText = [
                prompt.title,
                prompt.prompt,
                prompt.whyItWorks,
                ...(prompt.tags || []),
                ...(prompt.frameworks || [])
            ].join(' ').toLowerCase();

            if (!searchableText.includes(search)) {
                return false;
            }
        }

        return true;
    });

    // Update UI
    renderPrompts();
    updateStats();
    updateClearButton();
}

function clearFilters() {
    // Reset state
    state.filters = {
        platform: 'all',
        category: 'all',
        difficulty: 'all',
        framework: 'all',
        search: ''
    };

    // Reset UI elements
    elements.searchInput.value = '';
    elements.categorySelect.value = 'all';
    elements.frameworkSelect.value = 'all';
    elements.platformBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.platform === 'all');
    });
    elements.difficultyBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === 'all');
    });

    // Re-apply filters
    applyFilters();
}

function updateClearButton() {
    const hasFilters = state.filters.platform !== 'all' ||
                      state.filters.category !== 'all' ||
                      state.filters.difficulty !== 'all' ||
                      state.filters.framework !== 'all' ||
                      state.filters.search !== '';

    elements.clearFiltersBtn.hidden = !hasFilters;
}

// ============================================
// Rendering
// ============================================

function renderPrompts() {
    // Clear existing content
    elements.promptsGrid.innerHTML = '';

    // Show empty state if no results
    if (state.filteredPrompts.length === 0) {
        elements.emptyState.hidden = false;
        return;
    }

    elements.emptyState.hidden = true;

    // Render each prompt card
    state.filteredPrompts.forEach(prompt => {
        const card = createPromptCard(prompt);
        elements.promptsGrid.appendChild(card);
    });
}

function createPromptCard(prompt) {
    const card = document.createElement('article');
    card.className = 'prompt-card';
    card.dataset.id = prompt.id;

    // Get category info
    const categoryInfo = getCategoryInfo(prompt.category);

    // Build platform tags HTML
    const platformTagsHTML = prompt.platforms.map(p => {
        const platformInfo = getPlatformInfo(p);
        return `
            <span class="platform-tag ${p}">
                <span class="platform-tag-dot"></span>
                ${platformInfo.name}
            </span>
        `;
    }).join('');

    // Build platform notes HTML (if exists)
    let notesHTML = '';
    if (prompt.platformNotes && Object.keys(prompt.platformNotes).length > 0) {
        const notesItems = Object.entries(prompt.platformNotes)
            .map(([platform, note]) => `
                <div class="note-item">
                    <span class="note-platform ${platform}">${capitalize(platform)}:</span>
                    <span class="note-text">${escapeHTML(note)}</span>
                </div>
            `).join('');

        notesHTML = `
            <div class="card-notes">
                <button class="notes-toggle" aria-expanded="false">
                    <span>Platform Notes</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="notes-content">
                    ${notesItems}
                </div>
            </div>
        `;
    }

    // Build framework badges HTML
    const frameworkBadgesHTML = (prompt.frameworks || []).map(fwId => {
        const fw = getFrameworkInfo(fwId);
        return `<span class="framework-badge" data-framework="${fwId}" title="${fw.name}">${fw.shortLabel}</span>`;
    }).join('');

    // Build difficulty badge
    const difficultyBadgeHTML = prompt.difficulty
        ? `<span class="difficulty-badge ${prompt.difficulty}"><span class="difficulty-badge-dot"></span>${prompt.difficulty}</span>`
        : '';

    card.innerHTML = `
        <div class="card-header">
            <span class="category-badge">
                <span class="category-badge-icon">${categoryInfo.icon}</span>
                ${categoryInfo.name}
            </span>
            <div class="card-header-right">
                ${difficultyBadgeHTML}
                <button class="copy-btn" aria-label="Copy prompt to clipboard" data-prompt-id="${prompt.id}">
                    <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>
            </div>
        </div>

        <h3 class="card-title">${escapeHTML(prompt.title)}</h3>

        <div class="card-frameworks">
            ${frameworkBadgesHTML}
        </div>

        <div class="prompt-code">
            <pre>${escapeHTML(prompt.prompt)}</pre>
        </div>

        ${buildVariableInputsHTML(prompt.prompt)}

        <div class="card-explanation">
            <p class="explanation-label">
                <span>💡</span>
                Why it works
            </p>
            <p class="explanation-text">${escapeHTML(prompt.whyItWorks)}</p>
        </div>

        <div class="card-platforms">
            ${platformTagsHTML}
        </div>

        ${notesHTML}
    `;

    // Add event listeners
    setupCardEventListeners(card, prompt);

    return card;
}

function setupCardEventListeners(card, prompt) {
    const preEl = card.querySelector('.prompt-code pre');
    const variableInputs = card.querySelectorAll('.variable-input');

    // Collect current variable values from inputs
    function getVariableValues() {
        const values = {};
        variableInputs.forEach(input => {
            values[input.dataset.var] = input.value;
        });
        return values;
    }

    // Get the customized prompt text (plain text for copying)
    function getCustomizedPrompt() {
        return injectVariables(prompt.prompt, getVariableValues());
    }

    // Real-time prompt update on variable input
    variableInputs.forEach(input => {
        input.addEventListener('input', () => {
            preEl.innerHTML = renderPromptWithHighlights(prompt.prompt, getVariableValues());
        });
    });

    // Copy button - copies customized version
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => copyToClipboard(getCustomizedPrompt(), copyBtn));

    // Framework badge click → quick filter
    card.querySelectorAll('.framework-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const fwId = badge.dataset.framework;
            state.filters.framework = fwId;
            elements.frameworkSelect.value = fwId;
            applyFilters();
        });
    });

    // Notes toggle (if exists)
    const notesToggle = card.querySelector('.notes-toggle');
    if (notesToggle) {
        notesToggle.addEventListener('click', () => {
            const isExpanded = notesToggle.getAttribute('aria-expanded') === 'true';
            notesToggle.setAttribute('aria-expanded', !isExpanded);
            notesToggle.classList.toggle('expanded');

            const notesContent = card.querySelector('.notes-content');
            notesContent.classList.toggle('visible');
        });
    }
}

// ============================================
// Copy to Clipboard
// ============================================

async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);

        // Update button state
        const copyIcon = button.querySelector('.copy-icon');
        const checkIcon = button.querySelector('.check-icon');

        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        button.classList.add('copied');

        // Show toast
        showToast('Copied to clipboard!');

        // Reset button after delay
        setTimeout(() => {
            copyIcon.style.display = 'block';
            checkIcon.style.display = 'none';
            button.classList.remove('copied');
        }, 2000);

    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy');
    }
}

// ============================================
// Toast Notification
// ============================================

let toastTimeout;

function showToast(message) {
    clearTimeout(toastTimeout);

    const toast = elements.toast;
    toast.querySelector('span').textContent = message;
    toast.hidden = false;

    // Trigger reflow for animation
    toast.offsetHeight;
    toast.classList.add('visible');

    // Hide after delay
    toastTimeout = setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.hidden = true;
        }, 250);
    }, 2000);
}

// ============================================
// Stats Update
// ============================================

function updateStats() {
    elements.visibleCount.textContent = state.filteredPrompts.length;
    elements.totalCount.textContent = state.prompts.length;
}

// ============================================
// Helper Functions
// ============================================

function getCategoryInfo(slug) {
    if (typeof categories !== 'undefined') {
        const category = categories.find(c => c.slug === slug);
        if (category) return category;
    }
    return { name: slug, icon: '📝' };
}

function getPlatformInfo(id) {
    if (typeof platforms !== 'undefined') {
        const platform = platforms.find(p => p.id === id);
        if (platform) return platform;
    }
    return { id, name: capitalize(id) };
}

function getFrameworkInfo(id) {
    if (typeof frameworks !== 'undefined') {
        const fw = frameworks.find(f => f.id === id);
        if (fw) return fw;
    }
    return { id, name: id, shortLabel: id.toUpperCase() };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Build HTML for variable input fields
function buildVariableInputsHTML(promptText) {
    const vars = extractVariables(promptText);
    if (vars.length === 0) return '';

    const fields = vars.map(v => `
        <div class="variable-field">
            <label class="variable-label" for="var-${v}">${humanizeVar(v)}</label>
            <input type="text" class="variable-input" id="var-${v}" data-var="${v}" placeholder="Enter ${humanizeVar(v).toLowerCase()}..." autocomplete="off">
        </div>
    `).join('');

    return `
        <div class="prompt-variables">
            <p class="variables-header">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                Customize Variables
            </p>
            <div class="variables-grid">
                ${fields}
            </div>
        </div>
    `;
}

// Extract unique {{VARIABLE}} placeholders from prompt text
function extractVariables(promptText) {
    const regex = /\{\{([A-Z_]+)\}\}/g;
    const vars = [];
    let match;
    while ((match = regex.exec(promptText)) !== null) {
        if (!vars.includes(match[1])) {
            vars.push(match[1]);
        }
    }
    return vars;
}

// Convert "TECH_STACK" → "Tech Stack"
function humanizeVar(varName) {
    return varName.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');
}

// Inject variable values into prompt text, return plain text version
function injectVariables(promptText, values) {
    let result = promptText;
    for (const [varName, value] of Object.entries(values)) {
        if (value) {
            result = result.replaceAll(`{{${varName}}}`, value);
        }
    }
    return result;
}

// Render prompt text with HTML highlighting for filled variables
function renderPromptWithHighlights(promptText, values) {
    let result = escapeHTML(promptText);
    for (const [varName, value] of Object.entries(values)) {
        if (value) {
            const escaped = escapeHTML(value);
            const placeholder = escapeHTML(`{{${varName}}}`);
            result = result.replaceAll(placeholder, `<span class="variable-highlight">${escaped}</span>`);
        }
    }
    return result;
}

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
    // "/" to focus search (when not already in an input)
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        elements.searchInput.focus();
    }

    // Escape to clear search and blur
    if (e.key === 'Escape' && document.activeElement === elements.searchInput) {
        elements.searchInput.blur();
        if (state.filters.search) {
            elements.searchInput.value = '';
            state.filters.search = '';
            applyFilters();
        }
    }
});

// ============================================
// Initialize on DOM Ready
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
