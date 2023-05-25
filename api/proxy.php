<?php
function encodeURI($url) {
    // http://php.net/manual/en/function.rawurlencode.php
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURI
    $unescaped = array(
        '%2D'=>'-','%5F'=>'_','%2E'=>'.','%21'=>'!', '%7E'=>'~',
        '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')'
    );
    $reserved = array(
        '%3B'=>';','%2C'=>',','%2F'=>'/','%3F'=>'?','%3A'=>':',
        '%40'=>'@','%26'=>'&','%3D'=>'=','%2B'=>'+','%24'=>'$'
    );
    $score = array(
        '%23'=>'#'
    );
    return strtr(rawurlencode($url), array_merge($reserved,$unescaped,$score));
}
error_reporting(-1);
$whitelist = array(
	"thinkpro.vn",
	"www.thegioididong.com",
	"phongvu.vn",
	"gearvn.com",
	"www.anphatpc.com.vn",
	"hoanghamobile.com",
	"www.phucanh.vn",
	"hacom.vn"
);

$url = (urldecode($_GET['url']));

// Check if the URL is in the whitelist
$allowed = true;
$shop = "";
foreach ($whitelist as $hostname) {
	if (stripos($url, $hostname) !== false) {
		$allowed = true;
		$shop = $hostname;
		break;
	}
}

$url = encodeURI($url);

if (!$allowed) {
	header("HTTP/1.1 403 Forbidden");
	echo "Access denied";
	exit;
}

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);

// Set headers to mimic the original request
$headers = array();

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Return the response as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the cURL request
$response = curl_exec($ch);
if (!$response) echo curl_error($ch);

// Get the content type of the original URL
$content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Set the correct content type for the proxy response
header('Content-Type: ' . $content_type);
header("Access-Control-Allow-Origin: *");
// Output the response
echo $response;

// Close cURL
curl_close($ch);
?>