import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('Renders content', () => {
    const blog = {
        title: 'Testblog',
        author: 'Testi-Sami',
        likes: 99,
        url: 'testiblogi.com',
        user: {
            name: 'Mario',
            username: 'maario'
        }
    }

    const component = render(
        <Blog blog={ blog } />
    )

    // T1
    expect(component.container).toHaveTextContent(
        'Testblog'
    )

    // T2
    const element = component.getByText(
        'Testblog'
    )
    expect(element).toBeDefined()

    // T3
    const div = component.container.querySelector('.bloglist')
    expect(div).toHaveTextContent(
        'Testblog'
    )

    //const li = component.container.querySelector('li')

    //console.log(prettyDOM(li))
})

describe('Blog', () => {
    let component

    const removeAllowed = false

    const blog = {
        user: {
            name: 'Mario',
            username: 'maario',
            id: '55'
        },
        title: 'Testblog',
        author: 'Testi-Sami',
        likes: 99,
        url: 'testiblogi.com',
        id: '44'
    }

    const blogs = [{
        user: {
            name: 'Mario',
            username: 'maario',
            id: '55'
        },
        title: 'Testblog',
        author: 'Testi-Sami',
        likes: 99,
        url: 'testiblogi.com',
        id: '44'
    },
    {
        user: {
            name: 'Luigi',
            username: 'luiizi',
            id: '56'
        },
        title: 'Testitestblog',
        author: 'Testi-Pirjo',
        likes: 12,
        url: 'tetetestiblogi.com',
        id: '46'
    }]

    beforeEach(() => {
        component = render(
            <Blog blog={ blog }
                blogs={ blogs }
                removeAllowed={ removeAllowed }
            />
        )
    })

    test('Initially only title and author available', () => {
        expect(component.container).toHaveTextContent('Testblog')
        expect(component.container).toHaveTextContent('Testi-Sami')

        const hidden = component.container.querySelector('.reveal')
        expect(hidden).toHaveStyle('display: none')

        const div = component.getByText('Testblog')
        fireEvent.click(div)
        expect(div).toHaveStyle('')
    })
})