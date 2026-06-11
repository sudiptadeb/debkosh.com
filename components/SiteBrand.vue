<template>
  <NuxtLink :to="to" class="brand">
    <DMark />
    <span class="brand-name">Sudipta Deb</span>
    <span v-if="domain" class="brand-domain">{{ domain }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    domain?: string
  }>(),
  { to: '/', domain: '' },
)
</script>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.brand-name {
  font: 600 14.5px/1 var(--font-sans);
  letter-spacing: -0.02em;
  color: var(--fg-1);
  white-space: nowrap;
}

.brand-domain {
  color: var(--fg-3);
  font: 500 11px/1 var(--font-mono);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding-left: 12px;
  border-left: 1px solid var(--border);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .brand-domain {
    display: none;
  }
}
</style>
