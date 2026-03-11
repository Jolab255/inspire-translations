<?php
/**
 * Inspire Translations - Custom Quote Email API
 * Handles multipart form data and multiple file attachments
 */

// Enable error reporting for debugging
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// ── SETTINGS ──────────────────────────────────────────────────────────
$to_email = "info@inspiretranslations.co.tz";
$subject_prefix = "New Quote Request: ";
$from_email = "noreply@inspiretranslations.co.tz";

// ── CORS HEADERS ──────────────────────────────────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// ── VALIDATION ────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// ── DATA PREPARATION ──────────────────────────────────────────────────
$name = strip_tags($_POST['name'] ?? 'N/A');
$email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = strip_tags($_POST['phone'] ?? 'N/A');
$org = strip_tags($_POST['organization'] ?? 'Individual');
$service = strip_tags($_POST['serviceType'] ?? 'N/A');
$sourceLang = strip_tags($_POST['sourceLang'] ?? '');
$targetLang = strip_tags($_POST['targetLang'] ?? '');
$pair = $sourceLang . " -> " . $targetLang;
$docType = strip_tags($_POST['documentType'] ?? 'N/A');
$words = strip_tags($_POST['wordCount'] ?? '0');
$deadline = strip_tags($_POST['deadline'] ?? 'Not specified');
$desc = strip_tags($_POST['description'] ?? 'No description provided.');

$subject = $subject_prefix . $service . " (" . $name . ")";

// ── EMAIL CONSTRUCTION (MULTIPART) ────────────────────────────────────
$boundary = "PHP-mixed-" . md5(time());
$headers = "From: Inspire Website <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// HTML Message
$message_html = "
<html>
<body style='font-family: sans-serif; line-height: 1.6; color: #333;'>
    <div style='background: #F7A11A; padding: 20px; color: #0D2B14;'>
        <h2 style='margin:0;'>New Project Inquiry</h2>
    </div>
    <div style='padding: 20px; border: 1px solid #eee; background: #fff;'>
        <p><strong>Client:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Organization:</strong> $org</p>
        <hr style='border:none; border-top:1px solid #eee; margin:20px 0;'>
        <p><strong>Service Requested:</strong> $service</p>
        <p><strong>Language Pair:</strong> $pair</p>
        <p><strong>Document Type:</strong> $docType</p>
        <p><strong>Word Count:</strong> $words</p>
        <p><strong>Deadline:</strong> $deadline</p>
        <p><strong>Details:</strong><br>" . nl2br($desc) . "</p>
    </div>
    <div style='padding: 10px; font-size: 12px; color: #999;'>
        Sent from Inspire Translations Website Quote Form
    </div>
</body>
</html>";

// Start Body
$body = "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $message_html . "\r\n\r\n";

// Handle Attachments (Support both 'attachment' and 'attachments[]')
$files_to_process = [];

if (isset($_FILES['attachment'])) {
    if (is_array($_FILES['attachment']['name'])) {
        // Multi-file upload via attachments[] or similar
        for ($i = 0; $i < count($_FILES['attachment']['name']); $i++) {
            if ($_FILES['attachment']['error'][$i] == UPLOAD_ERR_OK) {
                $files_to_process[] = [
                    'tmp' => $_FILES['attachment']['tmp_name'][$i],
                    'name' => $_FILES['attachment']['name'][$i],
                    'type' => $_FILES['attachment']['type'][$i]
                ];
            }
        }
    } else if ($_FILES['attachment']['error'] == UPLOAD_ERR_OK) {
        // Single file upload
        $files_to_process[] = [
            'tmp' => $_FILES['attachment']['tmp_name'],
            'name' => $_FILES['attachment']['name'],
            'type' => $_FILES['attachment']['type']
        ];
    }
}

// Process all files
foreach ($files_to_process as $file) {
    $file_tmp = $file['tmp'];
    $file_name = basename($file['name']);
    $file_type = $file['type'];
    
    if (file_exists($file_tmp)) {
        $content = file_get_contents($file_tmp);
        $encoded_content = chunk_split(base64_encode($content));

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $encoded_content . "\r\n\r\n";
    }
}

$body .= "--$boundary--";

// ── SEND ─────────────────────────────────────────────────────────────
if (mail($to_email, $subject, $body, $headers)) {
    echo json_encode(["ok" => true, "message" => "Quote request transmitted successfully."]);
} else {
    $last_error = error_get_last();
    http_response_code(500);
    echo json_encode([
        "error" => "Mail delivery failed on server.",
        "debug" => $last_error ? $last_error['message'] : "Unknown error"
    ]);
}
?>
