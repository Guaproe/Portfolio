import { describe, it, expect, vi, beforeEach } from 'vitest'
import emailjs from '@emailjs/browser'
import { sendEmail } from './emailjs'
import type { ContactFormData } from '../types'

vi.mock('@emailjs/browser')

const validData: ContactFormData = {
  name: 'Alice',
  email: 'alice@example.com',
  subject: 'Projet freelance',
  message: 'Bonjour, je souhaite vous contacter.',
}

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls emailjs.send with correct params', async () => {
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: 'OK' })
    await sendEmail(validData)
    expect(emailjs.send).toHaveBeenCalledOnce()
  })

  it('silently rejects when honeypot is filled', async () => {
    const dataWithHoneypot = { ...validData, honeypot: 'bot' }
    await sendEmail(dataWithHoneypot)
    expect(emailjs.send).not.toHaveBeenCalled()
  })

  it('throws when emailjs.send rejects', async () => {
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error('Network error'))
    await expect(sendEmail(validData)).rejects.toThrow('Network error')
  })
})
