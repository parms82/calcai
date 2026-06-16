import { useState, useEffect } from 'react'

export default function SliderInput({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '' }) {
  const [inputVal, setInputVal] = useState(String(value))

  useEffect(() => {
    setInputVal(String(value))
  }, [value])

  function handleFocus(e) {
    setInputVal('')
    e.target.select()
  }

  function handleTextChange(e) {
    const raw = e.target.value.replace(/,/g, '')
    setInputVal(e.target.value)
    const num = parseFloat(raw)
    if (!isNaN(num)) {
      const clamped = Math.min(max, Math.max(min, num))
      onChange(clamped)
    }
  }

  function handleBlur() {
    const raw = inputVal.replace(/,/g, '')
    const num = parseFloat(raw)
    const clamped = isNaN(num) ? value : Math.min(max, Math.max(min, num))
    onChange(clamped)
    setInputVal(String(clamped))
  }

  return (
    <div className="mb-5">
      {/* Label row — wraps on very small screens */}
      <div className="flex flex-wrap justify-between items-center gap-y-1 mb-1">
        <label className="text-sm font-medium text-gray-700 mr-2">{label}</label>
        <div className="flex items-center gap-1 shrink-0">
          {prefix && <span className="text-sm font-medium text-gray-500">{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={inputVal}
            onFocus={handleFocus}
            onChange={handleTextChange}
            onBlur={handleBlur}
            className="w-24 rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1.5 text-right text-sm font-semibold text-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {suffix && <span className="text-sm font-medium text-gray-500">{suffix}</span>}
        </div>
      </div>
      {/* Slider — larger touch target on mobile */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="calc-slider w-full h-2 rounded-lg cursor-pointer touch-pan-x"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{prefix}{Number(min).toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{Number(max).toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  )
}
