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
    <title>Dashboard - Glitchless</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="dashboard.css">
    <style>
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .scanner { text-align: center; color: #00F2FF; }
        .progress-bar-container { width: 300px; height: 10px; background: #333; border-radius: 5px; overflow: hidden; margin-top: 10px; }
        .progress-bar { height: 100%; background: #00F2FF; width: 0%; transition: width 0.1s linear; }
    </style>
</head>
<body style="background: #0B0E14; color: #fff;">
    <nav class="navbar" style="padding: 20px; display: flex; justify-content: space-between;">
        <div class="logo">G Glitchless</div>
        <div class="nav-links">
            <span>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
            <a href="logout.php" style="margin-left: 20px; color: #FF4C4C;">Logout</a>
        </div>
    </nav>
    <main class="dashboard" style="max-width: 800px; margin: 50px auto; text-align: center;">
        <h2>Analyze Logs</h2>
        <div class="drop-zone" id="dropZone" style="border: 2px dashed #00F2FF; padding: 50px; margin: 20px 0; cursor: pointer;">
            <p>Drag and drop .log or .txt file here</p>
            <input type="file" id="fileInput" style="display:none">
        </div>
        <p>OR</p>
        <div class="url-input-container" style="margin-top: 20px;">
            <input type="text" id="urlInput" placeholder="Enter GitHub repo URL..." style="padding: 10px; width: 60%; background: #111; color: #fff; border: 1px solid #333;">
            <button id="analyzeBtn" style="padding: 10px 20px; background: #00F2FF; color: #000; border: none; cursor: pointer;">Analyze</button>
        </div>
    </main>
    <div id="scanningOverlay" style="display:none" class="overlay">
        <div class="scanner">
            <p id="scanStatus">Initializing...</p>
            <div class="progress-bar-container"><div id="scanProgress" class="progress-bar"></div></div>
        </div>
    </div>
    <script src="script.js"></script>
    <script src="dashboard.js"></script>
</body>
</html>
