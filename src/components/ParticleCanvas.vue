<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animId = null

onMounted(() => {
  const c = canvas.value
  const ctx = c.getContext('2d')

  const resize = () => {
    c.width = c.offsetWidth
    c.height = c.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const COUNT = 90
  const MAX_DIST = 130

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1,
  }))

  const animate = () => {
    ctx.clearRect(0, 0, c.width, c.height)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > c.width) p.vx *= -1
      if (p.y < 0 || p.y > c.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(99,102,241,0.45)'
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j]
        const dx = p.x - q.x
        const dy = p.y - q.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          const alpha = 0.18 * (1 - dist / MAX_DIST)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>
