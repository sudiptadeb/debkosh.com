<template>
  <header class="hdr">
    <div class="hdr-inner" :style="{ maxWidth: maxWidth + 'px' }">
      <slot name="brand" />
      <nav class="hdr-nav" :style="{ gap: navGap }">
        <slot name="nav" />
      </nav>
      <div class="hdr-divider" />
      <ClientOnly>
        <ThemeToggle />
        <template #fallback>
          <div class="toggle-ph" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    maxWidth?: number
    navGap?: string
  }>(),
  { maxWidth: 1080, navGap: '16px' },
)
</script>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--backdrop);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.hdr-inner {
  margin: 0 auto;
  padding: 14px 40px;
  display: flex;
  align-items: center;
  gap: 22px;
}

.hdr-nav {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.hdr-divider {
  width: 1px;
  height: 20px;
  background: var(--border);
  flex-shrink: 0;
}

.toggle-ph {
  width: 96px;
  height: 28px;
}

@media (max-width: 640px) {
  .hdr-inner {
    padding: 10px 14px;
    gap: 10px;
  }

  .hdr-divider {
    display: none;
  }

  .toggle-ph {
    width: 30px;
    height: 30px;
  }
}
</style>
