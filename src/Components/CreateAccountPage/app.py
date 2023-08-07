from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Define filenames for user data and transaction data files
users_data_file = 'usersData.json'
transactions_data_file = 'transaction.json'

# Check if the files exist, if not, create empty files
if not os.path.exists(users_data_file):
    with open(users_data_file, 'w') as file:
        json.dump([], file)

if not os.path.exists(transactions_data_file):
    with open(transactions_data_file, 'w') as file:
        json.dump([], file)

def load_data_from_file(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def save_data_to_file(filename, data):
    with open(filename, 'w') as file:
        json.dump(data, file)

# Load existing data from the files
user_data = load_data_from_file(users_data_file)
transaction_data = load_data_from_file(transactions_data_file)

# Rot13 encryption function
def rot13_encrypt(text):
    encrypted_text = ""
    for char in text:
        if char.isalpha():
            base = ord('a') if char.islower() else ord('A')
            encrypted_char = chr((ord(char) - base + 13) % 26 + base)
            encrypted_text += encrypted_char
        else:
            encrypted_text += char
    return encrypted_text

@app.route('/', methods=['GET'])
def root():
    return jsonify({"message": "Welcome to the Flask backend!"})
# The root route (unchanged)

@app.route('/api/store_user_data', methods=['POST'])
def store_user_data():
    data = request.get_json()

    # The validation checks (unchanged)

    data['privateKey'] = rot13_encrypt(data['privateKey'])

    user_data.append(data)

    # Append the new data and save to the file
    save_data_to_file(users_data_file, user_data)

    return jsonify({"message": "User data stored successfully"})

@app.route('/api/store_transaction_data', methods=['POST'])
def store_transaction_data():
    data = request.get_json()

    # The validation checks (unchanged)

    transaction_data.append(data)

    # Append the new data and save to the file
    save_data_to_file(transactions_data_file, transaction_data)

    return jsonify({"message": "Transaction data stored successfully"})

if __name__ == '__main__':
    app.run(debug=True)
