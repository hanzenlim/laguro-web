import React, { Fragment } from 'react'
import { configure, addDecorator } from '@storybook/react'
import { injectGlobal, ThemeProvider } from 'styled-components'
import theme from '../src/components/theme';
import 'antd/dist/antd.css'

injectGlobal([], {
  '*': {
    boxSizing: 'border-box'
  },
  body: {
    lineHeight: 1.5,
    margin: 0,
    fontFamily: 'Ubuntu',
  }
})

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Fragment>
      {story()}
    </Fragment>
  </ThemeProvider>
))

const req = require.context('.', true, /\.js$/)

const load = () => {
  req.keys().forEach(req)
}

configure(load, module)
