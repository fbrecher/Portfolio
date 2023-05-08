import json
from flask import Flask
from requests import Request, Session
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api_key = 'your api key here'

CORS(app)

@app.route("/home")
def home():
    return "<h1>Home Page</h1>"


@app.route("/about")
def about():
    return "<h1>About Page</h1>"

@app.route("/id/<id>")
def id(id):
    url = f"https://house-plants2.p.rapidapi.com/id/{id}"
    headers = {
        "X-RapidAPI-Key": f"{api_key}",
        "X-RapidAPI-Host": "house-plants2.p.rapidapi.com"}
    response = requests.get(url, verify=False, headers=headers, params=id)
    data= json.loads(response.text)
    return data

@app.route("/category")
def category():
    url = "https://house-plants2.p.rapidapi.com/categories"
    headers = {
        "X-RapidAPI-Key": f"{api_key}",
        "X-RapidAPI-Host": "house-plants2.p.rapidapi.com"}
    response = requests.get(url, verify= False, headers=headers)
    data= json.loads(response.text)
    return data



@app.route("/all")
def data():
    url = "https://house-plants2.p.rapidapi.com/all-lite"
    querystring = {"query":"Fern"}
    headers = {
        "X-RapidAPI-Key": f"{api_key}",
        "X-RapidAPI-Host": "house-plants2.p.rapidapi.com"
    }
    response = requests.get(url, verify=False, headers=headers, params=querystring)
    data= json.loads(response.text)
    return data

if __name__ == '__main__':
    app.run(debug=True)