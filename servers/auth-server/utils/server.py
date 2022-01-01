import requests
import os

def save_server_settings(payload):
    url = "http://master-server/api/server/settings/save"
    res = requests.post(url=url, headers={
        "secret_key": os.getenv("SECRET_KEY")
    }, json=payload)
    if(res.status_code == 200):
        return None
    raise Exception("Error Saving Server Settings"+str(res))
