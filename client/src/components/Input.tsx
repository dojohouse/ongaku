import React from 'react';


interface InputProps {
  label: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  placeholder?: string
  disabled?: boolean
  className?: string
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { label, value, onChange = undefined, className = "", placeholder = "", disabled = false } = props;

  return (
    <div className={className}>
      <span className="text-xs font-medium uppercase text-gray-700">{label}</span><br />
      <input
        className={`${disabled && "cursor-not-allowed "} border-2 border-gray w-full text-sm px-2 py-1`}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default Input;