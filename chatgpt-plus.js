#!name=ChatGPT Mock Module
#!desc=Chan telemetry + mock endpoint API + fake Plus UI

[Rule]
DOMAIN-SUFFIX,chatgpt.com,PROXY
DOMAIN-SUFFIX,openai.com,PROXY
DOMAIN-SUFFIX,oaistatic.com,PROXY
DOMAIN-SUFFIX,oaiusercontent.com,PROXY
URL-REGEX,^https?:\/\/.*\.openai\.com\/v1\/(telemetry|metrics|analytics),REJECT
URL-REGEX,^https?:\/\/chatgpt\.com\/backend-api\/(ces|analytics|telemetry),REJECT

[Header Rewrite]
^https?:\/\/(api\.openai\.com|chatgpt\.com)(:443)?\/ header-add X-Mock-Client shadowrocket
^https?:\/\/chatgpt\.com\/backend-api\/ header-del oai-device-id

[Script]
chatgpt-mock = type=http-request,pattern=^https?:\/\/api\.openai\.com\/v1\/chat\/completions,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/hoangtiendungqb1-sudo/shadowrocket-config/main/scripts/chatgpt-mock.js,timeout=10
chatgpt-trim = type=http-response,pattern=^https?:\/\/chatgpt\.com\/backend-api\/conversation,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/hoangtiendungqb1-sudo/shadowrocket-config/main/scripts/chatgpt-trim.js,timeout=10
chatgpt-plus = type=http-response,pattern=^https?:\/\/chatgpt\.com\/backend-api\/(me|accounts|subscription|entitlements|settings|user),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/hoangtiendungqb1-sudo/shadowrocket-config/main/scripts/chatgpt-plus.js,timeout=10
chatgpt-limit = type=http-response,pattern=^https?:\/\/chatgpt\.com\/backend-api\/.*(limit|quota|usage|rate|entitlement),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/hoangtiendungqb1-sudo/shadowrocket-config/main/scripts/chatgpt-limit.js,timeout=10

[MITM]
hostname = %APPEND% api.openai.com, chatgpt.com, *.openai.com, *.chatgpt.com
