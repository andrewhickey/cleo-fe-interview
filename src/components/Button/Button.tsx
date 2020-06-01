/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { StyleConstants } from '../../shared/constants'

function Button({ className, ...buttonProps }: React.ComponentProps<'button'>) {
  return (
    <button
      {...buttonProps}
      className={
        'text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline' +
        className
      }
      css={css`
        background-color: ${StyleConstants.colors.lightBlue};
        &:hover {
          background-color: ${StyleConstants.colors.blue};
        }
      `}
    />
  )
}

export default Button
