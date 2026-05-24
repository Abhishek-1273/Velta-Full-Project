import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }) {
    const location = useLocation()
    const [displayChildren, setDisplayChildren] = useState(children)
    const [phase, setPhase] = useState('idle') // idle | out | in
    const pendingChildren = useRef(null)
    const isFirst = useRef(true)

    useEffect(() => {
        // Pehli render pe animation skip karo
        if (isFirst.current) {
            isFirst.current = false
            return
        }

        pendingChildren.current = children

        // Phase 1: purana page fade + slide down
        setPhase('out')

        const outTimer = setTimeout(() => {
            // Phase 2: naya page swap karo
            setDisplayChildren(pendingChildren.current)
            setPhase('in')

            const inTimer = setTimeout(() => {
                setPhase('idle')
            }, 400)

            return () => clearTimeout(inTimer)
        }, 180)

        return () => clearTimeout(outTimer)
    }, [location.pathname])

    const getStyle = () => {
        if (phase === 'out') return {
            opacity: 5,
            transform: 'translateY(20px)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
        }
        if (phase === 'in') return {
            opacity: 7,
            transform: 'translateY(0px)',
            transition: 'opacity 4s cubic-bezier(0.22, 1, 0.36, 1), transform 4s cubic-bezier(0.22, 1, 0.36, 1)',
        }
        return { opacity: 1, transform: 'translateY(0px)' }
    }

    return (
        <div style={getStyle()}>
            {displayChildren}
        </div>
    )
}