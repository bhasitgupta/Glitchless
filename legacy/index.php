<?php
require_once 'config.php';
if(isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glitchless - Stop squinting at logs</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">G Glitchless</div>
        <div class="nav-links">
            <a href="login.php" class="btn btn-primary">Login with GitHub</a>
        </div>
    </nav>
    <main class="hero" style="text-align: center; margin-top: 100px;">
        <h1>Stop squinting at logs.<br><span style="color: #00F2FF;">Start shipping code.</span></h1>
        <p>Glitchless turns deployment nightmares into one-click resolutions.</p>
        <a href="login.php" class="btn btn-primary" style="padding: 15px 30px; font-size: 1.2rem; margin-top: 20px; display: inline-block;">Login with GitHub</a>
    </main>
    <script src="script.js"></script>
</body>
</html>
