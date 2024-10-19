;(function () {
  const config = {
    env: 'sandbox',
    token: 'test_4b6c972f141746108dfe03eddc6',
    product_name: 'ssf',
    priceItems: {
      basic: 'pri_01jajsc6j0s28e22dhzzmxa5f9',
      pro: 'pri_01jajscwyrp9585y08ssyf7bj7',
      business: 'pri_01jajsdfyfng11hjb9t3fjyhwn',
    },
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
    location.href = config.welcomeUrl
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

    document.querySelector('#btn-basic')?.addEventListener('click', () => {
      Paddle.Checkout.open({
        items: [{ priceId: config.priceItems.basic, quantity: 1 }],
      })
    })
    document.querySelector('#btn-pro')?.addEventListener('click', () => {
      Paddle.Checkout.open({
        items: [{ priceId: config.priceItems.pro, quantity: 1 }],
      })
    })
    document.querySelector('#btn-business')?.addEventListener('click', () => {
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
