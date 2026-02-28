'use client'

import { useEffect } from 'react'

export function useServiceTabs() {
  useEffect(() => {
    const buttons = document.querySelectorAll('#b1, #b2, #b3, #b4')
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('selected'))
        this.classList.add('selected')
        const buttonId = this.id
        const divId = 'serv' + buttonId.substring(1)
        document.querySelectorAll('#serv1, #serv2, #serv3, #serv4').forEach(div => {
          div.style.opacity = '0'
          setTimeout(() => {
            div.style.display = 'none'
          }, 300)
        })
        setTimeout(() => {
          const activeDiv = document.getElementById(divId)
          activeDiv.style.display = 'flex'
          setTimeout(() => {
            activeDiv.style.opacity = '1'
          }, 10)
        }, 300)
      })
    })
    document.getElementById('b1').classList.add('selected')
    const defaultDiv = document.getElementById('serv1')
    defaultDiv.style.display = 'flex'
    setTimeout(() => {
      defaultDiv.style.opacity = '1'
    }, 10)
  }, [])
}
