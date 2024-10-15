;(function () {
  const config = {
    env: 'sandbox',
    token: 'test_4b6c972f141746108dfe03eddc6',
    product_name: 'ssf',
    priceItems: {
      pro: 'pri_01ja7gfshf1nnqny0cz86yqs1e',
      business: 'pri_01ja7ggncy5mfn5ejrbz3rhqah',
    },
    webhookUrl: 'https://api.twillot.com/webhook/paddle/generate',
    // 确保和 pricing 页面同级
    welcomeUrl: './welcome?utm_source=paddle',
    scriptSrc: 'https://cdn.paddle.com/paddle/v2/paddle.js',
  }

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

    document.querySelector('#btn-pro').addEventListener('click', () => {
      Paddle.Checkout.open({
        items: [{ priceId: config.priceItems.pro, quantity: 1 }],
      })
    })
    document.querySelector('#btn-business').addEventListener('click', () => {
      Paddle.Checkout.open({
        items: [{ priceId: config.priceItems.business, quantity: 1 }],
      })
    })
  }

  const script = document.createElement('script')
  script.src = config.scriptSrc
  script.async = true
  script.onload = initializePaddle
  document.head.appendChild(script)
})()
