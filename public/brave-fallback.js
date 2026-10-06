/**
 * Brave Browser on Mac fallback script.
 * Brave's privacy shields aggressively block hardware acceleration required for 
 * backdrop-filter (frosted glass), causing elements to render as opaque black boxes.
 * This script detects Brave on Mac and applies specific fallback CSS classes.
 */
(async function() {
    try {
        // Detect if the browser is Brave
        const isBrave = (navigator.brave && await navigator.brave.isBrave());
        
        // Detect if the OS is macOS
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        if (isBrave && isMac) {
            // Append these classes to the root <html> element before React loads
            document.documentElement.classList.add('brave-browser');
            document.documentElement.classList.add('mac-os');
        }
    } catch (e) {
        console.error("Error executing Brave fallback detection:", e);
    }
})();
