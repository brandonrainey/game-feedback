import React from 'react'

export default function IconArrowUp(props: any) {
  const { customClass, strokeColor, ...otherProps } = props

  return (
    <svg
      {...otherProps}
      className={customClass}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6l4-4 4 4"
        stroke={strokeColor}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  )
}
