import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from './Contact'
import { vi } from 'vitest'
import * as emailjsLib from '../../lib/emailjs'

vi.mock('../../lib/emailjs')

describe('Contact form', () => {
  it('renders all form fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/votre@email.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Sujet/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Votre message/i)).toBeInTheDocument()
  })

  it('shows error if required fields are empty on submit', async () => {
    render(<Contact />)
    const submitButton = screen.getByRole('button', { name: /envoyer/i })
    await userEvent.click(submitButton)
    expect(emailjsLib.sendEmail).not.toHaveBeenCalled()
  })

  it('calls sendEmail with form data when form is valid', async () => {
    vi.mocked(emailjsLib.sendEmail).mockResolvedValueOnce(undefined)
    render(<Contact />)

    await userEvent.type(screen.getByPlaceholderText(/Votre nom/i), 'Alice')
    await userEvent.type(screen.getByPlaceholderText(/votre@email.com/i), 'alice@example.com')
    await userEvent.type(screen.getByPlaceholderText(/Sujet/i), 'Test')
    await userEvent.type(screen.getByPlaceholderText(/Votre message/i), 'Hello world')

    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }))

    expect(emailjsLib.sendEmail).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      subject: 'Test',
      message: 'Hello world',
      honeypot: '',
    })
  })

  it('shows success message after successful send', async () => {
    vi.mocked(emailjsLib.sendEmail).mockResolvedValueOnce(undefined)
    render(<Contact />)

    await userEvent.type(screen.getByPlaceholderText(/Votre nom/i), 'Alice')
    await userEvent.type(screen.getByPlaceholderText(/votre@email.com/i), 'alice@example.com')
    await userEvent.type(screen.getByPlaceholderText(/Sujet/i), 'Test')
    await userEvent.type(screen.getByPlaceholderText(/Votre message/i), 'Hello world')
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }))

    expect(await screen.findByText(/message envoyé/i)).toBeInTheDocument()
  })
})
