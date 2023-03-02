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

  let departureCity = localStorage.getItem('departureCity') || 'New York (LGA)'
  // console.log('get departureCity:', departureCity)
  const departureCityElement = document.querySelector('#departureCity')

  let returnCity = localStorage.getItem('returnCity') || 'Mexico City (MEX)'
  // console.log('get returnCity:', returnCity)
  const returnCityElement = document.querySelector('#returnCity')

  //sets default departure date to today + 7 days
  let departureDateVar = new Date()
  departureDateVar.setDate(departureDateVar.getDate() + 7)
  let departureDate =
    localStorage.getItem('departureDate') || departureDateVar.toLocaleDateString()

  // console.log('get departure:', departure)
  const departureDateElement = document.querySelector('#departureDate')

  //sets default return date to today + 14 days
  let returnDateVar = new Date()
  returnDateVar.setDate(returnDateVar.getDate() + 14)
  let returnDate =
    localStorage.getItem('returnDate') || returnDateVar.toLocaleDateString()
  // console.log('get return:', return)
  const returnDateElement = document.querySelector('#returnDate')

  let passengers = localStorage.getItem('passengers') || '1 Passenger'
  // console.log('get passengers:', passengers)
  const passengersElement = document.querySelector('#passengers')

  let roundtrip = localStorage.getItem('roundtrip') || 'Round Trip'
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
      // FIRST NAME
      if (e.data.__attentive.metadata['First Name']) {
        console.log(
          'e.data.__attentive.metadata["First Name"]: ' +
            e.data.__attentive.metadata['First Name']
        )
        firstName = e.data.__attentive.metadata['First Name']
        localStorage.setItem('firstName', firstName)
      }
      // LAST NAME
      if (e.data.__attentive.metadata['Last Name']) {
        console.log(
          'e.data.__attentive.metadata["Last Name"]: ' +
            e.data.__attentive.metadata['Last Name']
        )
        lastName = e.data.__attentive.metadata['Last Name']
        localStorage.setItem('lastName', lastName)
      }
      // PREFERRED DESTINATION
      if (e.data.__attentive.metadata['Preferred Destination']) {
        console.log(
          'e.data.__attentive.metadata["Preferred Destination"]: ' +
            e.data.__attentive.metadata['Preferred Destination']
        )
        returnCity = e.data.__attentive.metadata['Preferred Destination']
        localStorage.setItem('returnCity', returnCity)
      }
    }
    // console.log('e.data: ' + JSON.stringify(e.data, null, 2))
  })

  if (window.location.pathname.match('flight-details')) {
    console.log('ROOM DETAILS PAGE -> PRODUCT VIEW SDK')
    window.attentive.analytics.productView({
      items: [
        {
          productId: 'ny-mx-2',
            productVariantId: 'ny-mx-2b',
            name: 'New York (LGA) - Mexico - Round Trip',
          price: {
            value: '1499',
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
    if (departureCityElement) departureCityElement.value = departureCity
    if (returnCityElement) returnCityElement.value = returnCity
    if (departureDateElement) departureDateElement.value = departureDate
    if (returnDateElement) returnDateElement.value = returnDate
    if (passengersElement) passengersElement.value = passengers
    if (roundtripElement) roundtripElement.value = roundtrip
  }

  // Clicked submit button
  $('button[type="submit"').click(function () {
    if (
      window.location.pathname.match('index') ||
      window.location.pathname.match('flight-details')
    ) {
      console.log('SET LOCAL STORAGE')
      localStorage.setItem('departureCity', departureCityElement.value)
      localStorage.setItem('returnCity', returnCityElement.value)
      localStorage.setItem('departureDate', departureDateElement.value)
      localStorage.setItem('returnDate', returnDateElement.value)
      localStorage.setItem('passengers', passengersElement.value)
      localStorage.setItem('roundtrip', roundtripElement.value)
      // ADD TO CART SDK
      console.log('BOOK NOW BUTTON -> ADD TO CART SDK')
      window.attentive.analytics.addToCart({
        items: [
          {
            productId: 'ny-mx-2',
            productVariantId: 'ny-mx-2b',
            name: 'New York (LGA) - Mexico - Round Trip',
            price: {
              value: '1499',
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
            productId: 'ny-mx-2',
            productVariantId: 'ny-mx-2b',
            name: 'New York (LGA) - Mexico - Round Trip',
            price: {
              value: '1499',
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
