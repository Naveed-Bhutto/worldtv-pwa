// Channel database
const CHANNELS = {
    news: [
        {
            id: 1,
            name: "CNN International",
            url: "https://cdn3.wowza.com/1/ZWZZMWV6eEZYcDlY/ODFZZmF2/hls/live/playlist.m3u8",
            category: "news",
            logo: "https://logo.clearbit.com/cnn.com",
            quality: {
                high: "https://cdn3.wowza.com/1/ZWZZMWV6eEZYcDlY/ODFZZmF2/hls/live/playlist.m3u8",
                medium: "https://cdn3.wowza.com/1/ZWZZMWV6eEZYcDlY/ODFZZmF2/hls/live/playlist_medium.m3u8",
                low: "https://cdn3.wowza.com/1/ZWZZMWV6eEZYcDlY/ODFZZmF2/hls/live/playlist_low.m3u8"
            }
        },
        {
            id: 2,
            name: "BBC World News",
            url: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
            category: "news",
            logo: "https://logo.clearbit.com/bbc.com",
            quality: {
                high: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
                medium: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/medium.m3u8",
                low: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/low.m3u8"
            }
        },
        {
            id: 3,
            name: "Al Jazeera",
            url: "https://live-hls-web-aje.getaj.net/AJEnglish/index.m3u8",
            category: "news",
            logo: "https://logo.clearbit.com/aljazeera.com",
            quality: {
                high: "https://live-hls-web-aje.getaj.net/AJEnglish/index.m3u8",
                medium: "https://live-hls-web-aje.getaj.net/AJEnglish/medium.m3u8",
                low: "https://live-hls-web-aje.getaj.net/AJEnglish/low.m3u8"
            }
        },
        {
            id: 4,
            name: "Sky News",
            url: "https://skynews2-vh.akamaihd.net/i/skynews_1@300786/index_1200_av-b.m3u8",
            category: "news",
            logo: "https://logo.clearbit.com/sky.com",
            quality: {
                high: "https://skynews2-vh.akamaihd.net/i/skynews_1@300786/index_1200_av-b.m3u8",
                medium: "https://skynews2-vh.akamaihd.net/i/skynews_1@300786/index_800_av-b.m3u8",
                low: "https://skynews2-vh.akamaihd.net/i/skynews_1@300786/index_400_av-b.m3u8"
            }
        },
        {
            id: 5,
            name: "Fox News",
            url: "https://foxnews-hls.akamaized.net/hls/live/2041844/foxnews/master.m3u8",
            category: "news",
            logo: "https://logo.clearbit.com/foxnews.com",
            quality: {
                high: "https://foxnews-hls.akamaized.net/hls/live/2041844/foxnews/master.m3u8",
                medium: "https://foxnews-hls.akamaized.net/hls/live/2041844/foxnews/medium.m3u8",
                low: "https://foxnews-hls.akamaized.net/hls/live/2041844/foxnews/low.m3u8"
            }
        }
    ],
    sports: [
        {
            id: 6,
            name: "ESPN",
            url: "https://espp-p2p-live.akamaized.net/hls/live/2034334/espn/master.m3u8",
            category: "sports",
            logo: "https://logo.clearbit.com/espn.com",
            quality: {
                high: "https://espp-p2p-live.akamaized.net/hls/live/2034334/espn/master.m3u8",
                medium: "https://espp-p2p-live.akamaized.net/hls/live/2034334/espn/medium.m3u8",
                low: "https://espp-p2p-live.akamaized.net/hls/live/2034334/espn/low.m3u8"
            }
        },
        {
            id: 7,
            name: "Sky Sports",
            url: "https://skysportshd1-vh.akamaihd.net/i/skysports_1@113132/index_1200_av-b.m3u8",
            category: "sports",
            logo: "https://logo.clearbit.com/skysports.com",
            quality: {
                high: "https://skysportshd1-vh.akamaihd.net/i/skysports_1@113132/index_1200_av-b.m3u8",
                medium: "https://skysportshd1-vh.akamaihd.net/i/skysports_1@113132/index_800_av-b.m3u8",
                low: "https://skysportshd1-vh.akamaihd.net/i/skysports_1@113132/index_400_av-b.m3u8"
            }
        },
        {
            id: 8,
            name: "NBC Sports",
            url: "https://nbcsports-hls.akamaized.net/hls/live/2041845/nbcsports/master.m3u8",
            category: "sports",
            logo: "https://logo.clearbit.com/nbcsports.com",
            quality: {
                high: "https://nbcsports-hls.akamaized.net/hls/live/2041845/nbcsports/master.m3u8",
                medium: "https://nbcsports-hls.akamaized.net/hls/live/2041845/nbcsports/medium.m3u8",
                low: "https://nbcsports-hls.akamaized.net/hls/live/2041845/nbcsports/low.m3u8"
            }
        }
    ],
    entertainment: [
        {
            id: 9,
            name: "HBO",
            url: "https://hbogop-live.akamaized.net/hls/live/2041836/hbogop/master.m3u8",
            category: "entertainment",
            logo: "https://logo.clearbit.com/hbo.com",
            quality: {
                high: "https://hbogop-live.akamaized.net/hls/live/2041836/hbogop/master.m3u8",
                medium: "https://hbogop-live.akamaized.net/hls/live/2041836/hbogop/medium.m3u8",
                low: "https://hbogop-live.akamaized.net/hls/live/2041836/hbogop/low.m3u8"
            }
        },
        {
            id: 10,
            name: "Netflix",
            url: "https://netflix-hls.akamaized.net/hls/live/2041846/netflix/master.m3u8",
            category: "entertainment",
            logo: "https://logo.clearbit.com/netflix.com",
            quality: {
                high: "https://netflix-hls.akamaized.net/hls/live/2041846/netflix/master.m3u8",
                medium: "https://netflix-hls.akamaized.net/hls/live/2041846/netflix/medium.m3u8",
                low: "https://netflix-hls.akamaized.net/hls/live/2041846/netflix/low.m3u8"
            }
        }
    ],
    movies: [
        {
            id: 11,
            name: "TCM",
            url: "https://tcm-hls.akamaized.net/hls/live/2041838/tcm/master.m3u8",
            category: "movies",
            logo: "https://logo.clearbit.com/tcm.com",
            quality: {
                high: "https://tcm-hls.akamaized.net/hls/live/2041838/tcm/master.m3u8",
                medium: "https://tcm-hls.akamaized.net/hls/live/2041838/tcm/medium.m3u8",
                low: "https://tcm-hls.akamaized.net/hls/live/2041838/tcm/low.m3u8"
            }
        },
        {
            id: 12,
            name: "AMC",
            url: "https://amc-hls.akamaized.net/hls/live/2041847/amc/master.m3u8",
            category: "movies",
            logo: "https://logo.clearbit.com/amc.com",
            quality: {
                high: "https://amc-hls.akamaized.net/hls/live/2041847/amc/master.m3u8",
                medium: "https://amc-hls.akamaized.net/hls/live/2041847/amc/medium.m3u8",
                low: "https://amc-hls.akamaized.net/hls/live/2041847/amc/low.m3u8"
            }
        }
    ],
    music: [
        {
            id: 13,
            name: "MTV",
            url: "https://mtv-hls.akamaized.net/hls/live/2041839/mtv/master.m3u8",
            category: "music",
            logo: "https://logo.clearbit.com/mtv.com",
            quality: {
                high: "https://mtv-hls.akamaized.net/hls/live/2041839/mtv/master.m3u8",
                medium: "https://mtv-hls.akamaized.net/hls/live/2041839/mtv/medium.m3u8",
                low: "https://mtv-hls.akamaized.net/hls/live/2041839/mtv/low.m3u8"
            }
        },
        {
            id: 14,
            name: "VH1",
            url: "https://vh1-hls.akamaized.net/hls/live/2041848/vh1/master.m3u8",
            category: "music",
            logo: "https://logo.clearbit.com/vh1.com",
            quality: {
                high: "https://vh1-hls.akamaized.net/hls/live/2041848/vh1/master.m3u8",
                medium: "https://vh1-hls.akamaized.net/hls/live/2041848/vh1/medium.m3u8",
                low: "https://vh1-hls.akamaized.net/hls/live/2041848/vh1/low.m3u8"
            }
        }
    ],
    kids: [
        {
            id: 15,
            name: "Nickelodeon",
            url: "https://nick-hls.akamaized.net/hls/live/2041840/nick/master.m3u8",
            category: "kids",
            logo: "https://logo.clearbit.com/nick.com",
            quality: {
                high: "https://nick-hls.akamaized.net/hls/live/2041840/nick/master.m3u8",
                medium: "https://nick-hls.akamaized.net/hls/live/2041840/nick/medium.m3u8",
                low: "https://nick-hls.akamaized.net/hls/live/2041840/nick/low.m3u8"
            }
        },
        {
            id: 16,
            name: "Cartoon Network",
            url: "https://cartoonnetwork-hls.akamaized.net/hls/live/2041849/cartoonnetwork/master.m3u8",
            category: "kids",
            logo: "https://logo.clearbit.com/cartoonnetwork.com",
            quality: {
                high: "https://cartoonnetwork-hls.akamaized.net/hls/live/2041849/cartoonnetwork/master.m3u8",
                medium: "https://cartoonnetwork-hls.akamaized.net/hls/live/2041849/cartoonnetwork/medium.m3u8",
                low: "https://cartoonnetwork-hls.akamaized.net/hls/live/2041849/cartoonnetwork/low.m3u8"
            }
        }
    ],
    documentary: [
        {
            id: 17,
            name: "National Geographic",
            url: "https://natgeo-hls.akamaized.net/hls/live/2041841/natgeo/master.m3u8",
            category: "documentary",
            logo: "https://logo.clearbit.com/nationalgeographic.com",
            quality: {
                high: "https://natgeo-hls.akamaized.net/hls/live/2041841/natgeo/master.m3u8",
                medium: "https://natgeo-hls.akamaized.net/hls/live/2041841/natgeo/medium.m3u8",
                low: "https://natgeo-hls.akamaized.net/hls/live/2041841/natgeo/low.m3u8"
            }
        },
        {
            id: 18,
            name: "Discovery Channel",
            url: "https://discovery-hls.akamaized.net/hls/live/2041842/discovery/master.m3u8",
            category: "documentary",
            logo: "https://logo.clearbit.com/discovery.com",
            quality: {
                high: "https://discovery-hls.akamaized.net/hls/live/2041842/discovery/master.m3u8",
                medium: "https://discovery-hls.akamaized.net/hls/live/2041842/discovery/medium.m3u8",
                low: "https://discovery-hls.akamaized.net/hls/live/2041842/discovery/low.m3u8"
            }
        },
        {
            id: 19,
            name: "History Channel",
            url: "https://history-hls.akamaized.net/hls/live/2041850/history/master.m3u8",
            category: "documentary",
            logo: "https://logo.clearbit.com/history.com",
            quality: {
                high: "https://history-hls.akamaized.net/hls/live/2041850/history/master.m3u8",
                medium: "https://history-hls.akamaized.net/hls/live/2041850/history/medium.m3u8",
                low: "https://history-hls.akamaized.net/hls/live/2041850/history/low.m3u8"
            }
        }
    ],
    international: [
        {
            id: 20,
            name: "Zee TV",
            url: "https://zee-hls.akamaized.net/hls/live/2041843/zee/master.m3u8",
            category: "international",
            logo: "https://logo.clearbit.com/zeetv.com",
            quality: {
                high: "https://zee-hls.akamaized.net/hls/live/2041843/zee/master.m3u8",
                medium: "https://zee-hls.akamaized.net/hls/live/2041843/zee/medium.m3u8",
                low: "https://zee-hls.akamaized.net/hls/live/2041843/zee/low.m3u8"
            }
        },
        {
            id: 21,
            name: "Deutsche Welle",
            url: "https://dw-hls.akamaized.net/hls/live/2041851/dw/master.m3u8",
            category: "international",
            logo: "https://logo.clearbit.com/dw.com",
            quality: {
                high: "https://dw-hls.akamaized.net/hls/live/2041851/dw/master.m3u8",
                medium: "https://dw-hls.akamaized.net/hls/live/2041851/dw/medium.m3u8",
                low: "https://dw-hls.akamaized.net/hls/live/2041851/dw/low.m3u8"
            }
        },
        {
            id: 22,
            name: "France 24",
            url: "https://france24-hls.akamaized.net/hls/live/2041852/france24/master.m3u8",
            category: "international",
            logo: "https://logo.clearbit.com/france24.com",
            quality: {
                high: "https://france24-hls.akamaized.net/hls/live/2041852/france24/master.m3u8",
                medium: "https://france24-hls.akamaized.net/hls/live/2041852/france24/medium.m3u8",
                low: "https://france24-hls.akamaized.net/hls/live/2041852/france24/low.m3u8"
            }
        }
    ]
};

// Categories array
const CATEGORIES = [
    { id: "news", name: "News", icon: "fas fa-newspaper" },
    { id: "sports", name: "Sports", icon: "fas fa-futbol" },
    { id: "entertainment", name: "Entertainment", icon: "fas fa-film" },
    { id: "movies", name: "Movies", icon: "fas fa-video" },
    { id: "music", name: "Music", icon: "fas fa-music" },
    { id: "kids", name: "Kids", icon: "fas fa-child" },
    { id: "documentary", name: "Documentary", icon: "fas fa-globe" },
    { id: "international", name: "International", icon: "fas fa-language" }
];

// Helper function to get all channels
function getAllChannels() {
    let allChannels = [];
    for (let category in CHANNELS) {
        allChannels = allChannels.concat(CHANNELS[category]);
    }
    return allChannels;
}

// Helper function to get channels by category
function getChannelsByCategory(category) {
    return CHANNELS[category] || [];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHANNELS, CATEGORIES, getAllChannels, getChannelsByCategory };
}
