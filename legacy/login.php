<?php
require_once 'config.php';
// Simulate GitHub OAuth login
$_SESSION['user_id'] = 1;
$_SESSION['username'] = 'dev_user';
header('Location: dashboard.php');
exit;
?>
