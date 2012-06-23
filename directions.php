<?php
$orig_fid = $_GET['orig_fid'];
$query = urlencode("SELECT geometry FROM 1MyWuCEFIW8DYu-ZIcXJSrvnMTVyZgNaWflCyLBk WHERE ORIG_FID = {$orig_fid}");
$ch = curl_init("https://www.google.com/fusiontables/api/query?sql=".$query);
ob_start();
curl_exec($ch);
$string=ob_get_contents();
ob_end_clean();
curl_close($ch);
echo htmlentities($string);

