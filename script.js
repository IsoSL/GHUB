// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set user's timezone
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || 'EST';
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-back-top a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navMenu.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Content Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contentItems = document.querySelectorAll('.content-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get platform from data attribute
            const platform = this.getAttribute('data-platform');
            
            // Hide all content items
            contentItems.forEach(item => {
                item.style.display = 'none';
            });
            
            // Show content items for selected platform
            const selectedItems = document.querySelectorAll(`.content-item.${platform}`);
            selectedItems.forEach(item => {
                item.style.display = 'block';
            });
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send these values to your server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            if (formSuccess) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Simulate Live Status Check
    const liveStatus = document.getElementById('liveStatus');
    
    if (liveStatus) {
        // Randomly decide if stream is online (for demo purposes)
        const isLive = Math.random() > 0.5;
        
        if (isLive) {
            liveStatus.innerHTML = '<span class="online">LIVE NOW</span>';
            
            // If a Twitch embed container exists, load the Twitch embed
            const twitchEmbed = document.getElementById('twitchEmbed');
            if (twitchEmbed) {
                loadTwitchEmbed();
            }
        }
    }
    
    // Function to load Twitch embed (would use actual channel in production)
    function loadTwitchEmbed() {
        const twitchEmbed = document.getElementById('twitchEmbed');
        
        // In a real implementation, this would embed your actual Twitch stream
        // Using a placeholder for demo purposes
        twitchEmbed.innerHTML = `
            <div class="placeholder-stream">
                <img src="/api/placeholder/800/450" alt="Live Stream">
                <div class="placeholder-text">
                    <i class="fas fa-broadcast-tower"></i>
                    <p>Stream is currently LIVE! In a real implementation, your Twitch stream would appear here.</p>
                </div>
            </div>
        `;
    }
    
    // Scroll Animation for Elements
    const fadeElements = document.querySelectorAll('.about-content, .setup-content, .content-grid');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Check initial positions on page load
    handleScrollAnimation();
    
    // YouTube & TikTok Content Feed (Mock for demonstration)
    // In a real implementation, this would fetch your content via YouTube/TikTok APIs
    
    // Function to simulate fetching YouTube videos
    function fetchYouTubeVideos() {
        // This is a mock function - in production you would use YouTube API
        console.log('Fetching YouTube videos...');
    }
    
    // Function to simulate fetching TikTok videos
    function fetchTikTokVideos() {
        // This is a mock function - in production you would use TikTok API
        console.log('Fetching TikTok videos...');
    }
    
    // Call mock fetching functions
    fetchYouTubeVideos();
    fetchTikTokVideos();
    
    // Setup Day Highlighting for Current Day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    const scheduleDays = document.querySelectorAll('.schedule-day');
    scheduleDays.forEach(day => {
        const dayName = day.querySelector('h3').textContent;
        if (dayName === today) {
            day.style.borderLeft = '4px solid var(--accent-color)';
        }
    });
});
