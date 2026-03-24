// App state
let activeCategory = 'news';
let deferredPrompt = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    loadChannels(activeCategory);
    initServiceWorker();
    initNetworkDetection();
    initPWAInstall();
    initAnalytics();
});

// Initialize categories
function initCategories() {
    const wrapper = document.getElementById('categoriesWrapper');
    if (!wrapper) return;
    
    CATEGORIES.forEach(category => {
        const button = document.createElement('button');
        button.className = `category-tab ${category.id === activeCategory ? 'active' : ''}`;
        button.setAttribute('data-category', category.id);
        button.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
        button.addEventListener('click', () => switchCategory(category.id));
        wrapper.appendChild(button);
    });
}

// Switch category
function switchCategory(categoryId) {
    activeCategory = categoryId;
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        const category = tab.getAttribute('data-category');
        if (category === categoryId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Load channels for selected category
    loadChannels(categoryId);
    
    // Save preference
    localStorage.setItem('lastCategory', categoryId);
}

// Load channels for category
function loadChannels(categoryId) {
    const grid = document.getElementById('channelsGrid');
    const spinner = document.getElementById('loadingSpinner');
    const errorDiv = document.getElementById('errorMessage');
    
    spinner.style.display = 'block';
    grid.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Simulate network delay for loading
    setTimeout(() => {
        try {
            const channels = getChannelsByCategory(categoryId);
            
            if (!channels || channels.length === 0) {
                grid.innerHTML = `
                    <div class="no-channels">
                        <i class="fas fa-tv"></i>
                        <p>No channels available in this category</p>
                        <small>Check back later for updates</small>
                    </div>
                `;
            } else {
                renderChannels(channels);
            }
            
            spinner.style.display = 'none';
            grid.style.display = 'grid';
        } catch (error) {
            console.error('Error loading channels:', error);
            spinner.style.display = 'none';
            errorDiv.style.display = 'block';
        }
    }, 300);
}

// Render channels grid
function renderChannels(channels) {
    const grid = document.getElementById('channelsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    channels.forEach(channel => {
        const card = document.createElement('div');
        card.className = 'channel-card';
        card.onclick = () => openPlayer(channel);
        
        // Get first letter for icon
        const firstLetter = channel.name.charAt(0).toUpperCase();
        
        card.innerHTML = `
            <div class="channel-icon">
                ${firstLetter}
            </div>
            <div class="channel-info">
                <div class="channel-name">${escapeHtml(channel.name)}</div>
                <div class="channel-category">${getCategoryName(channel.category)}</div>
            </div>
            <div class="play-icon">
                <i class="fas fa-play-circle"></i>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Get category display name
function getCategoryName(categoryId) {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize service worker
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('ServiceWorker update found!');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}

// Show update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <i class="fas fa-sync-alt"></i>
        <span>New version available! Refresh to update.</span>
        <button onclick="location.reload()">Update</button>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 10000);
}

// Network detection
function initNetworkDetection() {
    window.addEventListener('online', () => {
        const notification = document.getElementById('offlineNotification');
        notification.style.display = 'none';
        loadChannels(activeCategory);
        showToast('Back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        const notification = document.getElementById('offlineNotification');
        notification.style.display = 'flex';
        showToast('You are offline. Some features may be limited.', 'warning');
        
        setTimeout(() => {
            if (notification.style.display === 'flex') {
                notification.style.display = 'none';
            }
        }, 5000);
    });
    
    // Initial check
    if (!navigator.onLine) {
        const notification = document.getElementById('offlineNotification');
        notification.style.display = 'flex';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
}

// PWA Installation
function initPWAInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        const installBtn = document.getElementById('installBtn');
        installBtn.style.display = 'flex';
        
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installBtn.style.display = 'none';
                
                if (outcome === 'accepted') {
                    showToast('App installed successfully!', 'success');
                }
            }
        });
    });
    
    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        const installBtn = document.getElementById('installBtn');
        installBtn.style.display = 'none';
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FFC107' : '#2196F3'};
        color: ${type === 'warning' ? '#333' : 'white'};
        padding: 12px 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Simple analytics
function initAnalytics() {
    // Track page view
    trackEvent('page_view', { page: 'home' });
    
    // Track category views
    const originalSwitchCategory = switchCategory;
    window.switchCategory = (categoryId) => {
        trackEvent('category_view', { category: categoryId });
        originalSwitchCategory(categoryId);
    };
}

function trackEvent(eventName, eventData = {}) {
    // Simple analytics - can be replaced with Google Analytics or similar
    console.log(`[Analytics] ${eventName}:`, eventData);
    
    // Store in localStorage for later analysis
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (events.length > 100) events.shift();
    localStorage.setItem('analytics_events', JSON.stringify(events));
}

// Cache strategies for offline viewing
async function cacheChannelData() {
    if ('caches' in window) {
        try {
            const cache = await caches.open('channel-data-v1');
            await cache.put('/api/channels', new Response(JSON.stringify(CHANNELS)));
            console.log('Channel data cached successfully');
        } catch (error) {
            console.error('Failed to cache channel data:', error);
        }
    }
}

// Preload channels data
cacheChannelData();

// Background sync for channel updates
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('sync-channels').catch(err => {
            console.log('Background sync not supported:', err);
        });
    });
}

// Handle back button for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('playerModal');
        if (modal.classList.contains('active')) {
            closePlayer();
        }
    }
});

// Touch optimizations for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchEndX - touchStartX;
    
    if (Math.abs(difference) > swipeThreshold) {
        const modal = document.getElementById('playerModal');
        if (modal.classList.contains('active')) {
            closePlayer();
        }
    }
}

// Load last used category
function loadLastCategory() {
    const lastCategory = localStorage.getItem('lastCategory');
    if (lastCategory && CATEGORIES.some(c => c.id === lastCategory)) {
        activeCategory = lastCategory;
    }
}

// Initialize app with last category
loadLastCategory();

// Add CSS for toast and update notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .update-notification button {
        margin-left: auto;
        background: white;
        color: var(--primary-color);
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
    }
    
    .toast {
        animation: slideUp 0.3s ease;
    }
`;
document.head.appendChild(style);
