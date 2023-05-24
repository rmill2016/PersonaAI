import React from 'react'
import browser from 'webextension-polyfill'
import supabase from './src/supabase_client'

type Message =
  | {
      action: 'getSession' | 'signOut' | 'signInAuth'
      value: null
    }
  | {
      action: 'signIn' | 'signUp'
      value: {
        email: string
        password: string
      }
    }

type ResponseCallback = (data: any) => void

async function handleMessage(
  { action, value }: Message,
  response: ResponseCallback
) {
  switch (action) {
    case 'signIn':
      console.log('requesting auth')
      const { data, error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      })
      response({ data, error })
      break
    case 'signUp':
      const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
      })
      response({
        message: 'Successfully signed up!',
        data: { data, error },
      })
      break
    case 'signInAuth':
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      response({
        message: "Successfully OAuth'd!",
        data: { data, error },
      })
      break

    case 'signOut':
      const { error } = await supabase.auth.signOut()
      response({ data: null, error })
      break

    case 'getSession':
      supabase.auth.getSession().then(response)
      break

    default:
      response({ data: null, error: 'Unknown action' })
  }
}

// @ts-ignore
browser.runtime.onMessage.addListener((msg, sender, response) => {
  handleMessage(msg, response)
  return true
})

export {}
