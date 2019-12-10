import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    test('No blogs render when not signed in', async () => {
        const component = render(
            <App />
        )
        component.rerender(
            <App />
        )

        await waitForElement(
            () => component.getByText('Login')
        )

        const blogs = component.container.querySelectorAll('.singleblog')
        expect(blogs.length).toBe(0)
    })

    test('Blogs render when signed in', async () => {
        const user = {
            name: 'Luigi',
            username: 'luiizi',
            token: '6669998880'
        }

        localStorage.setItem('loggedBlogUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(
            <App />
        )

        await waitForElement(
            () => component.container.querySelector('.togglableContent')
        )

        const blogs = component.container.querySelectorAll('.singleblog')
        expect(blogs.length).toBe(3)
        expect(component.container).toHaveTextContent('Testblog')
    })
})