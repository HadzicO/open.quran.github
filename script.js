// Sample data for the API demo
const sampleData = {
    quran: {
        surahs: {
            "1": { name: "Al-Fatihah", verses: 7 },
            "2": { name: "Al-Baqarah", verses: 286 },
            "3": { name: "Ali 'Imran", verses: 200 }
        },
        verses: {
            "1:1": {
                text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                translation: "In the name of Allah, the Most Gracious, the Most Merciful"
            },
            "1:2": {
                text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                translation: "Praise be to Allah, the Lord of all the worlds"
            },
            "2:1": {
                text: "الم",
                translation: "Alif, Lam, Meem"
            },
            "3:1": {
                text: "الم",
                translation: "Alif, Lam, Meem"
            }
        }
    }
};

// DOM elements
const sourceSelect = document.getElementById('source-select');
const surahSelect = document.getElementById('surah-select');
const ayahInput = document.getElementById('ayah-input');
const fetchBtn = document.querySelector('.fetch-btn');
const responseOutput = document.getElementById('response-output');

// Initialize the demo
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    sourceSelect.addEventListener('change', updateSurahOptions);
    surahSelect.addEventListener('change', updateAyahLimit);
    fetchBtn.addEventListener('click', fetchVerse);
    
    // Initialize with default values
    updateSurahOptions();
    
    // Set up button click handlers
    setupButtonHandlers();
});

// Update surah options based on selected source
function updateSurahOptions() {
    const selectedSource = sourceSelect.value;
    const surahs = sampleData[selectedSource].surahs;
    
    // Clear existing options
    surahSelect.innerHTML = '';
    
    // Add new options
    Object.keys(surahs).forEach(id => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = surahs[id].name;
        surahSelect.appendChild(option);
    });
    
    // Update ayah limit for first surah
    updateAyahLimit();
}

// Update ayah input limit based on selected surah
function updateAyahLimit() {
    const selectedSource = sourceSelect.value;
    const selectedSurah = surahSelect.value;
    const maxVerses = sampleData[selectedSource].surahs[selectedSurah].verses;
    
    ayahInput.max = maxVerses;
    if (parseInt(ayahInput.value) > maxVerses) {
        ayahInput.value = 1;
    }
}

// Fetch and display verse
function fetchVerse() {
    const source = sourceSelect.value;
    const surah = surahSelect.value;
    const ayah = ayahInput.value;
    const verseKey = `${surah}:${ayah}`;
    
    // Add loading state
    fetchBtn.classList.add('loading');
    fetchBtn.textContent = 'Fetching';
    
    // Simulate API delay
    setTimeout(() => {
        const verse = sampleData[source].verses[verseKey];
        
        if (verse) {
            const response = {
                text: verse.text,
                translation: verse.translation
            };
            
            responseOutput.textContent = JSON.stringify(response, null, 2);
        } else {
            const errorResponse = {
                error: "Verse not found",
                message: `No verse found for ${source} ${surah}:${ayah}`
            };
            
            responseOutput.textContent = JSON.stringify(errorResponse, null, 2);
        }
        
        // Remove loading state
        fetchBtn.classList.remove('loading');
        fetchBtn.textContent = 'Fetch';
        
        // Add fade-in animation to response
        responseOutput.style.opacity = '0';
        setTimeout(() => {
            responseOutput.style.opacity = '1';
        }, 100);
        
    }, 800);
}

// Setup button handlers for Documentation and Try the API
function setupButtonHandlers() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.textContent === 'Documentation') {
                showNotification('Documentation feature coming soon!', 'info');
            } else if (this.textContent === 'Try the API') {
                // Scroll to API demo section
                const apiDemo = document.querySelector('.api-demo');
                apiDemo.scrollIntoView({ behavior: 'smooth' });
                
                // Focus on the fetch button after scrolling
                setTimeout(() => {
                    fetchBtn.focus();
                }, 500);
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#5a6c7d',
        warning: '#f39c12'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to fetch verse when focused on any input
    if (e.key === 'Enter' && (e.target === ayahInput || e.target === surahSelect || e.target === sourceSelect)) {
        e.preventDefault();
        fetchVerse();
    }
    
    // Escape key to clear focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// Add smooth transitions to response output
if (responseOutput) {
    responseOutput.style.transition = 'opacity 0.3s ease';
}

// GitHub link functionality
document.addEventListener('DOMContentLoaded', function() {
    const githubLink = document.querySelector('.github-link');
    if (githubLink) {
        githubLink.addEventListener('click', function() {
            window.open('https://github.com/HadzicO', '_blank');
        });
        githubLink.style.cursor = 'pointer';
    }
});

// Add some sample API endpoints for demonstration
const apiEndpoints = {
    base: 'https://api.moz-quran.com/v1',
    verses: '/verses/{source}/{surah}/{ayah}',
    surahs: '/surahs/{source}',
    search: '/search/{source}?q={query}'
};

// Function to generate API URL examples
function generateApiUrl(source, surah, ayah) {
    return `${apiEndpoints.base}${apiEndpoints.verses}`
        .replace('{source}', source)
        .replace('{surah}', surah)
        .replace('{ayah}', ayah);
}

// Add API URL display functionality (for documentation purposes)
function updateApiUrlExample() {
    const source = sourceSelect.value;
    const surah = surahSelect.value;
    const ayah = ayahInput.value;
    
    console.log('API URL Example:', generateApiUrl(source, surah, ayah));
}

// Update API URL example when inputs change
sourceSelect.addEventListener('change', updateApiUrlExample);
surahSelect.addEventListener('change', updateApiUrlExample);
ayahInput.addEventListener('input', updateApiUrlExample);

// Initialize API URL example
document.addEventListener('DOMContentLoaded', updateApiUrlExample);
