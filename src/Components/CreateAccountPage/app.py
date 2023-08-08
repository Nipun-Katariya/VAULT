from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

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

    # Check if the username already exists
    existing_user = next((user for user in user_data if user['username'] == data['username']), None)
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    # Additional validation checks can be added here

    data['privateKey'] = rot13_encrypt(data['privateKey'])
    data['balance'] = 5.00
    
    user_data.append(data)

    # Append the new data and save to the file
    save_data_to_file(users_data_file, user_data)

    return jsonify({"message": "User data stored successfully"})


@app.route('/api/update_balance', methods=['POST'])
def update_balance():
    data = request.get_json()

    # Find the user by their senderAddress
    user = next((user for user in user_data if user['publicId'] == data['senderAddress']), None)
    if user:
        # Update the balance by subtracting the transaction amount
        user['balance'] -= float(data['amount'])

        # Save the updated data to the file
        save_data_to_file(users_data_file, user_data)

        return jsonify({"message": "Balance updated successfully"})
    else:
        return jsonify({"error": "User not found"}), 400

@app.route('/api/store_transaction_data', methods=['POST'])
def store_transaction_data():
    data = request.get_json()

    required_fields = ["transactionHash", "senderAddress", "destinationAddress", "amount", "timestamp"]

    # Check if all required fields are present
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is missing"}), 400

    # Additional validation checks as needed

    transaction_data.append(data)

    # Append the new data and save to the file
    save_data_to_file(transactions_data_file, transaction_data)

    return jsonify({"message": "Transaction data stored successfully"})


if __name__ == '__main__':
    app.run(debug=True)
