// MOBILE MENU FIX - IMMEDIATE EXECUTION
(function() {
    'use strict';
    
    console.log('MOBILE MENU FIX LOADING...');
    
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        
        console.log('Elements found:', {
            btn: !!mobileMenuBtn,
            menu: !!mobileMenu,
            close: !!mobileMenuClose,
            links: mobileMenuLinks.length
        });
        
        if (!mobileMenuBtn || !mobileMenu) {
            console.error('Mobile menu elements not found!');
            return;
        }
        
        // Force styles
        mobileMenu.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.95) !important;
            z-index: 9999 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            transform: translateX(-100%) !important;
            transition: transform 0.3s ease !important;
            backdrop-filter: blur(10px) !important;
        `;
        
        mobileMenuBtn.style.cssText = `
            display: block !important;
            z-index: 10000 !important;
            cursor: pointer !important;
            background: transparent !important;
            border: none !important;
            padding: 8px !important;
        `;
        
        function openMenu() {
            console.log('OPENING MENU');
            mobileMenu.style.transform = 'translateX(0) !important';
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            console.log('CLOSING MENU');
            mobileMenu.style.transform = 'translateX(-100%) !important';
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
        
        // Button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('MENU BUTTON CLICKED!');
            openMenu();
        });
        
        // Close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('CLOSE BUTTON CLICKED!');
                closeMenu();
            });
        }
        
        // Menu links
        mobileMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('MENU LINK CLICKED!');
                closeMenu();
            });
        });
        
        // Click outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('open') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                console.log('CLICKED OUTSIDE!');
                closeMenu();
            }
        });
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                console.log('ESCAPE PRESSED!');
                closeMenu();
            }
        });
        
        console.log('MOBILE MENU INITIALIZED SUCCESSFULLY!');
    }
    
    // Initialize immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    // Also try after a delay
    setTimeout(initMobileMenu, 1000);
    
})(); 