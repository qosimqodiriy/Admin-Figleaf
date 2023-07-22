import { axiosInstance } from "./axios";

export function phoneNum(phone: string) {
  if (phone != null) {
    if (phone.length == 13) {
      const country = phone.slice(0, 4);
      const code = phone.slice(4, 6);
      const num1 = phone.slice(6, 9);
      const num2 = phone.slice(9, 11);
      const num3 = phone.slice(11, 13);

      return `(${code}) ${num1}-${num2}-${num3}`

    } else if (phone.length == 9) {
      const code = phone.slice(0, 2);
      const num1 = phone.slice(2, 5);
      const num2 = phone.slice(5, 7);
      const num3 = phone.slice(7, 9);


      return `(${code}) ${num1}-${num2}-${num3}`
    } else {
      return phone
    }
  } else {
    return 'null'
  }
}

export function changeCords(lat: number, long: number) {
  console.log(lat);
  console.log(long);

  return [lat, long]
}


export function thisDay() {
  const newDate = new Date()

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  let dMonth, dDay;
  if (month < 9) { dMonth = `0${month + 1}` }
  else { dMonth = month + 1 }

  if (day < 10) { dDay = `0${day}` }
  else { dDay = day }


  return `${dDay}.${dMonth}.${year}`
}

export function fullDate(time: string) {
  const year = time.slice(6, 10)
  const month = time.slice(3, 5)
  const day = time.slice(0, 2)
  const hour = time.slice(11, 13)
  const minute = time.slice(14, 16)

  return `${day}.${month}.${year} · ${hour}:${minute}`
}

export function timeFun(time: number) {
  let newTime = new Date(time * 1000)
  // console.log(newTime.toLocaleString());

  return newTime.toLocaleString()
}



export function timeCalculation(time: number) {
  if (time < 10) {
    return `00:0${time}`
  } else if (time < 60) {
    return `00:${time}`
  } else if (time < 3600) {
    let min = Math.floor(time / 60);
    time -= min * 60;

    if (min < 10 && time < 10) {
      return `0${min}:0${time}`
    } else if (min < 10 && time > 9) {
      return `0${min}:${time}`
    } else if (min > 9 && time < 10) {
      return `0${min}:0${time}`
    } else {
      return `${min}:${time}`
    }
  } else if (time > 3599) {
    let hour = Math.floor(time / 3600);
    time -= 3600 * hour;
    let min = Math.floor(time / 60);
    time -= min * 60;

    if (hour < 10 && min < 10 && time < 10) {
      return `0${hour}:0${min}:0${time}`
    } else if (hour < 10 && min < 10) {
      return `0${hour}:0${min}:${time}`
    } else if (hour < 10 && min > 9 && time < 10) {
      return `0${hour}:${min}:0${time}`
    } else if (hour < 10 && min > 9) {
      return `0${hour}:${min}:${time}`
    } else if (min < 10 && time < 10) {
      return `${hour}:0${min}:0${time}`
    } else if (min < 10) {
      return `${hour}:0${min}:${time}`
    } else {
      return `${hour}:${min}:${time}`
    }
  }
}


export function formatPrice(price: number) {
  if (price == 0) {
    return price
  } else {
    let plus = true
    let myArray = [];

    if (price < 0) {
      plus = false
      price = -1 * price
    }

    if (price) {
      let num = price.toString().split('');
      // num.pop()
      // num.pop()
      num = num.reverse();

      for (let i = 0; i < num.length; i++) {
        if (i > 0 && i % 3 == 0) {
          myArray.unshift(' ')
        }
        myArray.unshift(num.slice(i, i + 1))
      }


      if (plus) {
        return myArray.join('');
      } else {
        return `-${myArray.join('')}`;
      }
    }
  }
}


export function totalPrice(price: number, count: number) {
  let myArray = [];
  let sum = price * count
  let num = sum.toString().split('');
  // num.pop()
  // num.pop()
  num.reverse().join('');

  for (let i = 0; i < sum.toString().length - 2; i++) {
    if (i > 0 && i % 3 == 0) {
      myArray.unshift(',')
    }
    myArray.unshift(num.slice(i, i + 1))
  }

  return myArray.join('');
}

export function Hours(time: string) {
  if (time != null || time != '') {
    const hour = time.slice(11, 13);
    const minute = time.slice(14, 16);


    return `${hour}:${minute}`
  } else {
    return `..:..`
  }
}

export function getLocation(lat: number, long: number) {
  try {
    const response = axiosInstance.get(`https://geocode-maps.yandex.ru/1.x/?apikey=05741b7f-e420-4505-acf0-b0f3ad9b7eef&geocode=${long},${lat}&format=json`) as Object

    return response
  }
  catch (error) {
    return [error]
  }
}