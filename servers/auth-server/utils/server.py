import requests
import json 

def save_server_settings(options):
    json_payload = json.dumps(options.payload)
    url = "http://master-server/api/server/settings/save"
    res = requests.post(url=url, headers=options.headers, data=json_payload)
    if(res.status_code == 200):
        return None
    raise Exception("Error Saving Server Settings")