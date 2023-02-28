$(document).ready(function () {
  // Page loaded - get localstorage items
  console.log('PAGE LOADED -> ', window.location.pathname)

  let firstName = localStorage.getItem('firstName') || 'Sally'
  // console.log('get firstName:', firstName)
  const firstNameElement = document.querySelector('#firstName')

  let lastName = localStorage.getItem('lastName') || 'Smith'
  // console.log('get lastName:', lastName)
  const lastNameElement = document.querySelector('#lastName')

  let email = localStorage.getItem('email') || 'fred@attentive.com'
  // console.log('get email:', email)
  const emailElement = document.querySelector('#email')

  let phone = localStorage.getItem('phone') || '+12065551212'
  // console.log('get phone:', phone)
  const phoneElement = document.querySelector('#phone')

  let city = localStorage.getItem('city') || 'New York'
  // console.log('get city:', city)
  const cityElement = document.querySelector('#city')

  //sets default check-in to today + 7 days
  let checkInDate = new Date()
  checkInDate.setDate(checkInDate.getDate() + 7)
  let checkIn =
    localStorage.getItem('checkIn') || checkInDate.toLocaleDateString()

  // console.log('get checkIn:', checkIn)
  const checkInElement = document.querySelector('#checkIn')

  //sets default check-in to today + 8 days
  let checkOutDate = new Date()
  checkOutDate.setDate(checkOutDate.getDate() + 8)
  let checkOut =
    localStorage.getItem('checkOut') || checkOutDate.toLocaleDateString()
  // console.log('get checkOut:', checkOut)
  const checkOutElement = document.querySelector('#checkOut')

  let adults = localStorage.getItem('adults') || '1 Adult'
  // console.log('get adults:', adults)
  const adultsElement = document.querySelector('#adults')

  let children = localStorage.getItem('children') || ''
  // console.log('get children:', children)
  const childrenElement = document.querySelector('#children')

  // Event listener to process messages from sign-up unit via postMessage()
  window.addEventListener('message', e => {
    console.log(e)
    // EMAIL
    if (e.data.__attentive.email) {
      console.log('e.data.__attentive.email: ' + e.data.__attentive.email)
      email = e.data.__attentive.email
      localStorage.setItem('email', email)
    }
    // PHONE
    if (e.data.__attentive.phone) {
      console.log('e.data.__attentive.phone: ' + e.data.__attentive.phone)
      phone = e.data.__attentive.phone
      localStorage.setItem('phone', phone)
    }
    // METADATA
    if (e.data.__attentive.metadata) {
      console.log(
        'e.data.__attentive.metadata: ' +
          JSON.stringify(e.data.__attentive.metadata, null, 2)
      )
      // CITY
      if (e.data.__attentive.metadata['Preferred Location']) {
        console.log(
          'e.data.__attentive.metadata["Preferred Location"]: ' +
            e.data.__attentive.metadata['Preferred Location']
        )
        city = e.data.__attentive.metadata['Preferred Location']
        localStorage.setItem('city', city)
      }
    }
    // console.log('e.data: ' + JSON.stringify(e.data, null, 2))
  })

  if (window.location.pathname.match('room-details')) {
    console.log('ROOM DETAILS PAGE -> PRODUCT VIEW SDK')
    window.attentive.analytics.productView({
      items: [
        {
          productId: 'ny-js-1',
          productVariantId: 'ny-js-2',
          name: 'New York - Junior Suite',
          price: {
            value: '399',
            currency: 'USD'
          }
        }
      ],
      user: {
        phone: phone
      }
    })
  }

  if (window.location.pathname.match('booking')) {
    console.log('BOOKING PAGE -> GET LOCAL STORAGE & SET FORM VALUES')
    if (firstNameElement) firstNameElement.value = firstName
    if (lastNameElement) lastNameElement.value = lastName
    if (emailElement) emailElement.value = email
    if (phoneElement) phoneElement.value = phone
    if (cityElement) cityElement.value = city
    if (checkInElement) checkInElement.value = checkIn
    if (checkOutElement) checkOutElement.value = checkOut
    if (adultsElement) adultsElement.value = adults
    if (childrenElement) childrenElement.value = children
  }

  // Clicked submit button
  $('button[type="submit"').click(function () {
    if (
      window.location.pathname.match('index') ||
      window.location.pathname.match('room-details')
    ) {
      console.log('SET LOCAL STORAGE')
      localStorage.setItem('city', cityElement.value)
      localStorage.setItem('checkIn', checkInElement.value)
      localStorage.setItem('checkOut', checkOutElement.value)
      localStorage.setItem('adults', adultsElement.value)
      localStorage.setItem('children', childrenElement.value)
      // ADD TO CART SDK
      console.log('BOOK NOW BUTTON -> ADD TO CART SDK')
      window.attentive.analytics.addToCart({
        items: [
          {
            productId: 'ny-js-1',
            productVariantId: 'ny-js-2',
            name: 'New York - Junior Suite',
            price: {
              value: '399',
              currency: 'USD'
            }
          }
        ],
        user: {
          phone: phone
        }
      })
    } else if (window.location.pathname.match('booking')) {
      // PURCHASE SDK
      console.log('PURCHASE NOW BUTTON -> PURCHASE SDK')
      window.attentive.analytics.purchase({
        items: [
          {
            productId: 'ny-js-1',
            productVariantId: 'ny-js-2',
            name: 'New York - Junior Suite',
            price: {
              value: '399',
              currency: 'USD'
            }
          }
        ],
        order: {
          orderId: 'order-1'
        },
        user: {
          phone: phone
        }
      })
    }
  })
})
