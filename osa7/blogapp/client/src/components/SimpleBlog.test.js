import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('Render', () => {
    const blog = {
        title: 'Testblog',
        author: 'Laina',
        likes: 99
    }

    const component = render(
        <SimpleBlog blog={ blog } />
    )

    expect(component.container).toHaveTextContent('Testblog')

    expect(component.container).toHaveTextContent('Laina')

    expect(component.container).toHaveTextContent('99')
})

test('Click like', () => {
    const blog = {
        title: 'Testblog',
        author: 'Laina',
        likes: 99
    }

    const mockHandler = jest.fn()
    const component = render(
        <SimpleBlog blog={ blog } onClick={ mockHandler } />
    )

    const butt = component.getByText('like')
    fireEvent.click(butt)
    expect(mockHandler.mock.calls.length).toBe(1)
    fireEvent.click(butt)
    expect(mockHandler.mock.calls.length).toBe(2)
})