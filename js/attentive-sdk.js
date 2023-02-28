$(document).ready(function () {
  // Page loaded - get localstorage items
  console.log('PAGE LOADED -> ', window.location.pathname)

  let firstName = localStorage.getItem('firstName') || 'Sally'
  // console.log('get firstName:', firstName)
  const firstNameElement = document.querySelector('#firstName')

  let lastName = localStorage.getItem('lastName') || 'Smith'
  // console.log('get lastName:', lastName)
  const lastNameElement = document.querySelector('#lastName')

  let email = localStorage.getItem('email') || 'demo@attentive.com'
  // console.log('get email:', email)
  const emailElement = document.querySelector('#email')

  let phone = localStorage.getItem('phone') || '+12065551212'
  // console.log('get phone:', phone)
  const phoneElement = document.querySelector('#phone')

  let departureCity = localStorage.getItem('departureCity') || 'New York'
  // console.log('get departureCity:', departureCity)
  const departureCityElement = document.querySelector('#departureCity')

  let returnCity = localStorage.getItem('returnCity') || 'Mexico City'
  // console.log('get returnCity:', returnCity)
  const returnCityElement = document.querySelector('#returnCity')

  //sets default check-in to today + 7 days
  let departureDate = new Date()
  departureDate.setDate(departureDate.getDate() + 7)
  let departure =
    localStorage.getItem('departure') || departureDate.toLocaleDateString()

  // console.log('get departure:', departure)
  const departureElement = document.querySelector('#departure')

  //sets default check-in to today + 14 days
  let returnDate = new Date()
  returnDate.setDate(returnDate.getDate() + 14)
  let returnVar =
    localStorage.getItem('return') || returnDate.toLocaleDateString()
  // console.log('get return:', return)
  const returnElement = document.querySelector('#return')

  let passengers = localStorage.getItem('passengers') || '1 Passenger'
  // console.log('get passengers:', passengers)
  const passengersElement = document.querySelector('#passengers')

  let roundtrip = localStorage.getItem('roundtrip') || ''
  // console.log('get roundtrip:', roundtrip)
  const roundtripElement = document.querySelector('#roundtrip')

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
    if (departureElement) departureElement.value = departure
    if (returnElement) returnElement.value = returnVar
    if (passengersElement) passengersElement.value = passengers
    if (roundtripElement) roundtripElement.value = roundtrip
  }

  // Clicked submit button
  $('button[type="submit"').click(function () {
    if (
      window.location.pathname.match('index') ||
      window.location.pathname.match('room-details')
    ) {
      console.log('SET LOCAL STORAGE')
      localStorage.setItem('city', cityElement.value)
      localStorage.setItem('departure', departureElement.value)
      localStorage.setItem('return', returnElement.value)
      localStorage.setItem('passengers', passengersElement.value)
      localStorage.setItem('roundtrip', roundtripElement.value)
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
