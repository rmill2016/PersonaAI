import React from 'react'
import supabase from './src/supabase_client'
import { Data, DataError, Message, ResponseCallback } from './src/types/types'

async function handleMessage(
  { action, value }: Message,
  response: ResponseCallback
) {
  if (action === 'signUp') {
    const result = await supabase.auth.signUp(value)
    response({ message: 'Successfully signed up!', data: result })
  } else if (action === 'signIn') {
    try {
      console.log('requesting auth')
      const { data, error }: { data: Data; error: DataError } =
        await supabase.auth.signInWithPassword(value)
      return response({ data, error })
    } catch (error) {
      return { error }
    }
  } else if (action === 'getSession') {
    await supabase.auth.getSession().then(response)
  } else if (action === 'signOut') {
    const { error } = await supabase.auth.signOut()

    // clear local session
    chrome.storage.local.remove('session')

    response({ data: null, error })
  } else {
    response({ data: null, error: 'Unknown action' })
  }
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  handleMessage(msg, response)
  return true
})
