<?php
/**
 * Inspire Translations - Custom Contact Form API
 * Sends standard contact inquiries to info@inspiretranslations.co.tz
 */

// Enable error reporting
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// ── SETTINGS ──────────────────────────────────────────────────────────
$to_email = "info@inspiretranslations.co.tz";
$subject_prefix = "New Contact Message: ";
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
$input = json_decode(file_get_contents('php://input'), true);
$data = $input ? $input : $_POST;

$name = strip_tags($data['name'] ?? 'N/A');
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = strip_tags($data['phone'] ?? 'N/A');
$subject_val = strip_tags($data['subject'] ?? 'General Inquiry');
$message = strip_tags($data['message'] ?? 'No message content.');

$subject = $subject_prefix . $subject_val . " (" . $name . ")";

// ── EMAIL CONSTRUCTION ────────────────────────────────────────────────
$headers = "From: Inspire Website <$from_email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$body = "
<html>
<body style='font-family: sans-serif; line-height: 1.6; color: #333;'>
    <div style='background: #F7A11A; padding: 20px; color: #0D2B14;'>
        <h2>New Contact Inquiry</h2>
    </div>
    <div style='padding: 20px; border: 1px solid #eee;'>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Subject:</strong> $subject_val</p>
        <hr>
        <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
    </div>
</body>
</html>";

// ── SEND ─────────────────────────────────────────────────────────────
if (mail($to_email, $subject, $body, $headers)) {
    echo json_encode(["ok" => true, "message" => "Message transmitted to $to_email"]);
} else {
    $last_error = error_get_last();
    http_response_code(500);
    echo json_encode([
        "error" => "Mail delivery failed on server.",
        "debug" => $last_error ? $last_error['message'] : "Unknown error"
    ]);
}
?>
