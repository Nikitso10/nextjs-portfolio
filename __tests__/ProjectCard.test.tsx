import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'
import type { Project } from '@/data/projects'

const mockProject: Project = {
  id: 'test',
  title: 'Test Project',
  desc: { en: 'English desc', el: 'Greek desc' },
  tags: ['React', 'TypeScript'],
  liveUrl: 'https://example.com',
  tier: 'featured',
}

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders English description when lang is en', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByText('English desc')).toBeInTheDocument()
  })

  it('renders Greek description when lang is el', () => {
    render(<ProjectCard project={mockProject} lang="el" />)
    expect(screen.getByText('Greek desc')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders live link when liveUrl is provided', () => {
    render(<ProjectCard project={mockProject} lang="en" />)
    expect(screen.getByRole('link', { name: /live/i })).toHaveAttribute('href', 'https://example.com')
  })

  it('shows FOUNDER badge when badge prop provided', () => {
    render(<ProjectCard project={{ ...mockProject, badge: 'FOUNDER' }} lang="en" />)
    expect(screen.getByText('FOUNDER')).toBeInTheDocument()
  })
})
