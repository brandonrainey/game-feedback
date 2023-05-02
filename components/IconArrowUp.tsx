import React from 'react'

export default function IconArrowUp(props: any) {
  const { strokeColor, ...otherProps } = props

  return (
    <svg
      {...otherProps}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6l4-4 4 4"
        stroke={strokeColor}
        stroke-width="2"
        fill="none"
        fill-rule="evenodd"
      />
    </svg>
  )
}
