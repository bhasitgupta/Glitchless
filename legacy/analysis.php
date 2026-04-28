<?php
require_once 'config.php';
if(!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Analysis - Glitchless</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="analysis.css">
    <style>
        .panel { background: #111; padding: 20px; border: 1px solid #333; margin-bottom: 20px; border-radius: 5px; }
        .log-panel { border-left: 4px solid #FF4C4C; }
        .insight-panel { border-left: 4px solid #00F2FF; }
        .fix-panel { border-left: 4px solid #00FF66; }
    </style>
</head>
<body style="background: #0B0E14; color: #fff; font-family: sans-serif; max-width: 900px; margin: 0 auto;">
    <nav class="navbar" style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div class="logo">G Glitchless</div>
        <div class="nav-links">
            <label style="margin-right: 20px; cursor: pointer;">
                <input type="checkbox" id="plainEnglishToggle"> Plain English
            </label>
            <a href="dashboard.php" style="color: #fff; text-decoration: none;">&larr; Back to Dashboard</a>
        </div>
    </nav>
    <main class="analysis-layout" style="padding: 20px;">
        <div class="panel log-panel">
            <h3>Terminal Logs</h3>
            <pre style="background: #000; padding: 15px; overflow-x: auto;"><code>npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project</code></pre>
        </div>
        <div class="panel insight-panel">
            <h3>Insight Stream</h3>
            <div class="technical-content">
                Dependency conflict resolving 'react'. Expected version differs from root project requirements causing ERESOLVE.
            </div>
            <div class="plain-english-content" style="display:none; color: #00F2FF;">
                You are trying to install a package that needs an older or different version of React than the one you currently have installed (v18.2.0).
            </div>
        </div>
        <div class="panel fix-panel">
            <h3>Auto-Fix</h3>
            <div class="fix-item">
                <label><input type="checkbox" class="fix-checkbox"> Step 1: Run with legacy peer dependencies</label>
            </div>
            <pre style="background: #000; padding: 15px; margin-top: 15px;"><code id="fixCode">npm install --legacy-peer-deps</code></pre>
            <button id="copyBtn" style="padding: 10px 20px; background: #00FF66; color: #000; border: none; cursor: pointer; margin-top: 10px;">Copy Fix</button>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>
