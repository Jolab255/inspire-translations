<?php
/**
 * GitHub OAuth Proxy for Decap CMS
 * Place this in public/admin/auth.php
 */

// 1. YOUR CONFIGURATION
$client_id = 'YOUR_GITHUB_CLIENT_ID'; // You will get this from GitHub
$client_secret = 'YOUR_GITHUB_CLIENT_SECRET'; // You will get this from GitHub
$redirect_uri = 'https://inspiretranslations.co.tz/admin/auth.php';

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
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

// 4. SEND TOKEN BACK TO DECAP CMS
if (isset($data['access_token'])) {
    $token = $data['access_token'];
    ?>
    <!DOCTYPE html>
    <html>
    <body>
    <script>
        (function() {
            function receiveMessage(e) {
                console.log("Sending message back to opener");
                window.opener.postMessage(
                    'authorization:github:success:' + JSON.stringify({
                        token: '<?php echo $token; ?>',
                        provider: 'github'
                    }),
                    e.origin
                );
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
        })();
    </script>
    </body>
    </html>
    <?php
} else {
    echo "Error during authentication: " . htmlspecialchars($response);
}
?>
