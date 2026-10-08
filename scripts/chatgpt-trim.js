let obj = JSON.parse($response.body);
if (obj && obj.mapping) {
  obj.mapping = {};
}
$done({ body: JSON.stringify(obj) });
