const categories = [
    { id: 'phone', icon: 'ph-phone', label: 'Phone' },
    { id: 'printer', icon: 'ph-printer', label: 'Printer' },
    { id: 'computer', icon: 'ph-desktop', label: 'Computer' },
    { id: 'networking', icon: 'ph-wifi-high', label: 'Networking' },
    { id: 'hardware', icon: 'ph-cpu', label: 'Hardware' },
    { id: 'software', icon: 'ph-app-window', label: 'Software' },
    { id: 'on-site', icon: 'ph-map-pin', label: 'On-Site' },
    { id: 'modules', icon: 'ph-book-open', label: 'Modules' }
];

const defaultPhrases = [
    // Phone Support Specific
    // (Removed General category greetings as per request)
    // (Categories now focus on technical support and study modules)

    // Phone (VoIP, Mobile, Teams/Zoom)
    { id: 'ph1', category: 'phone', text: "Can you hear me clearly?", tags: ['audio', 'hear', 'voice', 'clear'] },
    { id: 'ph2', category: 'phone', text: "I'm having a little trouble hearing you, could you please speak closer to the microphone?", tags: ['volume', 'quiet', 'microphone', 'trouble'] },
    { id: 'ph3', category: 'phone', text: "Are you using a headset or the built-in speaker?", tags: ['headset', 'speaker', 'audio', 'device'] },
    { id: 'ph4', category: 'phone', text: "Are you connected to the VPN on your mobile device?", tags: ['vpn', 'mobile', 'phone', 'connection'] },
    { id: 'ph5', category: 'phone', text: "Let's check the volume settings on your softphone application.", tags: ['softphone', 'volume', 'settings', 'teams', 'zoom'] },
    { id: 'ph6', category: 'phone', text: "Please try unplugging your headset from the USB port and plugging it back in.", tags: ['unplug', 'headset', 'usb', 'replug'] },
    { id: 'ph7', category: 'phone', text: "Is the mute button toggled on your headset cable?", tags: ['mute', 'button', 'cable', 'headset'] },
    { id: 'ph8', category: 'phone', text: "Are you experiencing dropped calls frequently?", tags: ['drop', 'call', 'frequent', 'voip'] },

    // Computer (Windows, Mac, Peripherals)
    { id: 'c1', category: 'computer', text: "Let’s try restarting the device first.", tags: ['restart', 'reboot', 'power', 'device'] },
    { id: 'c2', category: 'computer', text: "Is the computer turned on and plugged into a power source?", tags: ['power', 'plug', 'on', 'cable'] },
    { id: 'c3', category: 'computer', text: "Are you seeing any error messages on the screen? If so, what do they say?", tags: ['error', 'message', 'screen', 'read'] },
    { id: 'c4', category: 'computer', text: "Could you please open the Task Manager (or Activity Monitor) and tell me if any program is using high CPU?", tags: ['task manager', 'cpu', 'memory', 'slow', 'program'] },
    { id: 'c5', category: 'computer', text: "Let's check if there are any pending OS updates.", tags: ['update', 'windows', 'mac', 'pending'] },
    { id: 'c6', category: 'computer', text: "What color is the light on your monitor's power button?", tags: ['monitor', 'screen', 'light', 'button', 'display'] },
    { id: 'c7', category: 'computer', text: "Is your laptop plugged into the docking station correctly?", tags: ['laptop', 'dock', 'station', 'plug'] },
    { id: 'c8', category: 'computer', text: "Hold down the power button for 10 seconds to force the computer to turn off.", tags: ['force', 'power', 'button', 'hold', 'off'] },
    { id: 'c9', category: 'computer', text: "Please let me know your computer's hostname or asset tag.", tags: ['hostname', 'asset tag', 'name', 'identify'] },
    { id: 'c10', category: 'computer', text: "Can you try pressing Ctrl + Alt + Delete?", tags: ['ctrl', 'alt', 'delete', 'task', 'lock'] },

    // Printer
    { id: 'p1', category: 'printer', text: "Is the printer turned on and displaying any error lights?", tags: ['printer', 'power', 'light', 'error', 'lcd'] },
    { id: 'p2', category: 'printer', text: "Please check if there is enough paper in the tray and no paper jams.", tags: ['paper', 'jam', 'tray', 'empty'] },
    { id: 'p3', category: 'printer', text: "Is the printer connected via USB cable or Wi-Fi?", tags: ['connection', 'usb', 'wifi', 'cable', 'network'] },
    { id: 'p4', category: 'printer', text: "Let's try clearing the print queue and restarting the print spooler service.", tags: ['queue', 'spooler', 'stuck', 'clear', 'service'] },
    { id: 'p5', category: 'printer', text: "Are the toner or ink cartridges empty according to the display panel?", tags: ['toner', 'ink', 'cartridge', 'empty'] },
    { id: 'p6', category: 'printer', text: "Can you print a test page directly from the printer's menu?", tags: ['test', 'page', 'menu', 'direct'] },
    { id: 'p7', category: 'printer', text: "Which printer is currently set as your default device?", tags: ['default', 'printer', 'set', 'device'] },
    { id: 'p8', category: 'printer', text: "Let's remove the printer from your settings and re-add it.", tags: ['remove', 'delete', 'add', 'settings'] },

    // Networking
    { id: 'n1', category: 'networking', text: "Please check if the network cable is properly connected to your computer and the wall jack.", tags: ['cable', 'ethernet', 'router', 'plug', 'wall'] },
    { id: 'n2', category: 'networking', text: "Are you connected to the Wi-Fi or using a wired connection?", tags: ['wifi', 'wired', 'connection', 'wireless'] },
    { id: 'n3', category: 'networking', text: "Let's try restarting your router. Please unplug it for 30 seconds and plug it back in.", tags: ['router', 'restart', 'reboot', 'modem'] },
    { id: 'n4', category: 'networking', text: "Could you tell me what color the lights on your router are right now?", tags: ['router', 'lights', 'internet', 'modem'] },
    { id: 'n5', category: 'networking', text: "Are you successfully connected to the company VPN?", tags: ['vpn', 'connect', 'company', 'network'] },
    { id: 'n6', category: 'networking', text: "Are other devices in your home/office able to access the internet?", tags: ['other', 'devices', 'internet', 'access'] },
    { id: 'n7', category: 'networking', text: "Let's open the command prompt and ping a website to check connectivity.", tags: ['command', 'prompt', 'ping', 'website', 'cmd'] },
    { id: 'n8', category: 'networking', text: "Can you see the Wi-Fi icon in the bottom right corner of your screen?", tags: ['wifi', 'icon', 'corner', 'taskbar'] },
    { id: 'n9', category: 'networking', text: "Please check if 'Flight Mode' is accidentally turned on.", tags: ['flight mode', 'airplane', 'wireless', 'off'] },

    // Hardware
    { id: 'h1', category: 'hardware', text: "Do you hear any unusual noises coming from the machine, like clicking or grinding?", tags: ['noise', 'sound', 'fan', 'drive', 'hdd'] },
    { id: 'h2', category: 'hardware', text: "Could you unplug all peripheral devices except the keyboard and mouse and try again?", tags: ['unplug', 'devices', 'usb', 'peripheral'] },
    { id: 'h3', category: 'hardware', text: "Is the battery completely drained? Let's leave it plugged in for 15 minutes before turning it on.", tags: ['battery', 'charge', 'drain', 'plug'] },
    { id: 'h4', category: 'hardware', text: "Have you spilled any liquids on the keyboard or device recently?", tags: ['spill', 'liquid', 'water', 'keyboard', 'damage'] },
    { id: 'h5', category: 'hardware', text: "Let me arrange a replacement part for you.", tags: ['replace', 'part', 'hardware', 'arrange'] },
    { id: 'h6', category: 'hardware', text: "Does the mouse light up when you move it or click?", tags: ['mouse', 'light', 'laser', 'click', 'move'] },
    { id: 'h7', category: 'hardware', text: "Is the DisplayPort or HDMI cable firmly connected to the back of the monitor?", tags: ['displayport', 'hdmi', 'cable', 'monitor', 'back'] },

    // Software
    { id: 's1', category: 'software', text: "Have you installed any new software or updates recently?", tags: ['new', 'install', 'update', 'recent'] },
    { id: 's2', category: 'software', text: "Let's try completely closing the application and opening it again.", tags: ['close', 'open', 'app', 'reopen'] },
    { id: 's3', category: 'software', text: "Please make sure you are running the latest version of the software.", tags: ['latest', 'version', 'update', 'check'] },
    { id: 's4', category: 'software', text: "Can you try clearing the cache and cookies in your web browser?", tags: ['cache', 'cookies', 'browser', 'clear', 'history'] },
    { id: 's5', category: 'software', text: "Let's repair the installation from the Control Panel.", tags: ['repair', 'install', 'control panel', 'settings'] },
    { id: 's6', category: 'software', text: "Are you getting a license expiration or activation error?", tags: ['license', 'expire', 'activation', 'error'] },
    { id: 's7', category: 'software', text: "Let's check if the antivirus is blocking the application from running.", tags: ['antivirus', 'block', 'firewall', 'security'] },
    { id: 's8', category: 'software', text: "Does this issue happen in a different web browser, like Chrome or Edge?", tags: ['browser', 'chrome', 'edge', 'different', 'test'] },
    { id: 's9', category: 'software', text: "Let's reset your password and see if that lets you log in.", tags: ['password', 'reset', 'login', 'account', 'access'] },

    // --- Structured Support Scripts (High CSAT) ---
    // Internet
    { id: 'int1', category: 'networking', text: "Are you experiencing complete Wi-Fi drops or is it just running slow? (Discovery)", tags: ['wifi', 'drop', 'slow', 'discovery'] },
    { id: 'int2', category: 'networking', text: "Let's try resetting your network adapter and flushing the DNS cache to clear any temporary blocks. (Troubleshooting)", tags: ['dns', 'flush', 'adapter', 'troubleshooting'] },
    { id: 'int3', category: 'networking', text: "I've optimized your connection settings. Is your speed back to normal now? I've also emailed you a guide on positioning your router for better coverage. (Closing/Value-Add)", tags: ['closing', 'value-add', 'guide', 'optimize'] },

    // Printers
    { id: 'prn1', category: 'printer', text: "Is the printer showing as 'Offline' on your computer, or does it say there's a paper jam? (Discovery)", tags: ['offline', 'jam', 'discovery'] },
    { id: 'prn2', category: 'printer', text: "Let's clear the print spooler and restart the service to 'wake up' the connection. (Troubleshooting)", tags: ['spooler', 'restart', 'troubleshooting'] },
    { id: 'prn3', category: 'printer', text: "The printer is back online! I've set it as your default device to prevent future confusion. Do you need a quick demo on how to clear jams safely? (Closing/Value-Add)", tags: ['closing', 'value-add', 'demo'] },

    // Phones/Mobile
    { id: 'mbl1', category: 'phone', text: "Is the app crashing immediately upon opening, or are your emails just not syncing? (Discovery)", tags: ['crash', 'sync', 'discovery'] },
    { id: 'mbl2', category: 'phone', text: "Let's try clearing the app cache and re-verifying your account credentials. (Troubleshooting)", tags: ['cache', 'credentials', 'troubleshooting'] },
    { id: 'mbl3', category: 'phone', text: "Your sync is restored! I've also enabled 'Low Data Mode' to help save your battery life while on the go. Is there any other app giving you trouble? (Closing/Value-Add)", tags: ['closing', 'value-add', 'battery'] },

    // Hardware
    { id: 'hwd1', category: 'hardware', text: "When you press the power button, do you hear any fans spinning, or is it completely silent? (Discovery)", tags: ['power', 'fans', 'discovery'] },
    { id: 'hwd2', category: 'hardware', text: "Please unplug the power cable and hold the power button for 30 seconds to drain any static electricity. (Troubleshooting)", tags: ['power', 'drain', 'static', 'troubleshooting'] },
    { id: 'hwd3', category: 'hardware', text: "It's powered on now! I've checked your battery health and it looks good. I recommend a surge protector to prevent this in the future. Can I help with anything else? (Closing/Value-Add)", tags: ['closing', 'value-add', 'surge'] },

    // Software
    { id: 'swr1', category: 'software', text: "Is the application freezing during a specific task, or did this start after a recent Windows update? (Discovery)", tags: ['freeze', 'update', 'discovery'] },
    { id: 'swr2', category: 'software', text: "Let's try running the application in Compatibility Mode and checking for any pending software patches. (Troubleshooting)", tags: ['compatibility', 'patch', 'troubleshooting'] },
    { id: 'swr3', category: 'software', text: "The app is running smoothly again. I've scheduled your updates for outside business hours so they don't interrupt your work. Ready to get back to it? (Closing/Value-Add)", tags: ['closing', 'value-add', 'schedule'] },

    // --- Modules: Tech Support Knowledge ---
    { id: 'mod1', category: 'modules', text: "What is Tech Support? It is the act of providing assistance to users of technology products such as mobile phones, computers, software, or other electronic/mechanical goods.", tags: ['definition', 'support', 'about'] },
    { id: 'mod2', category: 'modules', text: "The Goal of Tech Support: To ensure the customer is empowered and their technical issue is resolved with minimal friction and maximum satisfaction (High CSAT).", tags: ['goal', 'csat', 'mission'] },
    { id: 'mod3', category: 'modules', text: "Active Listening: Don't just hear the words; understand the frustration and the context. Let the customer finish speaking before jumping to a solution.", tags: ['soft skills', 'listening', 'communication'] },
    { id: 'mod4', category: 'modules', text: "Documentation Priority: If it isn't documented, it never happened. Always log your steps, the resolution, and any future follow-up needed in the ticketing system.", tags: ['documentation', 'logging', 'professionalism'] },
    { id: 'mod5', category: 'modules', text: "The 'Golden Rule' of IT: Never make the customer feel small for not knowing something. Our job is to bridge the gap between complex tech and the user.", tags: ['empathy', 'ethics', 'professionalism'] },
    { id: 'mod6', category: 'modules', text: "SLA (Service Level Agreement): Understand the timeframes you are committed to. Prioritize critical business-stopper issues over minor aesthetic bugs.", tags: ['sla', 'priority', 'business'] },

    // --- On-Site Specific (Field Troubleshooting & Physical Actions) ---
    // Phone On-Site
    { id: 'os_ph1', category: 'phone', text: "Reseat the RJ11/RJ45 cable in the phone base and wall jack.", tags: ['reseat', 'cable', 'phone', 'onsite'] },
    { id: 'os_ph2', category: 'phone', text: "Swap the handset curly cord with a known-working one.", tags: ['handset', 'cord', 'onsite'] },
    { id: 'os_ph3', category: 'phone', text: "Verify PoE status on the network switch port for this desk.", tags: ['poe', 'switch', 'port', 'onsite'] },
    
    // Printer On-Site
    { id: 'os_pr1', category: 'printer', text: "Open all maintenance doors and use a flashlight to check for small paper remnants.", tags: ['jam', 'remnant', 'door', 'onsite'] },
    { id: 'os_pr2', category: 'printer', text: "Clean the pickup rollers with a lint-free cloth and isopropyl alcohol.", tags: ['clean', 'rollers', 'maintenance', 'onsite'] },
    { id: 'os_pr3', category: 'printer', text: "Check for physical damage on the fuser unit or transfer belt.", tags: ['fuser', 'transfer', 'damage', 'onsite'] },
    
    // Computer/Hardware On-Site
    { id: 'os_h1', category: 'hardware', text: "Perform a 'flea power' drain: Unplug and hold the power button for 30s.", tags: ['flea', 'power', 'static', 'drain', 'onsite'] },
    { id: 'os_h2', category: 'hardware', text: "Reseat RAM modules and GPU if the system fails to POST.", tags: ['ram', 'gpu', 'post', 'reseat', 'onsite'] },
    { id: 'os_h3', category: 'hardware', text: "Use a multimeter to verify 12V/5V/3.3V rails on the PSU.", tags: ['multimeter', 'psu', 'rails', 'power', 'onsite'] },
    
    // Networking On-Site
    { id: 'os_n1', category: 'networking', text: "Use a toner and probe to trace the cable from the wall jack to the patch panel.", tags: ['toner', 'probe', 'trace', 'onsite'] },
    { id: 'os_n2', category: 'networking', text: "Inspect the fiber patch cables for tight bends or cracks.", tags: ['fiber', 'bend', 'inspect', 'onsite'] },
    { id: 'os_n3', category: 'networking', text: "Verify the link light status on the MDF core switch.", tags: ['mdf', 'switch', 'link', 'light', 'onsite'] },

    // Software/OS On-Site
    { id: 'os_s1', category: 'software', text: "Boot into Safe Mode with Networking to isolate driver conflicts.", tags: ['safe mode', 'driver', 'isolate', 'onsite'] },
    { id: 'os_s2', category: 'software', text: "Use a bootable PE environment to run offline disk diagnostics.", tags: ['pe', 'bootable', 'diagnostics', 'onsite'] }
];

// --- Modules Study Guide Content ---
const modulesContent = [
    {
        id: 'mod_mindset',
        title: 'The Support Mindset',
        image: 'assets/images/mod_mindset.png',
        description: 'Being an effective tech support agent isn\'t just about technical knowledge; it\'s about empathy and communication.',
        sections: [
            {
                heading: 'Empathy over Ego',
                text: 'Never make the user feel like their question is "stupid". Your goal is to be a partner in their frustration, not a judge of their technical skill.',
                examples: [
                    { label: 'Avoid', text: '"It\'s obviously just your router, did you even check it?"', type: 'bad' },
                    { label: 'Try', text: '"I understand how frustrating it is when the connection drops. Let\'s check the router together."', type: 'good' }
                ]
            },
            {
                heading: 'Active Listening',
                text: 'Let the user explain their entire problem before interrupting. Often, the most important detail is the last thing they say.',
                keyPoints: ['Do not multi-task while listening', 'Summarize the issue back to the user', 'Acknowledge their effort']
            }
        ]
    },
    {
        id: 'mod_osi',
        title: 'The OSI Troubleshooting Framework',
        image: 'assets/images/mod_osi.png',
        description: 'The Open Systems Interconnection (OSI) model is the standard framework for understanding network communication. In troubleshooting, we use it to isolate problems systematically.',
        sections: [
            {
                heading: 'Layer 1: The Physical Layer',
                text: 'Everything starts with hardware. If the cable is unplugged, no software fix in the world will help.',
                keyPoints: ['Power status', 'Cable integrity', 'Port indicator lights']
            },
            {
                heading: 'The Bottom-Up Approach',
                text: 'Always start at Layer 1. Checking software settings (Layer 7) before checking if the device is powered on (Layer 1) is the most common cause of wasted time.',
                examples: [
                    { label: 'Wait', text: 'Reinstalling its drivers before checking the USB cable.', type: 'bad' },
                    { label: 'Check First', text: 'Reseating the cable and testing a different port.', type: 'good' }
                ]
            }
        ]
    },
    {
        id: 'mod_documentation',
        title: 'Documentation & Ownership',
        image: 'assets/images/mod_documentation.png',
        description: 'If it isn\'t documented, it never happened. Documentation is your defense and your legacy for the next technician.',
        sections: [
            {
                heading: 'Naming Conventions',
                text: 'Use clear, searchable ticket titles and detailed internal notes.',
                examples: [
                    { label: 'Bad Note', text: '"Fixed it."', type: 'bad' },
                    { label: 'Good Note', text: '"Reseated CAT6 cable in Port 4. Verified link light. Connection restored for workstation A01."', type: 'good' }
                ]
            }
        ]
    },
    {
        id: 'mod_site_survey',
        title: 'The On-Site Site Survey',
        image: 'assets/images/mod_site_survey.png',
        description: 'Before touching anything, you must understand the environment. A site survey prevents "surprises" during a repair.',
        sections: [
            {
                heading: 'Physical Assessment',
                text: 'Identify power outlets, network jacks, and potential obstructions. Check for safety hazards like loose floorboards or unmanaged cables.',
                keyPoints: ['Power availability', 'Network jack locations', 'Environmental conditions (Heat/Dust)']
            },
            {
                heading: 'The Workspace',
                text: 'Clear a clean area for your tools and any hardware you need to open. Never work on a cluttered or liquid-prone surface.',
                examples: [
                    { label: 'Risky', text: 'Opening a server on top of a stack of old boxes.', type: 'bad' },
                    { label: 'Professional', text: 'Using a dedicated technician table or a cleared workbench.', type: 'good' }
                ]
            }
        ]
    },
    {
        id: 'mod_rack_management',
        title: 'Network Rack Management',
        image: 'assets/images/mod_rack_management.png',
        description: 'The rack is the heart of the network. Proper management ensures long-term stability and easier troubleshooting.',
        sections: [
            {
                heading: 'Cable Grooming',
                text: 'Use Velcro ties instead of zip ties. Zip ties can crush the delicate copper pairs inside CAT6 cables.',
                keyPoints: ['Label both ends of every cable', 'Avoid tight bends', 'Separate power from data cables']
            },
            {
                heading: 'Rack Airflow',
                text: 'Ensure intake and exhaust fans are clear. Heat is the #1 killer of switch and server hardware.',
                examples: [
                    { label: 'Common Error', text: 'Blocking exhaust ports with excess cable slack.', type: 'bad' },
                    { label: 'Best Practice', text: 'Using side managers for slack and maintaining a clear path for air.', type: 'good' }
                ]
            }
        ]
    },
    {
        id: 'mod_field_tools',
        title: 'Tools of the Trade (Field)',
        image: 'assets/images/mod_field_tools.png',
        description: 'Having the right tools differentiates a hobbyist from a professional field technician.',
        sections: [
            {
                heading: 'Essential Field Kit',
                text: 'Your bag should always be ready for the most common physical failures.',
                keyPoints: ['Toner & Probe (for tracing cables)', 'Crimping tool & RJ45 ends', 'Multi-bit screwdriver', 'ESD Wrist Strap']
            },
            {
                heading: 'Diagnostic Hardware',
                text: 'Don\'t guess—verify. Use a basic continuity tester for cables and a multimeter for power issues.',
                examples: [
                    { label: 'Guessing', text: 'Replacing a cable because "it looks old".', type: 'bad' },
                    { label: 'Verifying', text: 'Testing cable continuity and verifying it meets Cat6 standards.', type: 'good' }
                ]
            }
        ]
    },
    {
        id: 'mod_field_etiquette',
        title: 'On-Site Professionalism',
        image: 'assets/images/mod_field_etiquette.png',
        description: 'How you carry yourself on-site is as important as how you fix the tech.',
        sections: [
            {
                heading: 'The "Clean Exit"',
                text: 'Never leave a mess. Pick up your cable clippings, zip tie stubs, and dust from drilling.',
                keyPoints: ['Clean up your workspace', 'Re-zip or Velcro anything you moved', 'Verify everything is back in place']
            },
            {
                heading: 'Client Interaction',
                text: 'Explain what you did in plain English. Avoid deep technical jargon unless the client is also an IT professional.',
                examples: [
                    { label: 'Confusing', text: '"I re-terminated the drop because it had high attenuation."', type: 'bad' },
                    { label: 'Clear', text: '"I fixed the wall connection because the wires were slightly loose."', type: 'good' }
                ]
            }
        ]
    }
];

// --- Professional Utilities Data ---
const commonPorts = [
    { port: '20/21', service: 'FTP', desc: 'File Transfer Protocol' },
    { port: '22', service: 'SSH', desc: 'Secure Shell (Remote Access)' },
    { port: '23', service: 'Telnet', desc: 'Unencrypted Remote Access' },
    { port: '25', service: 'SMTP', desc: 'Simple Mail Transfer Protocol' },
    { port: '53', service: 'DNS', desc: 'Domain Name System' },
    { port: '80', service: 'HTTP', desc: 'Hypertext Transfer Protocol' },
    { port: '110', service: 'POP3', desc: 'Post Office Protocol v3' },
    { port: '143', service: 'IMAP', desc: 'Internet Message Access Protocol' },
    { port: '443', service: 'HTTPS', desc: 'HTTP Secure' },
    { port: '445', service: 'SMB', desc: 'Server Message Block (Windows File Sharing)' },
    { port: '548', service: 'AFP', desc: 'Apple Filing Protocol' },
    { port: '3389', service: 'RDP', desc: 'Remote Desktop Protocol' },
    { port: '5900', service: 'VNC', desc: 'Virtual Network Computing' },
    { port: '8080', service: 'HTTP Proxy', desc: 'Common Proxy/Alt HTTP' }
];

const quickFixes = [
    {
        title: 'Network: DNS Flush & IP Reset',
        desc: 'Fixes "No Internet" when hardware is okay.',
        commands: 'ipconfig /flushdns\nipconfig /release\nipconfig /renew\nnetsh winsock reset',
        category: 'networking'
    },
    {
        title: 'Windows: System File Checker',
        desc: 'Repair corrupted OS files.',
        commands: 'sfc /scannow\ndism /online /cleanup-image /restorehealth',
        category: 'system'
    },
    {
         title: 'Outlook: Clear Cache',
         desc: 'Fixes slow Outlook or sync errors.',
         commands: 'Close Outlook\nDel %localappdata%\\Microsoft\\Outlook\\RoamCache\\* /q',
         category: 'software'
    },
    {
        title: 'Printer: Clear Spooler',
        desc: 'Fixes stuck print jobs.',
        commands: 'net stop spooler\ndel /Q /F /S "%systemroot%\\System32\\Spool\\Printers\\*.*"\nnet start spooler',
        category: 'printer'
    }
];

const supportTools = {
    checklists: [
        {
            id: 'chk_computer',
            title: 'Computer Issues',
            icon: 'ph-desktop',
            items: [
                '[L1] Restart system (Physical)',
                '[L7] Check Task Manager for high CPU/RAM (Application)',
                '[L4] Check for pending Windows/macOS Updates (Transport/System)',
                '[L7] Verify system storage isn\'t full (Application)',
                '[L7] Check Event Viewer for critical errors (Application)',
                '[L1] Run hardware diagnostics (F12 at boot) (Physical)',
                '[L7] Check for malware/virus scans (Application)'
            ]
        },
        {
            id: 'chk_printer',
            title: 'Printer Issues',
            icon: 'ph-printer',
            items: [
                '[L1] Check power and status LCD/lights (Physical)',
                '[L1] Check for paper jams (Physical)',
                '[L7] Verify ink/toner levels (Application)',
                '[L4] Clear print spooler/queue (services.msc) (Transport/System)',
                '[L7] Reinstall or update printer driver (Application)',
                '[L1] Print a test page directly from printer (Physical)',
                '[L3] Check IP connectivity (Ping printer IP) (Network)'
            ]
        },
        {
            id: 'chk_network',
            title: 'Networking Issues',
            icon: 'ph-wifi-high',
            items: [
                '[L1] Restart the router/modem/access point (Physical)',
                '[L1] Verify physical cable connections (Physical)',
                '[L3] Check IP address (ipconfig or ifconfig) (Network)',
                '[L3] Ping 8.8.8.8 to test external connectivity (Network)',
                '[L2] Disable/enable the network adapter (Data Link)',
                '[L3] Check VPN status/credentials (Network)',
                '[L3] Flush DNS cache (Network)'
            ]
        },
        {
            id: 'chk_software',
            title: 'Software / App Issues',
            icon: 'ph-app-window',
            items: [
                '[L7] Force close and restart the application (Application)',
                '[L7] Clear browser cache/cookies (Application)',
                '[L7] Check for app updates/patches (Application)',
                '[L7] Run as Administrator (Application)',
                '[L7] Repair installation via Control Panel (Application)',
                '[L7] Check for Windows/OS compatibility mode (Application)',
                '[L7] Verify license/activation status (Application)'
            ]
        },
        {
            id: 'chk_phone',
            title: 'Phone / VoIP Issues',
            icon: 'ph-phone',
            items: [
                '[L1] Verify device volume and mute status (Physical)',
                '[L7] Test microphone on another app (Application)',
                '[L3] Check network/VPN connection (Network)',
                '[L7] Restart softphone application (Application)',
                '[L1] Unplug and replug the USB headset (Physical)',
                '[L7] Check for VoIP app updates (Application)'
            ]
        },
        {
            id: 'chk_hardware',
            title: 'Hardware Issues',
            icon: 'ph-cpu',
            items: [
                '[L1] Unplug unnecessary peripherals (Physical)',
                '[L7] Check device temperatures/cooling fans (Application/System)',
                '[L1] Verify all cables are securely seated (Physical)',
                '[L1] Run built-in hardware diagnostics tool (Physical)',
                '[L1] Test on another power outlet (Physical)',
                '[L1] Check for physical damage (spills, drops) (Physical)'
            ]
        },
        {
            id: 'chk_general',
            title: 'General Support Steps',
            icon: 'ph-chats',
            items: [
                'Verify client identity and ticket number',
                'Document the exact error message',
                'Ask about recent changes or installations',
                'Request a screenshot or screenshare',
                'Attempt remote desktop session if needed',
                'Isolate the issue scope (one user vs all)',
                'Log steps/resolution in the ticketing system'
            ]
        }
    ],
    commands: [
        {
            platform: 'Windows Network',
            icon: 'ph-windows-logo',
            items: [
                { cmd: 'ipconfig', desc: 'Display basic IP configuration' },
                { cmd: 'ipconfig /all', desc: 'Display full IP configuration' },
                { cmd: 'ipconfig /release', desc: 'Release IPv4 address' },
                { cmd: 'ipconfig /renew', desc: 'Renew IPv4 address' },
                { cmd: 'ipconfig /flushdns', desc: 'Purge DNS Resolver cache' },
                { cmd: 'ping 8.8.8.8', desc: 'Test internet connection (Google DNS)' },
                { cmd: 'ping google.com -t', desc: 'Continuous ping to Google' },
                { cmd: 'tracert google.com', desc: 'Trace route to destination' },
                { cmd: 'nslookup google.com', desc: 'DNS lookup' },
                { cmd: 'netstat -an', desc: 'Display all network connections' }
            ]
        },
        {
            platform: 'Windows System / Admin',
            icon: 'ph-windows-logo',
            items: [
                { cmd: 'sfc /scannow', desc: 'Scan and repair system files' },
                { cmd: 'dism /online /cleanup-image /restorehealth', desc: 'Repair Windows image' },
                { cmd: 'chkdsk /f /r', desc: 'Check disk for errors & recover' },
                { cmd: 'taskmgr', desc: 'Open Task Manager' },
                { cmd: 'services.msc', desc: 'Open Services window' },
                { cmd: 'appwiz.cpl', desc: 'Open Programs and Features' },
                { cmd: 'ncpa.cpl', desc: 'Open Network Connections' },
                { cmd: 'compmgmt.msc', desc: 'Open Computer Management' },
                { cmd: 'eventvwr.msc', desc: 'Open Event Viewer' },
                { cmd: 'gpupdate /force', desc: 'Force Group Policy update' },
                { cmd: 'systeminfo', desc: 'Display computer properties' }
            ]
        },
        {
            platform: 'macOS Terminal',
            icon: 'ph-apple-logo',
            items: [
                { cmd: 'ifconfig', desc: 'Display network config' },
                { cmd: 'ping 8.8.8.8', desc: 'Test internet connection' },
                { cmd: 'sudo killall coreaudiod', desc: 'Restart audio service' },
                { cmd: 'networksetup -listallhardwareports', desc: 'List network hardware' },
                { cmd: 'uptime', desc: 'Check system uptime' },
                { cmd: 'sudo softwareupdate -i -a', desc: 'Install all software updates' }
            ]
        }
    ],
    diagnosisQuestions: [
        "When did the issue exactly start happening?",
        "Did you install anything recently before the issue began?",
        "Are any other users or devices in the office experiencing the same issue?",
        "Is there a specific error message or error code on the screen?",
        "Does the issue happen every time you perform a specific action?",
        "Have you tried restarting the device or the application yet?",
        "Are you currently connected to the office VPN or local network?",
        "Have you changed any passwords recently?",
        "Were there any power outages or internet drops recently?",
        "Is this a company-issued device or a personal device?"
    ],
    freelanceToolkit: [
        {
            category: 'Remote Desktop',
            icon: 'ph-monitor-play',
            tools: [
                { name: 'AnyDesk', desc: 'Fast and secure remote access for clients.', url: 'https://anydesk.com' },
                { name: 'RustDesk', desc: 'Open-source remote desktop, great alternative for freelancers.', url: 'https://rustdesk.com' },
                { name: 'TeamViewer', desc: 'Comprehensive remote support and collaboration tool.', url: 'https://teamviewer.com' }
            ]
        },
        {
            category: 'Hardware Diagnostic',
            icon: 'ph-cpu',
            tools: [
                { name: 'HWInfo', desc: 'Deep hardware analysis, monitoring, and reporting.', url: 'https://hwinfo.com' },
                { name: 'MemTest86', desc: 'The gold standard for RAM testing.', url: 'https://memtest86.com' },
                { name: 'CrystalDiskInfo', desc: 'Check HDD/SSD health and temperatures.', url: 'https://crystalmark.info' }
            ]
        },
        {
            category: 'Network Testing',
            icon: 'ph-broadcast',
            tools: [
                { name: 'PingPlotter', desc: 'Visual network troubleshooting and monitoring.', url: 'https://pingplotter.com' },
                { name: 'Wireshark', desc: 'World\'s foremost network protocol analyzer.', url: 'https://wireshark.org' },
                { name: 'GlassWire', desc: 'Network monitor and security tool with a built-in firewall.', url: 'https://glasswire.com' }
            ]
        },
        {
            category: 'Productivity & Documentation',
            icon: 'ph-notebook',
            tools: [
                { name: 'Notion', desc: 'Versatile workspace for notes, tasks, and documentation.', url: 'https://notion.so' },
                { name: 'Obsidian', desc: 'Powerful knowledge base that works on top of local Markdown files.', url: 'https://obsidian.md' },
                { name: 'Trello', desc: 'Visual task management using boards and cards.', url: 'https://trello.com' }
            ]
        },
        {
            category: 'Misc Freelance Essentials',
            icon: 'ph-briefcase',
            tools: [
                { name: 'Ventoy', desc: 'Create bootable USB for multiple ISOs (OS installers, tools).', url: 'https://ventoy.net' },
                { name: 'Nite', desc: 'Install and update all your core apps at once.', url: 'https://ninite.com' }
            ]
        }
    ],
    osiModel: [
        { layer: 7, name: 'Application', focus: 'User Interface / Network Services', checks: 'App status, Auth, APIs' },
        { layer: 6, name: 'Presentation', focus: 'Data Translation / Encryption', checks: 'Encoding, SSL/TLS, Syntax' },
        { layer: 5, name: 'Session', focus: 'Comms Management', checks: 'Session start/stop, Auth control' },
        { layer: 4, name: 'Transport', focus: 'End-to-End Connection / Reliability', checks: 'TCP/UDP, Ports, Flow control' },
        { layer: 3, name: 'Network', focus: 'Path Determination / IP', checks: 'IP addressing, Routing, ICMP (Ping)' },
        { layer: 2, name: 'Data Link', focus: 'Physical Addressing / MAC', checks: 'Switches, MAC addresses, VLANs' },
        { layer: 1, name: 'Physical', focus: 'Hardware / Cables / Electricity', checks: 'Cables, PoE, SFPs, Power lights' }
    ]
};
const callFlowData = {
    greeting: "Hi! Thank you for calling Tech Support. My name is Cris, how can I help you today?",
    steps: [
        {
            id: 'step1',
            title: 'Step 1: Opening & Verification',
            items: [
                'Greeting (Professional & Friendly)',
                'Active Listening (Let the customer speak)',
                'Verify Customer Name',
                'Verify Email Address',
                'Verify Account / Asset ID',
                'Identify Device Model / OS',
            ],
            hasNotes: true
        },
        {
            id: 'step2',
            title: 'Step 2: Empathy & Clarification',
            items: [
                'Empathy Statement: "I understand how frustrating that can be. Let\'s work together to fix this."',
                'Formula: Listen - Clarify - Solve - Confirm',
                'Clarifying Questions (No Jargon: "Router settings update" instead of "DHCP conflict")',
            ],
            hasClarification: true
        },
        {
            id: 'step3',
            title: 'Step 3: Troubleshooting (OSI Method)',
            items: [
                'Layer 1: Physical (Check Cables / Power)',
                'Layer 2: Datalink (Check Connection / WiFi)',
                'Layer 3: Network (Ping / IP Check)',
                'Layer 4: Transport (Software Update / Reset)',
                'Layer 7: Application (Restart App / Clear Cache)',
            ]
        },
        {
            id: 'step4',
            title: 'Step 4: Closing',
            items: [
                'Confirm Resolution (Is the issue fixed?)',
                'Summarize Steps Taken',
                'Offer Additional Assistance',
                'One-Transfer Rule: "Only transfer if truly needed; don\'t leave until connected."',
                'Professional Sign-off',
            ]
        }
    ]
};

const openingScripts = {
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
        '[L1: Physical] Could you please check if the VoIP power and Ethernet cables are securely plugged into the back of the phone and the wall jack?',
        '[L2: Data Link] Look at the network port on the phone; do you see a solid or blinking green light?',
        '[L3: Network] I\'m checking your internet stability on my end. Are you connected to the VPN on your computer?',
        '[L4: Transport] Let\'s verify if the softphone app needs an update or a restart to re-establish the transport connection.',
        '[L5: Session] I\'m going to reset your SIP session on the server side now, please wait 30 seconds.',
        '[L6: Presentation] Are you hearing any distortion or is the audio completely silent? (Checking codec/encryption).',
        '[L7: Application] Let\'s check the microphone and speaker settings within the Teams/Zoom application itself.'
    ],
    'printer': [
        '[L1: Physical] Please check the paper tray for jams and ensure the power cable and USB/Ethernet are firmly seated.',
        '[L2: Data Link] Is the "Ready" light on? If it\'s blinking amber, the printer might be failing to talk to the local switch.',
        '[L3: Network] I am attempting to ping the printer\'s IP address. Can you confirm if other people can print to it?',
        '[L4: Transport] I\'ll reset the Print Spooler service on your PC to clear any stuck data packets.',
        '[L5: Session] Let\'s try re-mapping the printer to start a fresh connection session with the print server.',
        '[L6: Presentation] If the printout is garbled text, it might be a driver (PDL) version mismatch. Let\'s check the driver name.',
        '[L7: Application] Can you try printing from a different application, like Notepad, instead of your web browser?'
    ],
    'computer': [
        '[L1: Physical] I\'d like you to perform a full power cycle by restarting your system and checking the power cord.',
        '[L2: Data Link] Does your computer recognize the peripherals (mouse/keyboard)? Is the Ethernet light blinking?',
        '[L3: Network] I\'m going to check your IP configuration (ipconfig) to see if you have a valid internal address.',
        '[L4: Transport] Let\'s check if there are any pending Windows Update patches that might be affecting system stability.',
        '[L5: Session] I\'ll verify if your user profile session is correctly authenticated with the Active Directory.',
        '[L6: Presentation] Check if your display settings or resolution were changed recently (Graphics translation).',
        '[L7: Application] Could you open Task Manager and tell me if you see any applications using high CPU or RAM?'
    ],
    'networking': [
        { 
            script: '[L1: Physical] Could you please power cycle your router and modem by unplugging them for 30 seconds?', 
            action: 'Self: Watch for pings or ISP heartbeat to drop/resume. Client: Physically toggles power.' 
        },
        { 
            script: '[L2: Data Link] Are there any red or orange lights on the router? This usually indicates a local handshake issue.', 
            action: 'Self: Check switch port status if accessible. Client: Inspects router LEDs.' 
        },
        { 
            script: '[L3: Network] I\'m going to flush your DNS and reset your IP configuration/Gateway connection now.', 
            action: 'Self: Run CMD commands via remote tool. Client: Observes connection status.' 
        },
        { 
            script: '[L4: Transport] I\'ll run a trace route (tracert) to see where the data packets are getting dropped.', 
            action: 'Self: Analyze hop latency. Client: Waits for diagnostic to complete.' 
        },
        { 
            script: '[L5: Session] I\'ll reset your ISP authentication session from my admin dashboard.', 
            action: 'Self: Trigger server-side session kill/refresh. Client: Re-logs if prompted.' 
        },
        { 
            script: '[L6: Presentation] Let\'s ensure your browser is using the correct SSL/TLS versions for secure web presentation.', 
            action: 'Self: Check browser security settings. Client: Navigates to test site.' 
        },
        { 
            script: '[L7: Application] Check if you are able to access a specific website or if all apps are failing to connect.', 
            action: 'Self: Verify web services status. Client: Tests multiple URLs/Apps.' 
        }
    ],
    'hardware': [
        '[L1: Physical] I\'d like you to reseat any external cables or components and check for power light status.',
        '[L2: Data Link] Check Device Manager to see if the hardware ID is recognized or showing a yellow exclamation.',
        '[L3: Network] (For Network Hardware) Can you verify the MAC address is showing in the ARP table?',
        '[L4: Transport] I\'ll check for a firmware update that might improve the data transfer reliability.',
        '[L5: Session] verify if the hardware requires a specific login or token to initialize its session.',
        '[L6: Presentation] Inspect the hardware output. If it\'s a monitor, is the color encoding correct?',
        '[L7: Application] Run the built-in diagnostic tool provided by the manufacturer.'
    ],
    'software': [
        '[L1: Physical] Check if your hard drive is making any clicking noises (Physical disk health).',
        '[L2: Data Link] Verify that your network adapter is enabled so the software can communicate.',
        '[L3: Network] Is your firewall blocking the application from reaching the database server?',
        '[L4: Transport] We might need to reinstall the application to fix corrupted transport DLL files.',
        '[L5: Session] Let\'s re-verify your software license and logout/login to refresh the session.',
        '[L6: Presentation] Check if the software requires a specific character encoding or encryption certificate.',
        '[L7: Application] Try clearing the application\'s cache or running it in Compatibility Mode.'
    ]
};

const onsiteProceduresMap = {
    'phone': [
        '[L1: Physical] Inspect for physical cable damage and reseat RJ11/RJ45 at both ends.',
        '[L2: Data Link] Verify PoE power delivery via network port light or PoE tester.',
        '[L3: Network] Verify if the device is receiving an IP address from the correct Voice VLAN.',
        '[L4: Transport] Check for high packet loss or jitter between the phone and the local gateway.',
        '[L5: Session] Monitor SIP registration status on the local PBX/Server.',
        '[L6: Presentation] Compare audio quality across different handsets to rule out speaker/mic hardware failure.',
        '[L7: Application] Perform a factory reset and re-provision the unit via the provisioning server.'
    ],
    'printer': [
        '[L1: Physical] Open all access panels and check for paper scraps using a flashlight.',
        '[L2: Data Link] Clean pickup rollers with alcohol and check for worn rollers/hardware gears.',
        '[L3: Network] Print a configuration page and verify its IP/Subnet matches the local printer VLAN.',
        '[L4: Transport] Check the server-side print queue for large, corrupted print jobs (spooler data).',
        '[L5: Session] Verify the printer has a reserved DHCP lease or static IP and is active on the network.',
        '[L6: Presentation] Check the paper type settings in the printer menu versus the actual loaded paper.',
        '[L7: Application] Update the printer firmware and run a calibration test print.'
    ],
    'computer': [
        '[L1: Physical] Open the chassis and check for loose connections (SATA, RAM, PSU cables).',
        '[L2: Data Link] Reseat RAM and GPU; check for dust obstruction in fans/heat sinks.',
        '[L3: Network] Connect a dedicated tester to the wall jack to verify continuity and speed.',
        '[L4: Transport] Use a bootable USB (WinPE) to run offline disk diagnostics and system file checks.',
        '[L5: Session] Verify Domain Controller connectivity to ensure user login sessions can be established.',
        '[L6: Presentation] Test with a known-working monitor to rule out graphics card or cable translation issues.',
        '[L7: Application] Re-image the device using the PXE boot deployment server if software corruption is severe.'
    ],
    'networking': [
        '[L1: Physical] Tone and probe the line from the wall jack to the patch panel; check for bad terminations.',
        '[L2: Data Link] Verify Link Aggregation (LACP) status on the core switch and spanning tree status.',
        '[L3: Network] Check for IP address conflicts on the subnet using an IP scanner.',
        '[L4: Transport] Analyze traffic for port-level blocking or high TCP retransmissions.',
        '[L5: Session] Inspect the firewall logs for dropped sessions or timed-out connections.',
        '[L6: Presentation] Verify SSL/TLS certificate validity for internal server presentation.',
        '[L7: Application] Monitor bandwidth usage to see if a specific application is saturating the link.'
    ],
    'hardware': [
        '[L1: Physical] Check for visual signs of overheating (discolored PCB, bulging capacitors).',
        '[L2: Data Link] Use a multimeter to check for ground-to-neutral voltage leakage or PSU rail stability.',
        '[L3: Network] Verify the device MAC is correctly whitelisted in the NAC (Network Access Control).',
        '[L4: Transport] Use an oscilloscope or logic analyzer if troubleshooting deep signal timing (Specialist).',
        '[L5: Session] Check the console logs for initialization/boot sequence timeouts.',
        '[L6: Presentation] Inspect physical output ports (HDMI/DP) for bent pins or debris.',
        '[L7: Application] Flash the BIOS/UEFI to the latest stable version.'
    ],
    'software': [
        '[L1: Physical] Verify the local disk health via S.M.A.R.T. status before troubleshooting OS/Files.',
        '[L2: Data Link] Check if the network driver is signed and correctly interacting with the hardware.',
        '[L3: Network] Verify proxy/firewall exceptions for the specific application backend URLs.',
        '[L4: Transport] Run a packet capture (Wireshark) to see if the app is sending data correctly.',
        '[L5: Session] Check the application database connection pool for exhausted connections.',
        '[L6: Presentation] Ensure local language/region settings (locale) match software requirements.',
        '[L7: Application] Check local Event Viewer for critical application crash dumps and logs.'
    ],
    'on-site': [
        '[L1: Physical] Document all physical assets (Serial Numbers/Asset Tags) in the area.',
        '[L2: Data Link] Map all network wall jacks to their respective patch panel ports.',
        '[L3: Network] Verify all critical equipment is connected to a functioning and monitored UPS.',
        '[L4: Transport] Inspect the fiber patch leads for cracks or sharp bends (VFL test).',
        '[L5: Session] Audit user access logs to the server room/IDF closets.',
        '[L6: Presentation] Ensure environmental monitoring (Temp/Humidity) is correctly presented on the dashboard.',
        '[L7: Application] Verify that the Site Survey documentation is updated in the central knowledge base.'
    ]
};
