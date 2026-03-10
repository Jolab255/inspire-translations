<?php
/**
 * GitHub OAuth Proxy for Decap CMS
 */

// 1. YOUR CONFIGURATION
$client_id = 'Iv23liexzO4SlabyNhv5';
$client_secret = '1135695b209a44bda3b1afb88c1682a1b71329f4';
// We use the current host to avoid origin mismatches (www vs non-www)
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$redirect_uri = $protocol . '://' . $host . '/admin/auth.php';

// 2. START THE LOGIN PROCESS
if (!isset($_GET['code'])) {
    $auth_url = "https://github.com/login/oauth/authorize"
              . "?client_id=" . $client_id
              . "&scope=repo,user"
              . "&redirect_uri=" . urlencode($redirect_uri);
    header("Location: " . $auth_url);
    exit;
}

// 3. HANDLE THE CALLBACK FROM GITHUB
$code = $_GET['code'];

$post_data = [
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'code' => $code,
    'redirect_uri' => $redirect_uri
];

$ch = curl_init("https://github.com/login/oauth/access_token");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'User-Agent: PHP-OAuth-Proxy'
]);

$response = curl_exec($ch);
$curl_error = curl_error($ch);
curl_close($ch);

$data = json_decode($response, true);

// 4. SEND TOKEN BACK TO DECAP CMS
if (isset($data['access_token'])) {
    $token = $data['access_token'];
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Authentication Successful</title>
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f4f4f4; }
            .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            .spinner { border: 4px solid rgba(0,0,0,0.1); width: 36px; height: 36px; border-radius: 50%; border-left-color: #F7A11A; animation: spin 1s linear infinite; margin: 0 auto 1rem; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="spinner" id="spinner"></div>
            <p id="status">Authenticating with Decap CMS...</p>
            <p style="font-size: 0.8rem; color: #666;" id="substatus">This window should close automatically.</p>
            <button id="closeBtn" style="display: none; margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px; border: 1px solid #ccc;">Close Window</button>
        </div>
        <script>
            (function() {
                var token = '<?php echo $token; ?>';
                var content = JSON.stringify({ token: token, provider: 'github' });
                var statusEl = document.getElementById('status');
                var substatusEl = document.getElementById('substatus');
                var closeBtn = document.getElementById('closeBtn');
                var spinner = document.getElementById('spinner');
                
                closeBtn.onclick = function() { window.close(); };

                function sendToken() {
                    console.log("Sending token to opener...");
                    if (!window.opener) {
                        console.error("Opener window not found!");
                        statusEl.innerText = "Error: Opener window lost.";
                        substatusEl.innerText = "Please close this window and try again.";
                        closeBtn.style.display = "inline-block";
                        spinner.style.display = "none";
                        return;
                    }
                    window.opener.postMessage("authorizing:github", "*");
                    window.opener.postMessage("authorization:github:success:" + content, "*");
                }

                // Initial send
                sendToken();

                // Listen for requests
                window.addEventListener("message", function(e) {
                    console.log("Received message from opener:", e.data);
                    if (e.data === "authorizing:github") {
                        sendToken();
                    }
                }, false);

                // Keep trying every 500ms for a few seconds
                var attempts = 0;
                var maxAttempts = 10;
                var interval = setInterval(function() {
                    attempts++;
                    sendToken();
                    if (attempts >= maxAttempts) {
                        clearInterval(interval);
                        console.log("Finished sending attempts.");
                        setTimeout(function() {
                            if (!window.closed) {
                                statusEl.innerText = "Authentication complete.";
                                substatusEl.innerText = "You can now close this window.";
                                closeBtn.style.display = "inline-block";
                                spinner.style.display = "none";
                            }
                        }, 1000);
                    }
                }, 500);

                // Auto-close if possible
                setTimeout(function() {
                    window.close();
                }, 5000);
            })();
        </script>
    </body>
    </html>
    <?php
} else {
    ?>
    <!DOCTYPE html>
    <html>
    <head><title>Authentication Error</title></head>
    <body style="font-family: sans-serif; padding: 2rem;">
        <h1 style="color: #d32f2f;">Authentication Error</h1>
        <p>Could not retrieve access token from GitHub.</p>
        <?php if ($curl_error): ?>
            <p><strong>CURL Error:</strong> <?php echo htmlspecialchars($curl_error); ?></p>
        <?php endif; ?>
        <p><strong>Response from GitHub:</strong></p>
        <pre style="background: #eee; padding: 1rem; overflow: auto;"><?php echo htmlspecialchars($response); ?></pre>
        <button onclick="window.close()">Close Window</button>
    </body>
    </html>
    <?php
}
?>
