import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { sendEmail } from '../../lib/emailjs'
import type { ContactFormData } from '../../types'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder-text-muted text-sm outline-none focus:border-accent-primary/60 transition-colors duration-200'

export function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validate = (): boolean => {
    const e: Partial<ContactFormData> = {}
    if (!form.name.trim()) e.name = 'Requis'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (!form.subject.trim()) e.subject = 'Requis'
    if (!form.message.trim()) e.message = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await sendEmail(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-accent-secondary text-sm mb-3 tracking-widest uppercase text-center">
          Contact
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-4 text-center">
          Travaillons ensemble
        </h2>
        <p className="text-text-muted text-center mb-12">
          Un projet en tête ? Écrivez-moi, je réponds sous 24h.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            aria-hidden="true"
            tabIndex={-1}
            style={{ display: 'none' }}
            value={form.honeypot}
            onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Sujet"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className={inputClass}
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <textarea
              placeholder="Votre message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={`${inputClass} resize-none`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
          </Button>

          {status === 'success' && (
            <p className="text-green-400 text-sm text-center">
              ✓ Message envoyé ! Je vous répondrai sous 24h.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">
              Une erreur est survenue. Réessayez ou écrivez directement par email.
            </p>
          )}
        </form>

        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-muted hover:text-accent-light transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/username"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-text-muted hover:text-accent-light transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}
