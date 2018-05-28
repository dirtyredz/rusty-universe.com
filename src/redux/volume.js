export function mute(){
  return {
    type: 'MUTE'
  }
}

export function unMute(){
  return {
    type: 'UNMUTE'
  }
}

export default function reducer(state =  {}, action){
  switch (action.type) {
    case 'MUTE':
      return { Muted: true }
    case 'UNMUTE':
      return { Muted: false }
    default:
      return state
  }
}