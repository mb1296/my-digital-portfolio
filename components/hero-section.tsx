"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Shield, Lock, Database, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = []
    const particleCount = 50
    const colors = ["#0070f3", "#00c2ff", "#00f0ff", "#0047ab"]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
      })
    }

    // Create connections between particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x = -particle.velocity.x
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y = -particle.velocity.y
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      drawConnections()
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Mohamed Bishr - Cybersecurity Specialist
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Protecting Digital Frontiers
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Experienced in spyware analysis, detection, and secure systems. Defending organizations against evolving
              cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact">
                <Button variant="glow" size="xl" className="group font-semibold">
                  Subscribe to Security Insights
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#projects">
                <Button variant="outline" size="xl" className="font-semibold bg-transparent">
                  View Projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-primary/50 opacity-30 blur-xl"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="grid gap-4">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Threat Detection</h3>
                  <p className="text-sm text-muted-foreground">Advanced malware analysis and detection systems</p>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <Lock className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Secure Systems</h3>
                  <p className="text-sm text-muted-foreground">
                    Hardened infrastructure and secure architecture design
                  </p>
                </div>
              </div>
              <div className="grid gap-4 mt-8">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <Database className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Threat Intelligence</h3>
                  <p className="text-sm text-muted-foreground">Real-time monitoring and threat analysis</p>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium">Security Research</h3>
                  <p className="text-sm text-muted-foreground">Cutting-edge research on emerging threats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
