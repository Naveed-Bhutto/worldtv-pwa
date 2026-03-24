// Player management
let currentPlayer = null;
let currentChannel = null;
let currentQuality = 'auto';
let networkSpeed = null;
let retryCount = 0;
const MAX_RETRIES = 3;

// Detect network speed
async function detectNetworkSpeed() {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const image = new Image();
        const testImageUrl = `https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png?t=${Date.now()}`;
        
        image.onload = () => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            const speed = 1000000 / duration; // Approximate speed in bytes per second
            resolve(speed);
        };
        
        image.onerror = () => {
            resolve(100000); // Default to 100KB/s if test fails
        };
        
        image.src = testImageUrl;
    });
}

// Adaptive quality selection based on network speed
async function selectAdaptiveQuality() {
    if (currentQuality !== 'auto') return currentQuality;
    
    const speed = await detectNetworkSpeed();
    networkSpeed = speed;
    
    if (speed > 2000000) { // >2 Mbps
        return 'high';
    } else if (speed > 500000) { // >500 Kbps
        return 'medium';
    } else {
        return 'low';
    }
}

// Open player with channel
async function openPlayer(channel) {
    currentChannel = channel;
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    const channelName = document.getElementById('playerChannelName');
    const qualitySelect = document.getElementById('qualitySelect');
    
    channelName.textContent = channel.name;
    
    // Reset retry count
    retryCount = 0;
    
    // Set quality based on network speed
    if (currentQuality === 'auto') {
        const adaptiveQuality = await selectAdaptiveQuality();
        const streamUrl = channel.quality[adaptiveQuality] || channel.url;
        video.src = streamUrl;
    } else {
        const streamUrl = channel.quality[currentQuality] || channel.url;
        video.src = streamUrl;
    }
    
    modal.classList.add('active');
    
    // Monitor buffering
    video.addEventListener('waiting', showBuffering);
    video.addEventListener('playing', hideBuffering);
    video.addEventListener('error', handlePlayerError);
    video.addEventListener('stalled', handleStalled);
    
    video.play().catch(error => {
        console.error('Playback failed:', error);
        showError('Failed to play stream. Trying alternative source...');
        retryPlayback();
    });
}

// Handle stalled playback
function handleStalled() {
    console.log('Playback stalled');
    if (currentChannel) {
        showBuffering();
        setTimeout(() => {
            const video = document.getElementById('videoPlayer');
            if (video.paused || video.readyState < 2) {
                video.play().catch(() => {
                    retryPlayback();
                });
            }
        }, 2000);
    }
}

// Retry playback on error
function retryPlayback() {
    if (retryCount < MAX_RETRIES && currentChannel) {
        retryCount++;
        console.log(`Retry attempt ${retryCount}/${MAX_RETRIES}`);
        
        setTimeout(() => {
            const video = document.getElementById('videoPlayer');
            let quality = currentQuality;
            
            // Lower quality on retry for better chance of success
            if (retryCount === 2 && quality === 'high') {
                quality = 'medium';
            } else if (retryCount === 3 && quality !== 'low') {
                quality = 'low';
            }
            
            const streamUrl = quality === 'auto' 
                ? currentChannel.url 
                : (currentChannel.quality[quality] || currentChannel.url);
            
            video.src = streamUrl;
            video.load();
            video.play().catch(() => {
                if (retryCount >= MAX_RETRIES) {
                    showError('Unable to play this channel. Please try again later.');
                } else {
                    retryPlayback();
                }
            });
        }, 2000);
    }
}

// Handle player errors
function handlePlayerError(event) {
    console.error('Player error:', event);
    const video = document.getElementById('videoPlayer');
    
    if (retryCount < MAX_RETRIES) {
        retryPlayback();
    } else {
        showError('Playback failed. Please try another channel.');
    }
}

// Show buffering indicator
function showBuffering() {
    const indicator = document.getElementById('bufferingIndicator');
    const overlay = document.getElementById('videoOverlay');
    if (indicator && overlay) {
        overlay.style.display = 'flex';
        indicator.style.display = 'block';
    }
}

// Hide buffering indicator
function hideBuffering() {
    const indicator = document.getElementById('bufferingIndicator');
    const overlay = document.getElementById('videoOverlay');
    if (indicator && overlay) {
        indicator.style.display = 'none';
        overlay.style.display = 'none';
    }
    retryCount = 0; // Reset retry count on successful playback
}

// Close player
function closePlayer() {
    const modal = document.getElementById('playerModal');
    const video = document.getElementById('videoPlayer');
    
    video.pause();
    video.src = '';
    video.removeEventListener('waiting', showBuffering);
    video.removeEventListener('playing', hideBuffering);
    video.removeEventListener('error', handlePlayerError);
    video.removeEventListener('stalled', handleStalled);
    
    modal.classList.remove('active');
    currentChannel = null;
    retryCount = 0;
    
    // Reset quality selection to auto for next playback
    const qualitySelect = document.getElementById('qualitySelect');
    if (qualitySelect) {
        qualitySelect.value = 'auto';
        currentQuality = 'auto';
    }
}

// Quality change handler
document.addEventListener('DOMContentLoaded', () => {
    const qualitySelect = document.getElementById('qualitySelect');
    if (qualitySelect) {
        qualitySelect.addEventListener('change', (e) => {
            currentQuality = e.target.value;
            if (currentChannel && document.getElementById('playerModal').classList.contains('active')) {
                // Reload with new quality
                const video = document.getElementById('videoPlayer');
                const streamUrl = currentQuality === 'auto' 
                    ? currentChannel.url 
                    : (currentChannel.quality[currentQuality] || currentChannel.url);
                
                const currentTime = video.currentTime;
                video.src = streamUrl;
                video.load();
                video.currentTime = currentTime;
                video.play().catch(error => {
                    console.error('Quality change failed:', error);
                });
            }
        });
    }
});

// Show error message in player
function showError(message) {
    const overlay = document.getElementById('videoOverlay');
    if (overlay) {
        overlay.innerHTML = `
            <div class="error-overlay">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <button onclick="closePlayer()">Close</button>
            </div>
        `;
        overlay.style.display = 'flex';
        
        // Auto-close after 5 seconds if no interaction
        setTimeout(() => {
            if (overlay.querySelector('.error-overlay')) {
                closePlayer();
            }
        }, 5000);
    }
}

// Export for global use
window.openPlayer = openPlayer;
window.closePlayer = closePlayer;
