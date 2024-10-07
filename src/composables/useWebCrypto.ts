export function useWebCrypto() {
  const CRYPTO_KEY = import.meta.env.VITE_APP_CRYPTO_KEY;
  const CRYPTO_IV = import.meta.env.VITE_APP_CRYPTO_IV;

  const encoder = new TextEncoder();
  const key = encoder.encode(CRYPTO_KEY);
  const iv = encoder.encode(CRYPTO_IV);

  const importKey = async () => {
    return await crypto.subtle.importKey(
      "raw",
      key,
      { name: "AES-CBC" },
      false,
      ["encrypt", "decrypt"]
    );
  };

  const encrypt = async (text: string) => {
    const cryptoKey = await importKey();
    const data = encoder.encode(text);

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      data
    );

    // 將加密結果轉換為 Base64 字串
    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  };

  const decrypt = async (text: string) => {
    const cryptoKey = await importKey();
    const encryptedData = new Uint8Array(
      atob(text)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  };

  return {
    encrypt,
    decrypt
  };
}
