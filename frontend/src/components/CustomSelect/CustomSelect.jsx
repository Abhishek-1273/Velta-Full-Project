import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { FaChevronDown, FaCheck } from 'react-icons/fa'
import styles from './CustomSelect.module.css'

const CustomSelect = forwardRef(function CustomSelect({
  id,
  name,
  value,
  onChange,
  placeholder = 'Select an option',
  options = [],
  error = false,
  required = false,
  className = '',
  'aria-describedby': ariaDescribedBy,
}, ref) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)

  useImperativeHandle(ref, () => triggerRef.current)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      triggerRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        const currentIndex = options.indexOf(value)
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
        selectOption(options[nextIndex])
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        const currentIndex = options.indexOf(value)
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
        selectOption(options[prevIndex])
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(prev => !prev)
    }
  }

  const selectOption = (opt) => {
    if (onChange) {
      onChange({ target: { name, value: opt } })
    }
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        name={name}
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''} ${error ? styles.triggerError : ''} ${className}`}
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
      >
        <span className={value ? styles.valueText : styles.placeholderText}>
          {value || placeholder}
        </span>
        <FaChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" tabIndex={-1}>
          {placeholder && (
            <div
              className={`${styles.option} ${!value ? styles.optionSelected : ''}`}
              role="option"
              aria-selected={!value}
              onClick={() => selectOption('')}
            >
              <span className={styles.optionLabel}>{placeholder}</span>
              {!value && <FaCheck className={styles.checkIcon} />}
            </div>
          )}
          {options.map((opt) => {
            const isSelected = value === opt
            return (
              <div
                key={opt}
                className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(opt)}
              >
                <span className={styles.optionLabel}>{opt}</span>
                {isSelected && <FaCheck className={styles.checkIcon} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

export default CustomSelect
