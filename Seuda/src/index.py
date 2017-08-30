import os

from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, request, abort
from subprocess import call

from urllib.parse import urlencode
from urllib.request import Request, urlopen

import hashlib
import hmac
import json


# Definitons
ENV_PATH = '.env';

# Check if ENV is loaded
if os.path.isfile(ENV_PATH) :
    load_dotenv(ENV_PATH)


PORT = os.environ.get("SEUDA_PORT")
INCOMING_WEBHOOK_URI = os.environ.get("INCOMING_WEBHOOK_URI")
AUTHORIZATION_KEY = os.environ.get("WEBHOOK_NAME")

def performUpdate():
    call(["bash", "./src/scripts/index.sh"])

def notifySlack():
    url = 'https://hooks.slack.com/services/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' # Set destination URL here
    post_fields = {'foo': "Yeet! A new build of HackMerced has been deployed to live. Check it out at https://hackmerced.com!"}    

    request = Request(url, urlencode(post_fields).encode())
    json = urlopen(request).read().decode()
    print(json)


# Actual Webapp
app = Flask(__name__)

@app.route("/" + INCOMING_WEBHOOK_URI)
def getGithubWebhook():
    payload = request.data;
    headers = request.headers;

    signature = hmac.new(AUTHORIZATION_KEY, payload, hashlib.sha1).hexdigest()
    if hmac.compare_digest(signature, headers["X-Hub-Signature"].split('=')[1]):
        data = json.loads(payload)

        if(data.ref == "release"):
            performUpdate()

        return 'APPROVED'
    else:
        abort(401)

if __name__ == "__main__":
    app.run(port= PORT)
