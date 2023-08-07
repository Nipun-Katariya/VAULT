// services/encryption.js

const rot13_decrypt = (text) => {
    let decrypted_text = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const base = char >= "a" ? "a".charCodeAt(0) : "A".charCodeAt(0);
        const decrypted_char = String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
        decrypted_text += decrypted_char;
      } else {
        decrypted_text += char;
      }
    }
    return decrypted_text; // Rot13 decryption is the same as encryption in this case
  };
  
  export default rot13_decrypt;
  