;(function () {
  const config = {
    env: 'production',
    token: 'live_9233313a92afcfb5b4887874b7e',
    product_name: 'bookmarks',
    priceItems: {
      pro: 'pri_01j3359fdtx9vhj34pmm9ttq8v',
      basic: 'pri_01j33549vxyvv3sfwmk03jqs15',
    },
    webhookUrl: 'https://api.twillot.com/webhook/paddle/generate',
    // 确保和 pricing 页面同级
    welcomeUrl: './welcome?utm_source=paddle',
    scriptSrc: 'https://cdn.paddle.com/paddle/v2/paddle.js',
  }

  const isCheckoutPage = (href) => href && href.includes('/checkout')
  const isProPlan = (href) => href && href.includes('pro')

  const handleCheckoutCompleted = (data) => {
    const entries = Object.entries(config.priceItems)
    const entry = entries.find(
      ([name, priceId]) => priceId === data.data.items[0].price_id,
    )
    if (!entry) {
      alert('Invalid price item')
      return
    }
    fetch(config.webhookUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        twillot: {
          product_name: config.product_name,
          plan: entry[0],
        },
      }),
      method: 'POST',
    })
      .then(() => {
        setTimeout(() => {
          location.href = config.welcomeUrl
        }, 2000)
      })
      .catch((err) => {
        console.error('Error:', err)
        location.reload()
      })
  }

  const initializePaddle = () => {
    Paddle.Environment.set(config.env)
    Paddle.Initialize({
      token: config.token,
      eventCallback: (data) => {
        if (data.name === 'checkout.completed') {
          handleCheckoutCompleted(data)
        }
      },
    })

    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!isCheckoutPage(href)) return

      event.preventDefault()
      const priceId = isProPlan(href)
        ? config.priceItems.pro
        : config.priceItems.basic
      Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
      })
    })
  }

  const script = document.createElement('script')
  script.src = config.scriptSrc
  script.async = true
  script.onload = initializePaddle
  document.head.appendChild(script)
})()
