var isEncrypt = true;

function toggleEncryptDecrypt() {
    isEncrypt = !isEncrypt;
    var encryptButton = document.getElementById("encryptButton");
    var decryptButton = document.getElementById("decryptButton");
    encryptButton.style.display = isEncrypt ? "inline-block" : "none";
    decryptButton.style.display = isEncrypt ? "none" : "inline-block";
    document.getElementById("outputText").value = "";
}

function encrypt() {
    var plaintext = document.getElementById("inputText").value;
    var key = document.getElementById("key").value;
    var encrypted = rc4(plaintext, key);
    document.getElementById("outputText").value = encrypted;
}

function decrypt() {
    var ciphertext = document.getElementById("inputText").value;
    var key = document.getElementById("key").value;
    var decrypted = rc4(ciphertext, key);
    document.getElementById("outputText").value = decrypted;
}

function rc4(text, key) {
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < text.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(text.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
