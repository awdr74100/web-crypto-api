<script setup lang="ts">
import { useWebCrypto } from '@/composables/useWebCrypto';
import { useCrypto } from '@/composables/useCrypto';

const webCrypto = useWebCrypto();

const crypto = useCrypto();

const print = async () => {
  const code = '123445wefwefzz';

  const encrypted1 = await webCrypto.encrypt(code);
  const encrypted2 = crypto.encrypt(code);
  const decrypted1 = await webCrypto.decrypt(encrypted1);
  const decrypted2 = crypto.decrypt(encrypted2);

  console.log(
    ...[encrypted1, encrypted2, encrypted1 === encrypted2, typeof encrypted1, typeof encrypted2],
  );
  console.log(
    ...[decrypted1, decrypted2, decrypted1 === decrypted2, typeof decrypted1, typeof decrypted2],
  );
};
</script>

<template>
  <div class="max-w-5xl mx-auto my-10">
    <h1 class="text-center text-red-500" @click="print">Hello World</h1>
  </div>
</template>
