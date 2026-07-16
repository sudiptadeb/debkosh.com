<template>
  <div class="error-page">
    <div class="error-card">
      <div class="eyebrow">{{ eyebrow }}</div>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-line">{{ line }}</p>
      <div class="error-actions">
        <button type="button" class="action action-primary" @click="goHome">
          Back to debkosh.com
        </button>
        <NuxtLink to="/blogs" class="action">Read the blog</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)
const eyebrow = computed(() => (props.error?.statusCode ? String(props.error.statusCode) : 'Error'))
const title = computed(() => (is404.value ? "This page doesn't exist." : 'Something broke.'))
const line = computed(() =>
  is404.value
    ? 'The URL may have moved, or it never was. Everything that does exist is one hop away.'
    : 'An unexpected error got in the way. Heading home usually clears it.'
)

useHead({ title: is404.value ? 'Page not found' : 'Something broke' })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6) var(--space-5);
  background: var(--bg);
  color: var(--fg-1);
}

.error-card {
  max-width: 480px;
  width: 100%;
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border-strong);
  border-bottom: 1px solid var(--border);
}

.eyebrow {
  font: 500 10.5px/1 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-3);
  margin-bottom: 14px;
}

.error-title {
  font: 600 32px/1.05 var(--font-sans);
  letter-spacing: -0.035em;
  color: var(--fg-1);
  margin: 0;
  text-wrap: balance;
}

.error-line {
  font: 400 14px/1.6 var(--font-sans);
  color: var(--fg-2);
  margin: 12px 0 0;
}

.error-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 24px;
}

.action {
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.02em;
  color: var(--fg-2);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.action:hover {
  color: var(--accent-hover);
}

.action-primary {
  color: var(--accent);
}
</style>
